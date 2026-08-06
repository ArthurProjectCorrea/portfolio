#!/usr/bin/env node
// For every commit in the triggering push, looks up that commit's own
// WakaTime coding time (per-commit, via WakaTime's commits endpoint — not an
// approximation) and, for every issue referenced (#N) in that commit's
// message, updates whatever GitHub Project v2 item(s) that issue is already
// linked to: accumulates "Time Spent" (Number), sets "Start Date" (Date)
// only the first time it's ever set, and always overwrites "End Date"
// (Date) with the most recent commit's date.
//
// There's no separate "which project" configuration — the issue is the
// source of truth. Whatever project(s) it's already added to (with a
// matching field) get updated; issues not yet added to any project are
// skipped, since there's nothing to add them to by default anymore.
//
// Since each commit hash is looked up exactly once ever, accumulating
// "Time Spent" (rather than overwriting) is safe across multiple pushes and
// multiple days for the same issue.
//
// No-ops (exit 0) whenever required config is missing, a commit references
// no issue, or WakaTime has no data for a commit yet (e.g. a squash-merge
// commit that never existed on a developer's machine) — so forks that
// haven't opted into WakaTime tracking never get a failing push because of
// this script.

const {
  WAKATIME_API_KEY,
  GH_PROJECT_TOKEN,
  COMMITS_JSON,
  BRANCH_NAME,
  GITHUB_REPOSITORY,
  WAKATIME_PROJECT_NAME,
  TIME_FIELD_NAME,
  START_DATE_FIELD_NAME,
  END_DATE_FIELD_NAME,
} = process.env;

function skip(message) {
  console.log(message);
  process.exit(0);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!WAKATIME_API_KEY)
  skip("WAKATIME_API_KEY not set — skipping WakaTime sync.");
if (!GH_PROJECT_TOKEN)
  skip("GH_PROJECT_TOKEN not set — skipping WakaTime sync.");

const timeFieldName = TIME_FIELD_NAME || "Time Spent";
const startFieldName = START_DATE_FIELD_NAME || "Start Date";
const endFieldName = END_DATE_FIELD_NAME || "End Date";

const [repoOwner, repoName] = (GITHUB_REPOSITORY || "").split("/");
if (!repoOwner || !repoName) {
  fail(
    `Could not parse owner/repo from GITHUB_REPOSITORY ("${GITHUB_REPOSITORY}").`,
  );
}
const wakatimeProject = WAKATIME_PROJECT_NAME || repoName;

let commits;
try {
  commits = JSON.parse(COMMITS_JSON ?? "[]");
} catch {
  fail(`Could not parse COMMITS_JSON: ${COMMITS_JSON}`);
}
if (commits.length === 0) skip("No commits in this push — nothing to sync.");

// --- WakaTime: per-commit time, not an approximation ---

async function fetchCommitSeconds(sha) {
  const url = new URL(
    `https://wakatime.com/api/v1/users/current/projects/${encodeURIComponent(wakatimeProject)}/commits/${sha}`,
  );
  if (BRANCH_NAME) url.searchParams.set("branch", BRANCH_NAME);

  const res = await fetch(url, {
    headers: {
      // API key goes in the Authorization header, never the URL, so it can't leak into logs.
      Authorization: `Basic ${Buffer.from(`${WAKATIME_API_KEY}:`).toString("base64")}`,
    },
  });

  if (res.status === 404) return null; // WakaTime doesn't know this commit yet (or ever will) — not an error.
  if (!res.ok)
    fail(
      `WakaTime API request failed for commit ${sha}: ${res.status} ${res.statusText}`,
    );

  const body = await res.json();
  // The API nests the value under `commit`, not at the response root.
  return body.commit?.total_seconds ?? 0;
}

// --- GitHub Projects v2, via GraphQL ---

async function github(query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GH_PROJECT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (!res.ok || body.errors) {
    fail(
      `GitHub GraphQL request failed: ${JSON.stringify(body.errors ?? body)}`,
    );
  }
  return body.data;
}

// Everything the issue's already-linked project item(s) need: field
// definitions (so we have an id/dataType even when unset) plus the item's
// current values (so Time Spent can be accumulated and Start Date only set
// once).
async function resolveIssueTargets(issueNumber) {
  const data = await github(
    `query($owner: String!, $repo: String!, $number: Int!, $timeField: String!, $startField: String!, $endField: String!) {
      repository(owner: $owner, name: $repo) {
        issue(number: $number) {
          id
          projectItems(first: 20) {
            nodes {
              id
              project {
                id
                title
                timeFieldDef: field(name: $timeField) { ... on ProjectV2FieldCommon { id dataType } }
                startFieldDef: field(name: $startField) { ... on ProjectV2FieldCommon { id dataType } }
                endFieldDef: field(name: $endField) { ... on ProjectV2FieldCommon { id dataType } }
              }
              timeValue: fieldValueByName(name: $timeField) { ... on ProjectV2ItemFieldNumberValue { number } }
              startValue: fieldValueByName(name: $startField) { ... on ProjectV2ItemFieldDateValue { date } }
            }
          }
        }
      }
    }`,
    {
      owner: repoOwner,
      repo: repoName,
      number: issueNumber,
      timeField: timeFieldName,
      startField: startFieldName,
      endField: endFieldName,
    },
  );

  const issue = data.repository?.issue;
  if (!issue) {
    console.log(
      `Issue #${issueNumber} not found in ${repoOwner}/${repoName} — skipping.`,
    );
    return [];
  }
  if (issue.projectItems.nodes.length === 0) {
    console.log(
      `Issue #${issueNumber} isn't linked to any Project — skipping.`,
    );
    return [];
  }

  return issue.projectItems.nodes.map((node) => ({
    itemId: node.id,
    projectId: node.project.id,
    projectTitle: node.project.title,
    timeField: node.project.timeFieldDef,
    startField: node.project.startFieldDef,
    endField: node.project.endFieldDef,
    currentHours: node.timeValue?.number ?? 0,
    currentStart: node.startValue?.date ?? null,
  }));
}

async function updateNumberField(projectId, itemId, fieldId, value) {
  await github(
    `mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: Float!) {
      updateProjectV2ItemFieldValue(
        input: { projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: { number: $value } }
      ) {
        projectV2Item { id }
      }
    }`,
    { projectId, itemId, fieldId, value },
  );
}

async function updateDateField(projectId, itemId, fieldId, value) {
  await github(
    `mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: Date!) {
      updateProjectV2ItemFieldValue(
        input: { projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: { date: $value } }
      ) {
        projectV2Item { id }
      }
    }`,
    { projectId, itemId, fieldId, value },
  );
}

// Rounds to 4 decimal places (~0.36s granularity) instead of 2 (~36s granularity),
// so small-but-real commit durations don't silently collapse to 0.
function toHours(seconds) {
  return Math.round((seconds / 3600) * 10000) / 10000;
}

// --- Accumulate each commit's seconds + track first/last date, per referenced issue ---

const perIssue = new Map(); // issueNumber -> { seconds, firstDate, lastDate }

for (const commit of commits) {
  const issueNumbers = [
    ...new Set(
      [...(commit.message ?? "").matchAll(/#(\d+)/g)].map((m) => Number(m[1])),
    ),
  ];
  if (issueNumbers.length === 0) continue;

  const sha = commit.id;
  const seconds = await fetchCommitSeconds(sha);
  if (seconds === null) {
    console.log(`No WakaTime data for commit ${sha.slice(0, 7)} — skipping.`);
    continue;
  }

  const date = (commit.timestamp ?? new Date().toISOString()).slice(0, 10);
  console.log(
    `Commit ${sha.slice(0, 7)} (${date}): ${seconds}s (${toHours(seconds)}h)`,
  );

  for (const issueNumber of issueNumbers) {
    const entry = perIssue.get(issueNumber) ?? {
      seconds: 0,
      firstDate: date,
      lastDate: date,
    };
    entry.seconds += seconds;
    if (date < entry.firstDate) entry.firstDate = date;
    if (date > entry.lastDate) entry.lastDate = date;
    perIssue.set(issueNumber, entry);
  }
}

if (perIssue.size === 0)
  skip("No issue-referencing commits with WakaTime data — nothing to sync.");

for (const [issueNumber, { seconds, firstDate, lastDate }] of perIssue) {
  const targets = await resolveIssueTargets(issueNumber);
  const addedHours = toHours(seconds);

  for (const target of targets) {
    if (target.timeField?.dataType === "NUMBER") {
      const newHours = toHours(target.currentHours * 3600 + seconds);
      await updateNumberField(
        target.projectId,
        target.itemId,
        target.timeField.id,
        newHours,
      );
      console.log(
        `#${issueNumber} [${target.projectTitle}]: "${timeFieldName}" ${target.currentHours}h + ${addedHours}h = ${newHours}h`,
      );
    }

    if (target.startField?.dataType === "DATE" && !target.currentStart) {
      await updateDateField(
        target.projectId,
        target.itemId,
        target.startField.id,
        firstDate,
      );
      console.log(
        `#${issueNumber} [${target.projectTitle}]: "${startFieldName}" set to ${firstDate}`,
      );
    }

    if (target.endField?.dataType === "DATE") {
      await updateDateField(
        target.projectId,
        target.itemId,
        target.endField.id,
        lastDate,
      );
      console.log(
        `#${issueNumber} [${target.projectTitle}]: "${endFieldName}" set to ${lastDate}`,
      );
    }
  }
}

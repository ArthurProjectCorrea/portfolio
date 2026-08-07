#!/usr/bin/env node
// Builds the same {id, message, timestamp}[] shape the push event provides
// (github.event.commits), from a manually supplied list of commit SHAs.
// Lets wakatime-sync.yml be triggered via workflow_dispatch to backfill a
// push whose run never fired (see CONTRIBUTING.md).

import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { appendFileSync } from "node:fs";

const input = process.argv[2] ?? "";
const shas = input
  .split(/[\s,]+/)
  .map((s) => s.trim())
  .filter(Boolean);

if (shas.length === 0) {
  console.error("No commit SHAs provided.");
  process.exit(1);
}

const commits = shas.map((sha) => {
  const id = execFileSync("git", ["rev-parse", sha]).toString().trim();
  const message = execFileSync("git", ["show", "-s", "--format=%B", id])
    .toString()
    .trim();
  const timestamp = execFileSync("git", ["show", "-s", "--format=%cI", id])
    .toString()
    .trim();
  return { id, message, timestamp };
});

const githubOutput = process.env.GITHUB_OUTPUT;
if (!githubOutput) {
  console.error("GITHUB_OUTPUT not set.");
  process.exit(1);
}

const delimiter = `EOF_${randomBytes(8).toString("hex")}`;
appendFileSync(
  githubOutput,
  `commits_json<<${delimiter}\n${JSON.stringify(commits)}\n${delimiter}\n`,
);
console.log(`Built commits JSON for ${commits.length} commit(s).`);

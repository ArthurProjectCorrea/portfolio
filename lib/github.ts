export interface GithubRepoRef {
  owner: string;
  repo: string;
}

export type WorkflowRunStatus = "success" | "failure" | "pending";

const GITHUB_API = "https://api.github.com";

/** Parses "https://github.com/{owner}/{repo}" (with or without trailing slash/.git). */
export function parseGithubRepo(repoUrl: string): GithubRepoRef | null {
  const match = repoUrl.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/,
  );
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

function authHeaders(): Record<string, string> | null {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
  };
}

async function githubGet<T>(path: string): Promise<T | null> {
  const headers = authHeaders();
  if (!headers) return null;

  try {
    const response = await fetch(`${GITHUB_API}${path}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/** Latest release tag (e.g. "v1.4.0"), or null when unset/unreachable. */
export async function getLatestReleaseTag(
  ref: GithubRepoRef,
): Promise<string | null> {
  const release = await githubGet<{ tag_name?: string }>(
    `/repos/${ref.owner}/${ref.repo}/releases/latest`,
  );
  return release?.tag_name ?? null;
}

/** Conclusion of the most recent run of `workflowFile` (the lint/build gate by default). */
export async function getLatestWorkflowRunStatus(
  ref: GithubRepoRef,
  workflowFile = "ci.yml",
): Promise<WorkflowRunStatus | null> {
  const runs = await githubGet<{
    workflow_runs?: { status: string; conclusion: string | null }[];
  }>(
    `/repos/${ref.owner}/${ref.repo}/actions/workflows/${workflowFile}/runs?per_page=1`,
  );
  const run = runs?.workflow_runs?.[0];
  if (!run) return null;
  if (run.status !== "completed") return "pending";
  return run.conclusion === "success" ? "success" : "failure";
}

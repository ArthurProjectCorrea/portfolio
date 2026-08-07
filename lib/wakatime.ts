export interface WakatimeProjectTime {
  /** Human-readable total, e.g. "3 hrs 25 mins". */
  text: string;
  totalSeconds: number;
}

// Total time logged on a single WakaTime project since it was created —
// https://wakatime.com/developers#all_time_since_today. Reads
// WAKATIME_API_KEY server-side only; returns null whenever the key is
// missing, the project isn't tracked, or the request fails, so callers can
// simply skip rendering the badge instead of handling an error.
export async function getProjectCodingTime(
  project: string,
): Promise<WakatimeProjectTime | null> {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://wakatime.com/api/v1/users/current/all_time_since_today?project=${encodeURIComponent(project)}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        },
        next: { revalidate: 3600 },
      },
    );
    if (!response.ok) return null;

    const { data } = await response.json();
    if (!data?.text) return null;

    return { text: data.text, totalSeconds: data.total_seconds };
  } catch {
    return null;
  }
}

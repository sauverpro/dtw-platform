/** Converts watch / youtu.be / embed URLs into a YouTube iframe embed URL. */
export function getYouTubeEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);

    // youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return id ? embedFromId(id) : null;
    }

    if (!parsed.hostname.includes("youtube.com")) return null;

    // youtube.com/embed/VIDEO_ID
    const embedMatch = parsed.pathname.match(/^\/embed\/([^/?]+)/);
    if (embedMatch?.[1]) return embedFromId(embedMatch[1]);

    // youtube.com/shorts/VIDEO_ID
    const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/?]+)/);
    if (shortsMatch?.[1]) return embedFromId(shortsMatch[1]);

    // youtube.com/watch?v=VIDEO_ID
    const v = parsed.searchParams.get("v");
    if (v) return embedFromId(v);
  } catch {
    return null;
  }

  return null;
}

function embedFromId(id: string): string {
  return `https://www.youtube.com/embed/${id}`;
}

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;
const REDDIT_FEED_URL = "https://www.reddit.com/r/TheDarkWest/new.json";

interface RedditProxyRequest {
  method?: string;
  query: Record<string, string | string[] | undefined>;
}

interface RedditProxyResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (payload: unknown) => void;
  };
}

const getLimit = (value: string | string[] | undefined) => {
  const normalizedValue = Array.isArray(value) ? value[0] : value;
  const parsedValue = Number.parseInt(normalizedValue ?? `${DEFAULT_LIMIT}`, 10);

  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return DEFAULT_LIMIT;
  }

  return Math.min(parsedValue, MAX_LIMIT);
};

export default async function handler(
  request: RedditProxyRequest,
  response: RedditProxyResponse,
) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ message: "Method not allowed" });
    return;
  }

  const limit = getLimit(request.query.limit);
  const requestUrl = new URL(REDDIT_FEED_URL);
  requestUrl.searchParams.set("limit", String(limit));
  requestUrl.searchParams.set("raw_json", "1");

  try {
    const redditResponse = await fetch(requestUrl, {
      headers: {
        "User-Agent": "TheDarkWestFrontend/1.0",
        Accept: "application/json",
      },
    });

    if (!redditResponse.ok) {
      response.status(502).json({
        message: "We couldn't load Reddit posts right now.",
      });
      return;
    }

    const payload = await redditResponse.json();

    response.setHeader(
      "Cache-Control",
      "s-maxage=300, stale-while-revalidate=600",
    );
    response.status(200).json(payload);
  } catch {
    response.status(502).json({
      message: "We couldn't load Reddit posts right now.",
    });
  }
}

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PUBLICATION_FILTERS, getPublicationTypeLabel } from "../../constants/publications";
import type {
  PaginatedPublicationsResponse,
  Publication,
  PublicationType,
} from "../../interface";
import { listPublications } from "../../services/api";
import { resolveApiUrl } from "../../services/httpClient";
import { stripHtml } from "../../utils/html";
import * as S from "./styles";

const PAGE_SIZE = 6;
const REDDIT_POST_LIMIT = 30;
const DEFAULT_TYPE: PublicationType = "ANNOUNCEMENT";
const REDDIT_SOURCE = "reddit";
const REDDIT_FEED_ENDPOINT = "/api/reddit";
const REDDIT_SUBREDDIT_URL = "https://www.reddit.com/r/TheDarkWest/";
const REDDIT_PUBLIC_FEED_ENDPOINT =
  `https://www.reddit.com/r/TheDarkWest.json?limit=${REDDIT_POST_LIMIT}`;

interface RedditPost {
  id: string;
  title: string;
  body: string;
  author: string;
  permalink: string;
  createdUtc: number;
}

const EMPTY_PUBLICATIONS_RESPONSE: PaginatedPublicationsResponse = {
  data: [],
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 1,
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getValidPublicationType = (value: string | null): PublicationType => {
  const matchedFilter = PUBLICATION_FILTERS.find((filter) => filter.value === value);
  return matchedFilter?.value ?? DEFAULT_TYPE;
};

const getValidPage = (value: string | null) => {
  const parsedPage = Number.parseInt(value ?? "1", 10);

  if (Number.isNaN(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return parsedPage;
};

const formatDate = (value: string | number) => {
  const date = typeof value === "number" ? new Date(value * 1000) : new Date(value);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getPublicationExcerpt = (publication: Publication) => {
  const summary = stripHtml(publication.summary);

  if (summary) {
    return summary;
  }

  return stripHtml(publication.content);
};

const normalizeRedditPost = (value: unknown): RedditPost | null => {
  if (!isObject(value)) {
    return null;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    typeof value.author !== "string" ||
    typeof value.permalink !== "string" ||
    typeof value.created_utc !== "number"
  ) {
    return null;
  }

  const normalizedBody =
    typeof value.selftext === "string" && value.selftext.trim()
      ? value.selftext.trim().replace(/\s+/g, " ")
      : "[Media / Link Post - Click to view on Reddit]";

  return {
    id: value.id,
    title: value.title.trim(),
    body: normalizedBody,
    author: value.author.trim(),
    permalink: value.permalink,
    createdUtc: value.created_utc,
  };
};

const getRedditChildren = (payload: unknown) => {
  if (
    isObject(payload) &&
    isObject(payload.data) &&
    Array.isArray(payload.data.children)
  ) {
    return payload.data.children;
  }

  return null;
};

const fetchRedditFeed = async (signal: AbortSignal) => {
  const redditSources = [
    `${REDDIT_FEED_ENDPOINT}?limit=${REDDIT_POST_LIMIT}&raw_json=1`,
    REDDIT_PUBLIC_FEED_ENDPOINT,
  ];

  for (const sourceUrl of redditSources) {
    const response = await fetch(sourceUrl, { signal });

    if (!response.ok) {
      continue;
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().includes("json")) {
      continue;
    }

    const payload = (await response.json()) as unknown;
    const children = getRedditChildren(payload);

    if (children) {
      return children;
    }
  }

  throw new Error("We couldn't load Reddit posts right now.");
};

const News: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [publicationsResponse, setPublicationsResponse] =
    useState<PaginatedPublicationsResponse>(EMPTY_PUBLICATIONS_RESPONSE);
  const [redditPosts, setRedditPosts] = useState<RedditPost[]>([]);
  const [redditTotalPages, setRedditTotalPages] = useState(1);
  const [redditFeedNotice, setRedditFeedNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const isRedditFeed = searchParams.get("source")?.toLowerCase() === REDDIT_SOURCE;
  const selectedType = getValidPublicationType(searchParams.get("type"));
  const currentPage = getValidPage(searchParams.get("page"));

  useEffect(() => {
    let isMounted = true;
    const redditRequestController = new AbortController();

    const fetchRedditPosts = async () => {
      setIsLoading(true);
      setError("");
      setRedditFeedNotice("");

      try {
        const children = await fetchRedditFeed(redditRequestController.signal);

        const allPosts = children
          .map((child) =>
            isObject(child) && "data" in child ? normalizeRedditPost(child.data) : null,
          )
          .filter((post): post is RedditPost => Boolean(post));

        if (!isMounted) {
          return;
        }

        const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));

        if (currentPage > totalPages) {
          setSearchParams(
            {
              source: REDDIT_SOURCE,
              page: String(totalPages),
            },
            { replace: true },
          );
          return;
        }

        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const paginatedPosts = allPosts.slice(startIndex, startIndex + PAGE_SIZE);

        setRedditPosts(paginatedPosts);
        setRedditTotalPages(totalPages);
        setPublicationsResponse(EMPTY_PUBLICATIONS_RESPONSE);
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }

        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }

        setError("");
        setRedditFeedNotice(
          "The Reddit feed isn't available right now. You can still browse the subreddit directly.",
        );
        setRedditPosts([]);
        setRedditTotalPages(1);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const fetchPublications = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await listPublications({
          page: currentPage,
          limit: PAGE_SIZE,
          type: selectedType,
        });

        if (!isMounted) {
          return;
        }

        if (response.totalPages > 0 && currentPage > response.totalPages) {
          setSearchParams(
            {
              type: selectedType,
              page: String(response.totalPages),
            },
            { replace: true },
          );
          return;
        }

        setPublicationsResponse(response);
        setRedditPosts([]);
        setRedditTotalPages(1);
        setRedditFeedNotice("");
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "We couldn't load the latest transmissions right now.",
        );
        setPublicationsResponse(EMPTY_PUBLICATIONS_RESPONSE);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (isRedditFeed) {
      void fetchRedditPosts();
    } else {
      void fetchPublications();
    }

    return () => {
      isMounted = false;
      redditRequestController.abort();
    };
  }, [currentPage, isRedditFeed, selectedType, setSearchParams]);

  const handleFilterChange = (nextType: PublicationType) => {
    setSearchParams({
      type: nextType,
      page: "1",
    });
  };

  const handleRedditFeedChange = () => {
    setSearchParams({
      source: REDDIT_SOURCE,
      page: "1",
    });
  };

  const handlePageChange = (nextPage: number) => {
    if (isRedditFeed) {
      setSearchParams({
        source: REDDIT_SOURCE,
        page: String(nextPage),
      });
      return;
    }

    setSearchParams({
      type: selectedType,
      page: String(nextPage),
    });
  };

  const currentTotalPages = isRedditFeed
    ? redditTotalPages
    : publicationsResponse.totalPages;

  return (
    <S.NewsContainer>
      <S.NewsWrapper>
        <S.HeroSection>
          <S.HeroHeaderRow>
            <S.PageTitle>Latest Transmissions</S.PageTitle>

            {isRedditFeed && (
              <S.HeroLink
                href={REDDIT_SUBREDDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View subreddit
              </S.HeroLink>
            )}
          </S.HeroHeaderRow>

          <S.PageSubtitle>
            {isRedditFeed
              ? "Browse the latest subreddit posts inside the site and open any individual thread on Reddit when you want the original discussion."
              : "Follow official updates, patch notes, dev logs, and archived livestreams directly from the current publications module."}
          </S.PageSubtitle>
        </S.HeroSection>

        <S.FilterRow>
          {PUBLICATION_FILTERS.map((filter) => (
            <S.FilterButton
              key={filter.value}
              type="button"
              $isActive={!isRedditFeed && filter.value === selectedType}
              onClick={() => handleFilterChange(filter.value)}
            >
              {filter.label}
            </S.FilterButton>
          ))}

          <S.FilterButton
            type="button"
            $isActive={isRedditFeed}
            onClick={handleRedditFeedChange}
          >
            Reddit
          </S.FilterButton>
        </S.FilterRow>

        {isLoading && (
          <S.StatusMessage>Deciphering transmissions...</S.StatusMessage>
        )}

        {!isLoading && error && (
          <S.StatusMessage $isError>{error}</S.StatusMessage>
        )}

        {!isLoading &&
          !error &&
          isRedditFeed &&
          redditPosts.length === 0 &&
          (redditFeedNotice ? (
            <S.StatusMessage>
              <S.StatusContent>
                <span>{redditFeedNotice}</span>
                <S.HeroLink
                  href={REDDIT_SUBREDDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open subreddit
                </S.HeroLink>
              </S.StatusContent>
            </S.StatusMessage>
          ) : (
            <S.StatusMessage>No Reddit posts available right now.</S.StatusMessage>
          ))}

        {!isLoading &&
          !error &&
          !isRedditFeed &&
          publicationsResponse.data.length === 0 && (
            <S.StatusMessage>
              No {getPublicationTypeLabel(selectedType).toLowerCase()} available
              yet.
            </S.StatusMessage>
          )}

        {!isLoading && !error && isRedditFeed && redditPosts.length > 0 && (
          <>
            <S.PublicationGrid>
              {redditPosts.map((post) => (
                <S.RedditCard key={post.id}>
                  <S.RedditCardHeader>
                    <S.RedditAuthor>u/{post.author}</S.RedditAuthor>
                    <S.MetaText>{formatDate(post.createdUtc)}</S.MetaText>
                  </S.RedditCardHeader>

                  <S.RedditCardBody>
                    <S.CardTitle>{post.title}</S.CardTitle>
                    <S.RedditBodyText>{post.body}</S.RedditBodyText>

                    <S.RedditCardFooter>
                      <S.ExternalReadLink
                        href={`https://www.reddit.com${post.permalink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read on Reddit
                      </S.ExternalReadLink>
                    </S.RedditCardFooter>
                  </S.RedditCardBody>
                </S.RedditCard>
              ))}
            </S.PublicationGrid>

            {currentTotalPages > 1 && (
              <S.Pagination>
                {Array.from({ length: currentTotalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <S.PageButton
                      key={pageNumber}
                      type="button"
                      $isActive={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </S.PageButton>
                  ),
                )}
              </S.Pagination>
            )}
          </>
        )}

        {!isLoading &&
          !error &&
          !isRedditFeed &&
          publicationsResponse.data.length > 0 && (
            <>
              <S.PublicationGrid>
                {publicationsResponse.data.map((publication) => {
                  const coverImage = publication.images[0];

                  return (
                    <S.PublicationCard key={publication.id}>
                      {coverImage ? (
                        <S.CardImage
                          src={resolveApiUrl(coverImage.fileUrl)}
                          alt={publication.title}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <S.ImagePlaceholder>
                          {getPublicationTypeLabel(publication.type)}
                        </S.ImagePlaceholder>
                      )}

                      <S.CardBody>
                        <S.MetaRow>
                          <S.TypeBadge>
                            {getPublicationTypeLabel(publication.type)}
                          </S.TypeBadge>
                          <S.MetaText>{formatDate(publication.createdAt)}</S.MetaText>
                        </S.MetaRow>

                        <S.CardTitle>{publication.title}</S.CardTitle>
                        <S.CardSummary>
                          {getPublicationExcerpt(publication)}
                        </S.CardSummary>

                        <S.CardFooter>
                          <S.MetaText>By {publication.author.name}</S.MetaText>
                          <S.ReadMoreLink to={`/news/${publication.slug}`}>
                            Read more
                          </S.ReadMoreLink>
                        </S.CardFooter>
                      </S.CardBody>
                    </S.PublicationCard>
                  );
                })}
              </S.PublicationGrid>

              {currentTotalPages > 1 && (
                <S.Pagination>
                  {Array.from(
                    { length: currentTotalPages },
                    (_, index) => index + 1,
                  ).map((pageNumber) => (
                    <S.PageButton
                      key={pageNumber}
                      type="button"
                      $isActive={pageNumber === publicationsResponse.page}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </S.PageButton>
                  ))}
                </S.Pagination>
              )}
            </>
          )}
      </S.NewsWrapper>
    </S.NewsContainer>
  );
};

export default News;

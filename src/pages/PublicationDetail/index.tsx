import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicationTypeLabel } from "../../constants/publications";
import type { Publication } from "../../interface";
import { getPublicationBySlug } from "../../services/api";
import { resolveApiUrl } from "../../services/httpClient";
import {
  attachSpoilerInteractions,
  renderRichTextMarkup,
} from "../../utils/html";
import * as S from "./styles";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const PublicationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const pageWrapperRef = useRef<HTMLDivElement>(null);
  const [publication, setPublication] = useState<Publication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPublication = async () => {
      if (!slug) {
        setError("Publication not found.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await getPublicationBySlug(slug);

        if (!isMounted) {
          return;
        }

        setPublication(response);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "We couldn't load this publication right now.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchPublication();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const renderedSummary = publication
    ? renderRichTextMarkup(publication.summary)
    : "";
  const renderedContent = publication
    ? renderRichTextMarkup(publication.content)
    : "";
  const backFilterType = publication?.type ?? "ANNOUNCEMENT";

  useEffect(() => {
    const wrapper = pageWrapperRef.current;

    if (!wrapper) {
      return;
    }

    return attachSpoilerInteractions(wrapper);
  }, [renderedSummary, renderedContent]);

  return (
    <S.PageContainer>
      <S.PageWrapper ref={pageWrapperRef}>
        <S.BackLink to={`/news?type=${backFilterType}&page=1`}>
          Back to publications
        </S.BackLink>

        {isLoading && <S.StatusMessage>Loading transmission...</S.StatusMessage>}

        {!isLoading && error && (
          <S.StatusMessage $isError>{error}</S.StatusMessage>
        )}

        {!isLoading && !error && publication && (
          <>
            <S.HeaderCard>
              <S.MetaRow>
                <S.TypeBadge>
                  {getPublicationTypeLabel(publication.type)}
                </S.TypeBadge>
                <S.MetaText>{formatDate(publication.createdAt)}</S.MetaText>
              </S.MetaRow>

              <S.PageTitle>{publication.title}</S.PageTitle>
              <S.Summary dangerouslySetInnerHTML={{ __html: renderedSummary }} />

              <S.AuthorLine>
                Written by {publication.author.name}
              </S.AuthorLine>
            </S.HeaderCard>

            {publication.images.length > 0 && (
              <S.FeaturedImage
                src={resolveApiUrl(publication.images[0].fileUrl)}
                alt={publication.title}
              />
            )}

            <S.ContentCard>
              <S.RichText
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />
            </S.ContentCard>

            {publication.images.length > 1 && (
              <S.GallerySection>
                <S.GalleryTitle>Gallery</S.GalleryTitle>
                <S.GalleryGrid>
                  {publication.images.slice(1).map((image) => (
                    <S.GalleryImage
                      key={image.id}
                      src={resolveApiUrl(image.fileUrl)}
                      alt={image.fileName}
                    />
                  ))}
                </S.GalleryGrid>
              </S.GallerySection>
            )}
          </>
        )}
      </S.PageWrapper>
    </S.PageContainer>
  );
};

export default PublicationDetail;

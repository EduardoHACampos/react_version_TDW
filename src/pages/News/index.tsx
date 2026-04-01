import React, { useEffect, useState } from "react";
import * as S from "./styles";

interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  author: string;
  permalink: string;
  created_utc: number;
}

const News: React.FC = () => {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRedditPosts = async () => {
      try {
        const response = await fetch("https://www.reddit.com/r/TheDarkWest.json?limit=9");
        if (!response.ok) {
          throw new Error("Failed to fetch transmissions.");
        }
        
        const data = await response.json();
        
        const fetchedPosts = data.data.children.map((child: any) => ({
          id: child.data.id,
          title: child.data.title,
          selftext: child.data.selftext,
          author: child.data.author,
          permalink: child.data.permalink,
          created_utc: child.data.created_utc,
        }));

        setPosts(fetchedPosts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRedditPosts();
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <S.NewsContainer>
      <S.NewsWrapper>
        <S.PageTitle>
          Latest Transmissions
          <S.ReadMoreLink href="https://www.reddit.com/r/TheDarkWest/" target="_blank" rel="noopener noreferrer" style={{ paddingTop: 0, fontSize: '1rem' }}>
            View Subreddit ↗
          </S.ReadMoreLink>
        </S.PageTitle>

        {loading && <S.LoadingText>Deciphering transmissions...</S.LoadingText>}
        
        {error && <S.LoadingText>Signal lost: {error}</S.LoadingText>}

        {!loading && !error && (
          <S.RedditGrid>
            {posts.map((post) => (
              <S.NewsCard key={post.id}>
                <S.CardHeader>
                  <S.AuthorText>u/{post.author}</S.AuthorText>
                  <S.DateText>{formatDate(post.created_utc)}</S.DateText>
                </S.CardHeader>
                <S.CardContent>
                  <S.CardTitle>{post.title}</S.CardTitle>
                  <S.CardBodyText>
                    {post.selftext ? post.selftext : "[Media / Link Post - Click to view on Reddit]"}
                  </S.CardBodyText>
                  <S.ReadMoreLink 
                    href={`https://www.reddit.com${post.permalink}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read on Reddit →
                  </S.ReadMoreLink>
                </S.CardContent>
              </S.NewsCard>
            ))}
          </S.RedditGrid>
        )}

      </S.NewsWrapper>
    </S.NewsContainer>
  );
};

export default News;
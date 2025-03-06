import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { blogAPI } from "../services/api";
import placeholderImage from "../assets/blogtwo_1.png";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  font-weight: 600;
  color: #222;
  
  @media (min-width: 768px) {
    font-size: 2.75rem;
    margin-bottom: 3.5rem;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
    gap: 2.5rem;
  }
`;

const FeaturedSecondRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: 1fr;
    height: 100%;
  }
`;

const StandardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: ${props => props.columns || 'repeat(3, 1fr)'};
    gap: 2.5rem;
  }
`;

const AlternateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 2fr;
    gap: 2.5rem;
  }
`;

const BlogCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeaturedCard = styled(BlogCard)`
  grid-column: 1 / -1;
  
  @media (min-width: 1024px) {
    grid-column: ${props => props.span || 'auto'};
  }
`;

const BlogImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const BlogImage = styled.img`
  width: 100%;
  height: ${props => props.mobileHeight || '250px'};
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
  
  @media (min-width: 768px) {
    height: ${props => props.height || '300px'};
  }
`;

const BlogContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const BlogCategory = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6366F1;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
  color: #111827;
  
  @media (min-width: 768px) {
    font-size: ${props => props.fontSize || '1.375rem'};
    margin-bottom: 1rem;
  }
`;

const BlogExcerpt = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: #4B5563;
  margin-bottom: 1rem;
  flex-grow: 1;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ReadMore = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #4F46E5;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: auto;
  transition: color 0.2s ease;
  
  &:after {
    content: "→";
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: #4338CA;
    
    &:after {
      transform: translateX(4px);
    }
  }
  
  @media (min-width: 768px) {
    font-size: 0.9375rem;
  }
`;

const DateBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #111827;
  z-index: 10;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.25rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #FEF2F2;
  border-radius: 0.5rem;
  margin: 2rem 0;
  color: #B91C1C;
`;

const BlogsOne = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [regularBlogs, setRegularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        
        const featuredResponse = await blogAPI.getFeaturedBlogs();
        const featuredData = featuredResponse.data.data.posts;
        
        const regularResponse = await blogAPI.getAllBlogs({ limit: 10, status: 'published' });
        const regularData = regularResponse.data.data.posts;
        
        const featuredIds = featuredData.map(blog => blog._id);
        const filteredRegularBlogs = regularData.filter(blog => !featuredIds.includes(blog._id));
        
        setFeaturedBlogs(featuredData.slice(0, 3));
        setRegularBlogs(filteredRegularBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Container>
        <Title>Blogs</Title>
        <LoadingContainer>Loading blogs...</LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Blogs</Title>
        <ErrorContainer>{error}</ErrorContainer>
      </Container>
    );
  }

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const secondSectionBlogs = regularBlogs.slice(0, 3);
  const thirdSectionBlogs = regularBlogs.slice(3, 6);

  return (
    <Container>
      <Title>Our Latest Insights</Title>

      {featuredBlogs.length > 0 && (
        <FeaturedGrid>
          <FeaturedCard span="1 / 2">
            <BlogImageWrapper>
              <DateBadge>{formatDate(featuredBlogs[0]?.createdAt)}</DateBadge>
              <BlogImage 
                src={featuredBlogs[0]?.featuredImage?.[0] || placeholderImage} 
                alt={featuredBlogs[0]?.title} 
                height="450px"
                mobileHeight="300px" 
              />
            </BlogImageWrapper>
            <BlogContent>
              <BlogCategory>Featured</BlogCategory>
              <BlogTitle fontSize="1.75rem">{featuredBlogs[0]?.title}</BlogTitle>
              <BlogExcerpt>{truncateText(featuredBlogs[0]?.excerpt || featuredBlogs[0]?.content, 180)}</BlogExcerpt>
              <ReadMore to={`/blog/${featuredBlogs[0]?.slug}`} target="_blank">Read more</ReadMore>
            </BlogContent>
          </FeaturedCard>
          
          <FeaturedSecondRow>
            {featuredBlogs.slice(1, 3).map((blog) => (
              <BlogCard key={blog._id}>
                <BlogImageWrapper>
                  <DateBadge>{formatDate(blog.createdAt)}</DateBadge>
                  <BlogImage 
                    src={blog.featuredImage?.[0] || placeholderImage} 
                    alt={blog.title} 
                    height="220px"
                    mobileHeight="220px"
                  />
                </BlogImageWrapper>
                <BlogContent>
                  <BlogCategory>Featured</BlogCategory>
                  <BlogTitle>{blog.title}</BlogTitle>
                  <ReadMore to={`/blog/${blog.slug}`} target="_blank">Read more</ReadMore>
                </BlogContent>
              </BlogCard>
            ))}
          </FeaturedSecondRow>
        </FeaturedGrid>
      )}

      {secondSectionBlogs.length > 0 && (
        <AlternateGrid>
          {secondSectionBlogs.map((blog, index) => (
            <BlogCard key={blog._id} style={index === 2 ? { gridColumn: '3', gridRow: '1' } : {}}>
              <BlogImageWrapper>
                <DateBadge>{formatDate(blog.createdAt)}</DateBadge>
                <BlogImage 
                  src={blog.featuredImage?.[0] || placeholderImage} 
                  alt={blog.title}
                  height={index === 2 ? "100%" : "240px"}
                  mobileHeight="240px"
                />
              </BlogImageWrapper>
              <BlogContent>
                <BlogCategory>Latest</BlogCategory>
                <BlogTitle>{blog.title}</BlogTitle>
                {index === 2 && (
                  <BlogExcerpt>{truncateText(blog.excerpt || blog.content, 150)}</BlogExcerpt>
                )}
                <ReadMore to={`/blog/${blog.slug}`} target="_blank">Read more</ReadMore>
              </BlogContent>
            </BlogCard>
          ))}
        </AlternateGrid>
      )}

      {thirdSectionBlogs.length > 0 && (
        <StandardGrid columns="2fr 1fr 1fr">
          {thirdSectionBlogs.map((blog, index) => (
            <BlogCard 
              key={blog._id} 
              style={index === 0 ? { gridColumn: '1', gridRow: '1 / span 2' } : {}}
            >
              <BlogImageWrapper>
                <DateBadge>{formatDate(blog.createdAt)}</DateBadge>
                <BlogImage 
                  src={blog.featuredImage?.[0] || placeholderImage} 
                  alt={blog.title}
                  height={index === 0 ? "400px" : "240px"}
                  mobileHeight={index === 0 ? "350px" : "240px"}
                />
              </BlogImageWrapper>
              <BlogContent>
                <BlogCategory>Trending</BlogCategory>
                <BlogTitle>{blog.title}</BlogTitle>
                {index === 0 && (
                  <BlogExcerpt>{truncateText(blog.excerpt || blog.content, 200)}</BlogExcerpt>
                )}
                <ReadMore to={`/blog/${blog.slug}`} target="_blank">Read more</ReadMore>
              </BlogContent>
            </BlogCard>
          ))}
        </StandardGrid>
      )}
    </Container>
  );
};

export default BlogsOne;
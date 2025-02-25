import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { blogAPI } from "../services/api";
import placeholderImage from "../assets/blogtwo_1.png";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.75rem;
  margin-bottom: 2rem;
  font-weight: 500;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: ${props => props.tablet || 'repeat(2, 1fr)'};
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: ${props => props.columns || '1fr 1fr'};
    gap: 2rem;
    margin-bottom: 3rem;
  }
`;

const BlogCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: ${props => props.mobileHeight || '250px'};
  object-fit: cover;
  border-radius: 8px;
  
  @media (min-width: 768px) {
    height: ${props => props.height || '300px'};
  }
`;

const BlogContent = styled.div`
  margin-top: 0.75rem;
  
  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const ReadMore = styled(Link)`
  display: inline-block;
  color: #000;
  text-decoration: underline;
  font-size: 0.875rem;
  margin-top: 0.375rem;
  cursor: pointer;
  
  @media (min-width: 768px) {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  
  &:hover {
    opacity: 0.8;
  }
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
        
        // Fetch featured blogs
        const featuredResponse = await blogAPI.getFeaturedBlogs();
        const featuredData = featuredResponse.data.data.posts;
        
        // Fetch all blogs for the regular sections
        const regularResponse = await blogAPI.getAllBlogs({ limit: 10, status: 'published' });
        const regularData = regularResponse.data.data.posts;
        
        // Filter out featured blogs from regular blogs to avoid duplication
        const featuredIds = featuredData.map(blog => blog._id);
        const filteredRegularBlogs = regularData.filter(blog => !featuredIds.includes(blog._id));
        
        setFeaturedBlogs(featuredData.slice(0, 10));
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

  // Divide regular blogs for the second and third sections
  const secondSectionBlogs = regularBlogs.slice(0, 3);
  const thirdSectionBlogs = regularBlogs.slice(3, 6);

  return (
    <Container>
      <Title>Blogs</Title>

      {/* Featured Blogs Section */}
      <SectionGrid>
        {featuredBlogs.map((blog) => (
          <BlogCard key={blog._id}>
            <BlogImage 
              src={blog.featuredImage?.[0] || placeholderImage} 
              alt={blog.title} 
              height="400px"
              mobileHeight="300px" 
            />
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <ReadMore to={`/blog/${blog.slug}`} target="_blank">Read more</ReadMore>
            </BlogContent>
          </BlogCard>
        ))}
      </SectionGrid>

      {/* Second Section */}
      <SectionGrid 
        columns="1fr 1fr 1fr"
        tablet="repeat(2, 1fr)"
      >
        {secondSectionBlogs.map((blog) => (
          <BlogCard key={blog._id}>
            <BlogImage 
              src={blog.featuredImage?.[0] || placeholderImage} 
              alt={blog.title} 
            />
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <ReadMore to={`/blog/${blog.slug}`} target="_blank">Read more</ReadMore>
            </BlogContent>
          </BlogCard>
        ))}
      </SectionGrid>

      {/* Third Section */}
      <SectionGrid 
        columns="1fr 1fr 1fr"
        tablet="repeat(2, 1fr)"
      >
        {thirdSectionBlogs.map((blog) => (
          <BlogCard key={blog._id}>
            <BlogImage 
              src={blog.featuredImage?.[0] || placeholderImage} 
              alt={blog.title} 
            />
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <ReadMore to={`/blog/${blog.slug}`} target="_blank">Read more</ReadMore>
            </BlogContent>
          </BlogCard>
        ))}
      </SectionGrid>
    </Container>
  );
};

export default BlogsOne;
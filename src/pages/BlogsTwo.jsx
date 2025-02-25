import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { blogAPI } from "../services/api";
import placeholderImage from "../assets/blogtwo_1.png";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 7rem;
  color: #000;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  & > *:nth-child(3n + 2) {
    margin-top: -4rem;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    & > *:nth-child(3n + 2) {
      margin-top: 0;
    }
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    & > *:nth-child(3n + 2) {
      margin-top: 0;
    }
  }
`;

const BlogCard = styled.div`
  position: relative;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  height: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TagContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: white;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #000;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #000;
  font-weight: 500;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ReadMore = styled(Link)`
  display: inline-block;
  color: #000;
  text-decoration: underline;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  cursor: pointer;
  
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

const BlogsTwo = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch blogs
        const blogsResponse = await blogAPI.getAllBlogs({ 
          limit: 9,
          status: 'published',
          sort: '-createdAt'
        });
        
        // Fetch categories for tags
        const categoriesResponse = await blogAPI.getBlogCategories();
        
        setBlogs(blogsResponse.data.data.posts);
        setCategories(categoriesResponse.data.data.categories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
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

  // Function to get category names based on blog category IDs
  const getCategoryNames = (blogCategories) => {
    if (!blogCategories || !blogCategories.length) return ["Jewelry"];
    
    // If categories are already strings, return them
    if (typeof blogCategories[0] === 'string') {
      return blogCategories.slice(0, 2);
    }
    
    // Map category IDs to names
    const categoryNames = [];
    blogCategories.forEach(catId => {
      const category = categories.find(c => c._id === catId);
      if (category) {
        categoryNames.push(category.name);
      }
    });
    
    return categoryNames.length ? categoryNames.slice(0, 2) : ["Jewelry"];
  };

  return (
    <Container>
      <Title>Blogs</Title>
      <GridContainer>
        {blogs.map((blog) => (
          <BlogCard key={blog._id}>
            <ImageContainer>
              <BlogImage src={blog.featuredImage?.[0] || placeholderImage} alt={blog.title} />
              <TagContainer>
                {getCategoryNames(blog.categories).map((category, index) => (
                  <Tag key={index}>{category}</Tag>
                ))}
              </TagContainer>
            </ImageContainer>
            <Content>
              <BlogTitle>{blog.title}</BlogTitle>
              <Description>
                {blog.summary && blog.summary.length > 80 
                  ? `${blog.summary.substring(0, 80)}...` 
                  : blog.summary || "Lorem Ipsum is simply dummy text of the printing industry."}
              </Description>
              <ReadMore to={`/blog/${blog.slug}`} target="_blank">Read more</ReadMore>
            </Content>
          </BlogCard>
        ))}
      </GridContainer>
    </Container>
  );
};

export default BlogsTwo;
import React from "react";
import styled from "styled-components";
import blog_1 from "../assets/blog_1.png";
import blog_2 from "../assets/blog_2.png";
import blog_3 from "../assets/blog_3.png";
import blog_4 from "../assets/blog_4.png";
import blog_5 from "../assets/blog_5.png";
import blog_6 from "../assets/blog_6.png";
import blog_7 from "../assets/blog_7.png";
import blog_8 from "../assets/blog_8.png";

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

const ReadMore = styled.a`
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

const BlogsOne = () => {
  const firstSection = [
    {
      image: blog_1,
      title: "Top 10 reasons to flaunt Demi-fine jewellery this Holi",
      height: "400px",
      mobileHeight: "300px"
    },
    {
      image: blog_2,
      title: "Top 10 reasons to flaunt Demi-fine jewellery this Holi",
      height: "400px",
      mobileHeight: "300px"
    }
  ];

  const secondSection = [
    {
      image: blog_3,
      title: "Top 10 reasons to flaunt Demi-fine jewellery this Holi"
    },
    {
      image: blog_4,
      title: "Top 10 reasons to flaunt Demi-fine jewellery this Holi"
    },
    {
      image: blog_5,
      title: "Top 10 reasons to flaunt Demi-fine jewellery this Holi"
    }
  ];

  const thirdSection = [
    {
      image: blog_6,
      title: "Top 10 reasons to flaunt Demi-fine jewellery this Holi"
    },
    {
      image: blog_7,
      title: "Top 10 reasons to flaunt Demi-fine jewellery this Holi"
    },
    {
      image: blog_8,
      title: "Top 10 reasons to flaunt Demi-fine jewellery this Holi"
    }
  ];

  return (
    <Container>
      <Title>Blogs</Title>

      <SectionGrid>
        {firstSection.map((blog, index) => (
          <BlogCard key={index}>
            <BlogImage 
              src={blog.image} 
              alt={blog.title} 
              height={blog.height}
              mobileHeight={blog.mobileHeight} 
            />
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <ReadMore>Read more</ReadMore>
            </BlogContent>
          </BlogCard>
        ))}
      </SectionGrid>

      <SectionGrid 
        columns="1fr 1fr 1fr"
        tablet="repeat(2, 1fr)"
      >
        {secondSection.map((blog, index) => (
          <BlogCard key={index}>
            <BlogImage src={blog.image} alt={blog.title} />
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <ReadMore>Read more</ReadMore>
            </BlogContent>
          </BlogCard>
        ))}
      </SectionGrid>

      <SectionGrid 
        columns="1fr 1fr 1fr"
        tablet="repeat(2, 1fr)"
      >
        {thirdSection.map((blog, index) => (
          <BlogCard key={index}>
            <BlogImage src={blog.image} alt={blog.title} />
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <ReadMore>Read more</ReadMore>
            </BlogContent>
          </BlogCard>
        ))}
      </SectionGrid>
    </Container>
  );
};

export default BlogsOne;
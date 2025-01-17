import React from "react";
import styled from "styled-components";
import blogtwo_1 from "../assets/blogtwo_1.png";
import blogtwo_2 from "../assets/blogtwo_2.png";
import blogtwo_3 from "../assets/blogtwo_3.png";
import blogtwo_4 from "../assets/blogtwo_4.png";
import blogtwo_5 from "../assets/blogtwo_5.png";
import blogtwo_6 from "../assets/blogtwo_6.png";
import blogtwo_7 from "../assets/blogtwo_7.png";
import blogtwo_8 from "../assets/blogtwo_8.png";
import blogtwo_9 from "../assets/blogtwo_9.png";

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
  
  &:hover {
    transform: translateY(-5px);
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
  padding: 1.5rem 0;
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

const BlogsTwo = () => {
  const blogData = [
    {
      image: blogtwo_1,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogtwo_2,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogtwo_3,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogtwo_4,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogtwo_5,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogtwo_6,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogtwo_7,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogtwo_8,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogtwo_9,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    }
  ];

  return (
    <Container>
      <Title>Blogs</Title>
      <GridContainer>
        {blogData.map((blog, index) => (
          <BlogCard key={index}>
            <ImageContainer>
              <BlogImage src={blog.image} alt={blog.title} />
              <TagContainer>
                {blog.tags.map((tag, tagIndex) => (
                  <Tag key={tagIndex}>{tag}</Tag>
                ))}
              </TagContainer>
            </ImageContainer>
            <Content>
              <BlogTitle>{blog.title}</BlogTitle>
              <Description>{blog.description}</Description>
            </Content>
          </BlogCard>
        ))}
      </GridContainer>
    </Container>
  );
};

export default BlogsTwo;
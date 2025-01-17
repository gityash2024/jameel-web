import React from "react";
import styled from "styled-components";
import blogthree_1 from "../assets/blogthree_1.png";
import blogthree_2 from "../assets/blogthree_2.png";
import blogthree_3 from "../assets/blogthree_3.png";
import blogthree_4 from "../assets/blogthree_4.png";
import blogthree_5 from "../assets/blogthree_5.png";
import blogthree_6 from "../assets/blogthree_6.png";
import blogthree_7 from "../assets/blogthree_7.png";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #000;
`;

const FeaturedSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedImage = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 500px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FeaturedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContentBlock = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #000;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.div`
  position: relative;
`;

const CardImage = styled.div`
  position: relative;
  height: 280px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #000;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 0.875rem;
  line-height: 1.6;
`;

const BlogsThree = () => {
  const featuredContent = [
    {
      title: "Digital Marketing",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the..."
    },
    {
      title: "Digital Marketing",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the..."
    },
    {
      title: "Digital Marketing",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the..."
    }
  ];

  const gridContent = [
    {
      image: blogthree_2,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogthree_3,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogthree_4,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogthree_5,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogthree_6,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    },
    {
      image: blogthree_7,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the",
      tags: ["Jewelry", "Design"]
    }
  ];

  return (
    <Container>
      <Title>Blogs</Title>
      
      <FeaturedSection>
        <FeaturedImage>
          <img src={blogthree_1} alt="Featured" />
          <TagContainer>
            <Tag>Jewelry</Tag>
            <Tag>Design</Tag>
          </TagContainer>
        </FeaturedImage>
        <FeaturedContent>
          {featuredContent.map((content, index) => (
            <ContentBlock key={index}>
              <h2>{content.title}</h2>
              <p>{content.description}</p>
            </ContentBlock>
          ))}
        </FeaturedContent>
      </FeaturedSection>

      <GridSection>
        {gridContent.map((item, index) => (
          <BlogCard key={index}>
            <CardImage>
              <img src={item.image} alt={item.title} />
              <TagContainer>
                {item.tags.map((tag, tagIndex) => (
                  <Tag key={tagIndex}>{tag}</Tag>
                ))}
              </TagContainer>
            </CardImage>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </BlogCard>
        ))}
      </GridSection>
    </Container>
  );
};

export default BlogsThree;
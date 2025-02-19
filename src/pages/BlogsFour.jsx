import React from "react";
import styled from "styled-components";
import blogsfour_1 from "../assets/blogsfour_1.png";
import blogsfour_2 from "../assets/blogsfour_2.png";
import blogthree_5 from "../assets/blogthree_5.png";
import blogthree_6 from "../assets/blogthree_6.png";
import blogthree_7 from "../assets/blogthree_7.png";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const MainTitle = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #000;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const HeaderImage = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 1.5rem;
  position: relative;
  
  @media (min-width: 768px) {
    height: 500px;
    margin-bottom: 2rem;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.875rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }
`;

const IntroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 300px 1fr;
    gap: 4rem;
    margin-bottom: 3rem;
  }
`;

const IntroLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const IntroLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  
  @media (min-width: 768px) {
    padding-bottom: 1rem;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const ContentSection = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
    
    @media (min-width: 768px) {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  }

  p {
    color: #444;
    line-height: 1.6;
    margin-bottom: 1.25rem;
    
    @media (min-width: 768px) {
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }
  }
`;

const ContentImage = styled.div`
  width: 100%;
  height: 250px;
  margin: 1.5rem 0;
  
  @media (min-width: 768px) {
    height: 400px;
    margin: 2rem 0;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Features = styled.ul`
  list-style: disc;
  padding-left: 1.25rem;
  margin: 1.25rem 0;
  
  @media (min-width: 768px) {
    padding-left: 1.5rem;
    margin: 1.5rem 0;
  }
  
  li {
    margin-bottom: 0.5rem;
    color: #444;
  }
`;

const CommentsButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: #000;
  color: white;
  border: none;
  margin: 1.5rem 0;
  cursor: pointer;
  
  @media (min-width: 768px) {
    padding: 1rem;
    margin: 2rem 0;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const RelatedSection = styled.div`
  margin-top: 3rem;
  
  @media (min-width: 768px) {
    margin-top: 4rem;
  }
`;

const RelatedTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

const BlogCard = styled.div`
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 0.875rem;
    
    @media (min-width: 768px) {
      height: 250px;
      margin-bottom: 1rem;
    }
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.375rem;
    
    @media (min-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  }

  p {
    color: #666;
    font-size: 0.875rem;
    
    @media (min-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const TagContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8125rem;
  
  @media (min-width: 768px) {
    padding: 0.25rem 1rem;
    font-size: 0.875rem;
  }
`;

const BlogsFour = () => {
  const introLinks = ["Introduction", "Introduction", "Introduction"];
  
  const relatedPosts = [
    {
      image: blogthree_5,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the"
    },
    {
      image: blogthree_6,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the"
    },
    {
      image: blogthree_7,
      title: "Top 10 Reasons To Flaunt Demi Fine Jewellery",
      description: "Lorem Ipsum is simply dummy text of the"
    }
  ];

  return (
    <Container>
      <MainTitle>Top 10 reasons to flaunt Demi-fine jewellery this Holi</MainTitle>
      
      <HeaderImage>
        <img src={blogsfour_1} alt="Header" />
        <MetaInfo>
          <span>by Joanna Wellick</span>
          <span>2 minute read</span>
          <span>1.6K views</span>
          <span>1.2K shares</span>
        </MetaInfo>
      </HeaderImage>

      <IntroSection>
        <IntroLinks>
          {introLinks.map((link, index) => (
            <IntroLink key={index}>
              {link} <span>→</span>
            </IntroLink>
          ))}
        </IntroLinks>

        <ContentSection>
          <h2>Digital Marketing</h2>
          <p>Structured gripped tape invisible moulded cups for sauppor firm hold strong powermesh front liner sport detail. Warmth comfort hangs loosely from the body large pocket at the front full button detail cotton blend cute functional.</p>
          
          <ContentImage>
            <img src={blogsfour_2} alt="Content" />
          </ContentImage>

          <h2>Eu Ridiculus Fringilla Aenean</h2>
          <Features>
            <li>Crisp fresh iconic elegant timeless clean perfume</li>
            <li>Neck straight sharp silhouette and dart detail</li>
            <li>Machine wash cold slim fit premium stretch selvedge denim comfortable low waist</li>
          </Features>
          <p>Striking pewter studded epaulettes silver zips inner drawstring waist channel urban edge single-breasted jacket. Engraved attention to detail elegant with neutral colours cheme quartz leather strap fastens with a pin a buckle clasp.</p>

          <CommentsButton>VIEW COMMENTS (0)</CommentsButton>
        </ContentSection>
      </IntroSection>

      <RelatedSection>
        <RelatedTitle>Latest Blog</RelatedTitle>
        <RelatedGrid>
          {relatedPosts.map((post, index) => (
            <BlogCard key={index}>
              <img src={post.image} alt={post.title} />
              <TagContainer>
                <Tag>Jewelry</Tag>
                <Tag>Design</Tag>
              </TagContainer>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </BlogCard>
          ))}
        </RelatedGrid>
      </RelatedSection>
    </Container>
  );
};

export default BlogsFour;
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { blogAPI, authAPI } from "../services/api";
import { format } from "date-fns";
import { Calendar, User, Tag, Heart, MessageSquare, Share2, Facebook, Twitter, Instagram, Send } from "lucide-react";
import placeholderImage from "../assets/blogtwo_1.png";
import { toast } from "react-hot-toast";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const BreadcrumbContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const BreadcrumbLink = styled(Link)`
  color: #666;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #999;
`;

const BreadcrumbCurrent = styled.span`
  color: #333;
  font-weight: 500;
`;

const HeaderSection = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.875rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 2.5rem;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  flex: 1;
  
  @media (min-width: 1024px) {
    flex: 3;
  }
`;

const BlogContent = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 2.5rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem;
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  img {
    max-width: 100%;
    border-radius: 0.375rem;
    margin: 1.5rem 0;
  }
  
  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #555;
  }
`;

const InteractionSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 2.5rem;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.isLiked ? '#F9E4E8' : 'transparent'};
  color: ${props => props.isLiked ? '#E53E3E' : '#666'};
  border: 1px solid ${props => props.isLiked ? '#E53E3E' : '#ddd'};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isLiked ? '#F9E4E8' : '#f5f5f5'};
  }
`;

const ShareContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: transparent;
  border: 1px solid #ddd;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const Sidebar = styled.div`
  @media (min-width: 1024px) {
    flex: 1;
    padding-left: 2rem;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 2.5rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #eee;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagItem = styled.span`
  background: #f5f5f5;
  color: #333;
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  border-radius: 2rem;
`;

const RelatedPostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const RelatedPostCard = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const RelatedPostImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const RelatedPostContent = styled.div`
  flex: 1;
`;

const RelatedPostTitle = styled(Link)`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  &:hover {
    color: #000;
  }
`;

const RelatedPostDate = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.5rem;
`;

const CommentsSection = styled.div`
  margin-top: 3rem;
`;

const CommentsSectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CommentCard = styled.div`
  display: flex;
  gap: 1rem;
`;

const CommentAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #666;
  flex-shrink: 0;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommentUser = styled.div`
  font-weight: 500;
`;

const CommentDate = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const CommentText = styled.div`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const CommentForm = styled.form`
  margin-top: 3rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 0.5rem;
`;

const CommentFormTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const SubmitButton = styled.button`
  background: #000;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #333;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
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

const AuthMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 0.375rem;
  margin-bottom: 2rem;
`;

const AuthLink = styled(Link)`
  color: #000;
  font-weight: 500;
  text-decoration: underline;
  
  &:hover {
    opacity: 0.8;
  }
`;

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jammelUser, setJammelUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('jammelUser');
    
    if (token && userDataStr) {
      setIsLoggedIn(true);
      setJammelUser(JSON.parse(userDataStr));
    }
    
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        
        const response = await blogAPI.getBlog(slug);
        const blogData = response.data.data.post;
        
        setBlog(blogData);
        setLikesCount(blogData.likes?.length || 0);
        
        if (token && userDataStr) {
          const userData = JSON.parse(userDataStr);
          if (userData && blogData.likes) {
            setIsLiked(blogData.likes.includes(userData.data.user._id));
          }
        }
        
        const commentsResponse = await blogAPI.getBlogComments(slug);
        setComments(commentsResponse.data.data.comments || []);
        
        let categoryIds = [];
        if (blogData.categories && blogData.categories.length > 0) {
          categoryIds = typeof blogData.categories[0] === 'string' 
            ? blogData.categories 
            : blogData.categories.map(cat => cat._id);
          
          if (categoryIds.length > 0) {
            const relatedResponse = await blogAPI.getAllBlogs({
              limit: 3,
              status: 'published',
              sort: '-createdAt'
            });
            
            const filteredRelated = relatedResponse.data.data.posts
              .filter(post => post._id !== blogData._id)
              .slice(0, 3);
            
            setRelatedPosts(filteredRelated);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setError('Failed to load blog details. Please try again later.');
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogDetails();
    }
  }, [slug]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to like this post');
      return;
    }
    
    try {
      if (isLiked) {
        await blogAPI.unlikeBlog(slug);
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      } else {
        await blogAPI.likeBlog(slug);
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch (error) {
      toast.error('Failed to update like status');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error('Please login to comment');
      return;
    }
    
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    try {
      setSubmitting(true);
      await blogAPI.addBlogComment(slug, { content: commentText });
      
      const commentsResponse = await blogAPI.getBlogComments(slug);
      setComments(commentsResponse.data.data.comments || []);
      
      setCommentText('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || 'Check out this blog post';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url)
          .then(() => toast.success('Link copied to clipboard'))
          .catch(() => toast.error('Failed to copy link'));
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>Loading blog details...</LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>{error}</ErrorContainer>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container>
        <ErrorContainer>Blog post not found</ErrorContainer>
      </Container>
    );
  }

  const publishDate = blog.publishDate 
    ? new Date(blog.publishDate) 
    : blog.createdAt 
      ? new Date(blog.createdAt) 
      : new Date();

  return (
    <Container>
      <BreadcrumbContainer>
        <BreadcrumbLink to="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbLink to="/blogs-one">Blogs</BreadcrumbLink>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbCurrent>{blog.title}</BreadcrumbCurrent>
      </BreadcrumbContainer>
      
      <HeaderSection>
        <Title>{blog.title}</Title>
        
        <MetaInfo>
          <MetaItem>
            <Calendar size={16} />
            {format(publishDate, 'MMMM d, yyyy')}
          </MetaItem>
          
          {blog.author && (
            <MetaItem>
              <User size={16} />
              {blog.author.firstName} {blog.author.lastName}
            </MetaItem>
          )}
          
          <MetaItem>
            <Heart size={16} />
            {likesCount} likes
          </MetaItem>
          
          <MetaItem>
            <MessageSquare size={16} />
            {comments.length} comments
          </MetaItem>
        </MetaInfo>
      </HeaderSection>
      
      {blog.featuredImage && blog.featuredImage[0] && (
        <FeaturedImage 
          src={blog.featuredImage[0]} 
          alt={blog.title} 
        />
      )}
      
      <ContentSection>
        <MainContent>
          <BlogContent dangerouslySetInnerHTML={{ __html: blog.content }} />
          
          <InteractionSection>
            <LikeButton onClick={handleLike} isLiked={isLiked}>
              <Heart size={16} fill={isLiked ? "#E53E3E" : "none"} />
              {isLiked ? 'Liked' : 'Like'} ({likesCount})
            </LikeButton>
            
            <ShareContainer>
              <ShareButton onClick={() => handleShare('facebook')}>
                <Facebook size={16} />
              </ShareButton>
              <ShareButton onClick={() => handleShare('twitter')}>
                <Twitter size={16} />
              </ShareButton>
              <ShareButton onClick={() => handleShare('email')}>
                <Send size={16} />
              </ShareButton>
              <ShareButton onClick={() => handleShare('copy')}>
                <Share2 size={16} />
              </ShareButton>
            </ShareContainer>
          </InteractionSection>
          
          <CommentsSection>
            <CommentsSectionTitle>
              Comments ({comments.length})
            </CommentsSectionTitle>
            
            {comments.length > 0 ? (
              <CommentsList>
                {comments.map((comment) => (
                  <CommentCard key={comment._id}>
                    <CommentAvatar>
                      {comment.user?.firstName?.charAt(0) || 'U'}
                    </CommentAvatar>
                    <CommentContent>
                      <CommentHeader>
                        <CommentUser>
                          {comment.user?.firstName} {comment.user?.lastName}
                        </CommentUser>
                        <CommentDate>
                          {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                        </CommentDate>
                      </CommentHeader>
                      <CommentText>{comment.content}</CommentText>
                    </CommentContent>
                  </CommentCard>
                ))}
              </CommentsList>
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
            
            {isLoggedIn ? (
              <CommentForm onSubmit={handleCommentSubmit}>
                <CommentFormTitle>Leave a comment</CommentFormTitle>
                <FormGroup>
                  <FormLabel htmlFor="comment">Your comment</FormLabel>
                  <FormTextarea
                    id="comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment here..."
                    required
                  />
                </FormGroup>
                <SubmitButton type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Post Comment'}
                </SubmitButton>
              </CommentForm>
            ) : (
              <AuthMessage>
                Please <AuthLink to="/login">login</AuthLink> to leave a comment.
              </AuthMessage>
            )}
          </CommentsSection>
        </MainContent>
        
        <Sidebar>
          {blog.categories && blog.categories.length > 0 && (
            <SidebarSection>
              <SidebarTitle>Categories</SidebarTitle>
              <TagsContainer>
                {blog.categories.map((category, index) => (
                  <TagItem key={index}>
                    {typeof category === 'string' ? category : category.name}
                  </TagItem>
                ))}
              </TagsContainer>
            </SidebarSection>
          )}
          
          {blog.tags && blog.tags.length > 0 && (
            <SidebarSection>
              <SidebarTitle>Tags</SidebarTitle>
              <TagsContainer>
                {blog.tags.map((tag, index) => (
                  <TagItem key={index}>
                    {typeof tag === 'string' ? tag : tag.name}
                  </TagItem>
                ))}
              </TagsContainer>
            </SidebarSection>
          )}
          
          {relatedPosts.length > 0 && (
            <SidebarSection>
              <SidebarTitle>Related Posts</SidebarTitle>
              <RelatedPostsGrid>
                {relatedPosts.map((post) => (
                  <RelatedPostCard key={post._id}>
                    <RelatedPostImage 
                      src={post.featuredImage?.[0] || placeholderImage} 
                      alt={post.title} 
                    />
                    <RelatedPostContent>
                      <RelatedPostTitle to={`/blog/${post.slug}`}>
                        {post.title}
                      </RelatedPostTitle>
                      <RelatedPostDate>
                        {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                      </RelatedPostDate>
                    </RelatedPostContent>
                  </RelatedPostCard>
                ))}
              </RelatedPostsGrid>
            </SidebarSection>
          )}
        </Sidebar>
      </ContentSection>
    </Container>
  );
};

export default BlogDetails;
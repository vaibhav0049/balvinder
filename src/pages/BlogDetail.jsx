import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../Api';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchBlogDetail = async () => {
    try {
      const formdata = new FormData();
      formdata.append('id', id);
      const response = await axios.post(`${API_BASE_URL}/front/blogdetail`, formdata);
      setBlog(response.data.blog_detail);
    } catch (error) {
      console.error('Error fetching blog detail:', error);
    }
  }

  const fetchRecentPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/front/recentblogdetail`);
      setRecentPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchBlogDetail(), fetchRecentPosts()]);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const handleRecentPostClick = (postId) => {
    setImageLoaded(false);
    navigate(`/blog/${postId}`);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)'
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{
              width: 50,
              height: 50,
              border: '4px solid rgba(255,255,255,0.3)',
              borderTop: '4px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{ fontSize: 18, fontWeight: 500 }}>Loading spiritual wisdom...</p>
          </div>
        </div>
        <Footer />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#333', marginBottom: 16 }}>Blog not found</h2>
            <p style={{ color: '#666', marginBottom: 24 }}>The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/blogs')}
              style={{
                background: 'linear-gradient(45deg, #8B4513, #A0522D)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 600,
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Back to Blogs
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{
        background: 'linear-gradient(135deg, #f8f6f3 0%, #e8e4e0 50%, #f0ece8 100%)',
        minHeight: '100vh',
        padding: '40px 0'
      }}>
        <div className="container">
          <div className="row" style={{ justifyContent: 'center' }}>
            {/* Main Content */}
            <div className="col-lg-8 col-md-12" style={{ marginBottom: 32 }}>
              <article style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(139, 69, 19, 0.15), 0 5px 15px rgba(160, 82, 45, 0.1)',
                overflow: 'hidden',
                animation: 'slideInUp 0.8s ease-out',
                position: 'relative',
                border: '1px solid rgba(139, 69, 19, 0.1)'
              }}>
                {/* Hero Image */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                      transform: imageLoaded ? 'scale(1)' : 'scale(1.1)',
                      filter: imageLoaded ? 'blur(0)' : 'blur(5px)'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.3))'
                  }}></div>
                </div>

                {/* Content */}
                <div style={{ padding: '40px' }}>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: '2rem',
                    background: 'linear-gradient(135deg, #8B4513 0%, #6B5B95 50%, #A0522D 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '32px',
                    lineHeight: 1.2,
                    animation: 'fadeInUp 1s ease-out 0.3s both'
                  }}>
                    {blog.title}
                  </h3>
                  
                  <div style={{
                    color: '#444',
                    fontSize: '18px',
                    lineHeight: 1.8,
                    animation: 'fadeInUp 1s ease-out 0.6s both'
                  }} 
                  dangerouslySetInnerHTML={{ __html: blog.content }} 
                  />
                </div>
              </article>
            </div>

            {/* Enhanced Sidebar */}
            <div className="col-lg-4 col-md-12">
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(139, 69, 19, 0.15), 0 5px 15px rgba(160, 82, 45, 0.1)',
                padding: '32px',
                position: 'sticky',
                top: '20px',
                animation: 'slideInRight 0.8s ease-out 0.4s both',
                border: '1px solid rgba(139, 69, 19, 0.1)'
              }}>
                <h3 style={{
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  marginBottom: '24px',
                  background: 'linear-gradient(135deg, #8B4513 0%, #6B5B95 50%, #A0522D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Recent Posts
                </h3>
                
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {recentPosts.map((post, index) => (
                    <div 
                      key={post.bl_id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        cursor: 'pointer',
                        padding: '12px',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        background: 'transparent',
                        animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.1}s both`
                      }}
                      onClick={() => handleRecentPostClick(post.bl_id)}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.08) 0%, rgba(107, 91, 149, 0.08) 50%, rgba(160, 82, 45, 0.08) 100%)';
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                                              <div style={{ 
                        position: 'relative',
                        marginRight: '16px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(139, 69, 19, 0.2)'
                      }}>
                        <img 
                          src={post.image} 
                          alt={post.title}
                          style={{
                            width: '70px',
                            height: '70px',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{
                          color: '#333',
                          fontWeight: 600,
                          fontSize: '15px',
                          lineHeight: 1.4,
                          display: 'block',
                          transition: 'color 0.3s ease'
                        }}>
                          {post.title.length > 40 ? post.title.slice(0, 37) + '...' : post.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Smooth scrollbar for recent posts */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        div::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          border-radius: 3px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #654321 0%, #8B4513 100%);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
          
          .col-lg-4 div {
            margin-top: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default BlogDetail;
import React, { useState ,useEffect} from 'react';
import '../App.css';
import breathworkImg from '../assets/images/breathwork.png';
import aboutOneImg from '../assets/images/about-one.png';
import mindTherapyImg from '../assets/images/mindtherapy.png';
import trendingAiToolImg from '../assets/images/trendingaitool.png';
import Footer from '../components/footer';
import axios from 'axios';
import { API_BASE_URL } from '../Api';
// Add this import for AnimatedSection
import { AnimatedSection } from './Home';
import { useNavigate } from 'react-router-dom';

const categories = [
  'All',
  'Mindful Ease',
  'Inside the Mind',
  'AI & You',
  'Wellness Insights',
  'Current Mental Issues',
  'Healing Methods',
  'Modern Struggles',
];

const blogPosts = [
  {
    id: 1,
    category: 'AI & You',
    title: 'The Effortless Effort: Unlocking the Paradox of Mindfulness Meditation',
    image: breathworkImg,
    description: '',
  },
  {
    id: 2,
    category: 'AI & You',
    title: 'Silence Your Inner Critic: Powerful Strategies to Conquer Negative Thoughts',
    image: aboutOneImg,
    description: '',
  },
  {
    id: 3,
    category: 'Current Mental Issues',
    title: 'Why Your Mind Feels Tired Even When You Do Nothing?',
    image: mindTherapyImg,
    description: '',
  },
  {
    id: 4,
    category: 'Inside the Mind',
    title: 'The Indian Mind: Exposing Mental Health Myths and Misconceptions Holding Us Back',
    image: trendingAiToolImg,
    description: '',
  },
  // Add more posts as needed
];

  const YouTube = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/front/fornt_iframe`);
      setVideos(response.data.iframe);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Filtering logic: match by category_id
  const filteredPosts =
    selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => String(post.category_id) === String(selectedCategory));

  return (
    <div className="blog-page" style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ padding: '40px 0 40px 0', textAlign: 'center', backgroundColor:'#f5f5f5'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
          </svg>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#222', margin: 0 }}>
            Exploring Life
          </h1>
        </div>
        <p style={{ fontSize: '1.1rem', color: '#666', margin: 0 }}>
          Discover insights, wisdom, and inspiration through our curated video content
        </p>
      </div>

      {/* YouTube Videos Grid Section */}
      {videos && videos.length > 0 && (
        <div style={{ 
          padding: '40px 20px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div className="row">
            {videos.map((video) => (
              <div key={video.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div style={{
                  width: '100%',
                  height: '315px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: video.iframe.replace(
                        /width="\d+"/g, 'width="100%"'
                      ).replace(
                        /height="\d+"/g, 'height="315"'
                      )
                    }} 
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {videos && videos.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#666'
        }}>
          <h3>No videos available at the moment</h3>
          <p>Please check back later for exciting content!</p>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default YouTube;
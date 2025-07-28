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

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clickedId, setClickedId] = useState(null);
  const navigate = useNavigate();

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/front/blog`);
      setBlogPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/front/category`);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
    fetchCategories();
  }, []);

  const redirect = (id) => {
    navigate(`/blog/${id}`);
  }

  // Filtering logic: match by category_id
  const filteredPosts =
    selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => String(post.category_id) === String(selectedCategory));

  return (
    <div className="blog-page" style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ padding: '40px 0 40px 0', textAlign: 'center' ,backgroundColor:'#f5f5f5'}}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#222' }}>Our Blog</h1>
      </div>
      {/* Category Buttons with Animation */}
      <AnimatedSection>
        <div className="blog-categories" style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '32px 0' }}>
          <button
            key="All"
            onClick={() => setSelectedCategory('All')}
            style={{
              background: 'none',
              boxShadow: 'none',
              border: 'none',
              borderBottom: selectedCategory === 'All' ? '2px solid #ff7f50' : '2px solid transparent',
              color: selectedCategory === 'All' ? '#ff7f50' : '#222',
              fontWeight: 500,
              fontSize: '1rem',
              padding: '8px 0',
              cursor: 'pointer',
              outline: 'none',
              transition: 'color 0.2s',
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                background: 'none',
                boxShadow: 'none',
                border: 'none',
                borderBottom: selectedCategory === cat.id ? '2px solid #ff7f50' : '2px solid transparent',
                color: selectedCategory === cat.id ? '#ff7f50' : '#222',
                fontWeight: 500,
                fontSize: '1rem',
                padding: '8px 0',
                cursor: 'pointer',
                outline: 'none',
                transition: 'color 0.2s',
              }}
            >
              {cat.category_name}
            </button>
          ))}
        </div>
      </AnimatedSection>
      <div className="row blog-grid" style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 16px 40px 16px',
      }}>
        {filteredPosts.map((post) => (
          <div key={post.bl_id} className="col-lg-3 d-flex" style={{ marginBottom: 32 }}>
            <div
              className="blog-card"
              style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '326px',
                width: '100%',
                position: 'relative',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s',
                boxShadow: clickedId === post.bl_id ? '0 4px 24px #ff7f5040' : '0 2px 16px rgba(0,0,0,0.07)',
              }}
              onClick={() => { setClickedId(post.bl_id); redirect(post.bl_id)}}
              onMouseDown={() => setClickedId(post.bl_id)}
              onMouseUp={() => setClickedId(null)}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: '100%',
                  height: 180,
                  objectFit: 'cover',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  transform: clickedId === post.id ? 'scale(1.04)' : 'scale(1)',
                  boxShadow: clickedId === post.id ? '0 4px 24px #ff7f5040' : 'none',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#888', fontSize: 14 }}>{categories.find((cat) => String(cat.id) === String(post.category_id))?.category_name || ''}</span>
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    margin: '12px 0 0 0',
                    color: clickedId === post.id ? '#ff7f50' : '#222',
                    transition: 'color 0.2s',
                  }}
                >{post.title}</h3>
                <span style={{ position: 'absolute', bottom: 12, right: 20, fontSize: 12, color: '#888', fontStyle: 'italic' }}>
                  by balvinder kumar
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Blog; 
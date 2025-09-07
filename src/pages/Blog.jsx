import React, { useState ,useEffect} from 'react';
import '../App.css';
import './Blog.css';
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
      {/* Responsive Header */}
      <div className="blog-header">
        <h1 className="blog-title">Our Blog</h1>
      </div>
      
      {/* Responsive Category Buttons with Animation */}
      <AnimatedSection>
        <div className="blog-categories">
          <button
            key="All"
            onClick={() => setSelectedCategory('All')}
            className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {cat.category_name}
            </button>
          ))}
        </div>
      </AnimatedSection>
      
      {/* Responsive Blog Grid */}
      <div className="blog-grid">
        {filteredPosts.map((post) => (
          <div key={post.bl_id} className="blog-card-container">
            <div
              className={`blog-card ${clickedId === post.bl_id ? 'clicked' : ''}`}
              onClick={() => { setClickedId(post.bl_id); redirect(post.bl_id)}}
              onMouseDown={() => setClickedId(post.bl_id)}
              onMouseUp={() => setClickedId(null)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="blog-image"
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div className="blog-content">
                <span className="blog-category">
                  {categories.find((cat) => String(cat.id) === String(post.category_id))?.category_name || ''}
                </span>
                <h3 className={`blog-title-text ${clickedId === post.bl_id ? 'clicked' : ''}`}>
                  {post.title}
                </h3>
                <span className="blog-author">
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
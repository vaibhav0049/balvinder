import React, { useState ,useEffect} from 'react';
import '../App.css';
import breathworkImg from '../assets/images/breathwork.png';
import aboutOneImg from '../assets/images/about-one.png';
import mindTherapyImg from '../assets/images/mindtherapy.png';
import trendingAiToolImg from '../assets/images/trendingaitool.png';
import Footer from '../components/footer';
import axios from 'axios';
import { API_BASE_URL } from '../Api';

const paintings = [
  {
    id: 1,
    title: 'Mindful Ease',
    image: breathworkImg,
  },
  {
    id: 2,
    title: 'Inner Peace',
    image: aboutOneImg,
  },
  {
    id: 3,
    title: 'Mental Wellness',
    image: mindTherapyImg,
  },
  {
    id: 4,
    title: 'Modern Mind',
    image: trendingAiToolImg,
  },
  // Add more paintings as needed
];

const Gallery = () => {
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [paintings, setPaintings] = useState([]);


  const fetchPaintings = async () => {
    const response = await axios.get(`${API_BASE_URL}/front/front_image`);
    // Map API response to match expected property names
    const paintingsData = response.data.images.map(img => ({
      id: img.id,
      title: img.title,
      image: img.images, // API uses 'images', component expects 'image'
    }));
    setPaintings(paintingsData);
  }

  useEffect(() => {
    fetchPaintings();
  }, []);


  const openModal = (painting) => {
    setSelectedPainting(painting);
  };

  const closeModal = () => {
    setSelectedPainting(null);
  };

  return (
    <div className="gallery-page" style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ padding: '40px 0 40px 0', textAlign: 'center' ,backgroundColor:'#f5f5f5'}}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#222' }}>My Paintings</h1>
      </div>
      <div className="row gallery-grid" style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 16px 40px 16px',
        marginTop: '40px',
      }}>
        {paintings.map((painting) => (
          <div key={painting.id} className="col-lg-3 d-flex" style={{ marginBottom: 32 }}>
            <div className="painting-card" style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)';
            }}
            onClick={() => openModal(painting)}
            >
              <img src={painting.image} alt={painting.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detail view */}
      {selectedPainting && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }} onClick={closeModal}>
          <div style={{
            maxWidth: '90%',
            maxHeight: '90%',
            position: 'relative',
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: -40,
                right: 0,
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 1001,
              }}
            >
              ✕
            </button>
            <img 
              src={selectedPainting.image} 
              alt={selectedPainting.title} 
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
            <div style={{
              textAlign: 'center',
              marginTop: '16px',
              color: 'white',
            }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>{selectedPainting.title}</h3>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery; 
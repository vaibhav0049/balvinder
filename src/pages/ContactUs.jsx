import React, { useState } from 'react';
import '../App.css';
import Footer from '../components/footer';
import axios from 'axios';
import { API_BASE_URL } from '../Api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Create FormData and append fields
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('subject', formData.subject);
    data.append('message', formData.message);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/contact`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page" style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ padding: '40px 0 40px 0', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#222' }}>Contact Us</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '16px', maxWidth: '600px', margin: '16px auto 0' }}>
          Get in touch with us for any questions, collaborations, or just to say hello!
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px' }}>
        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-8">
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '40px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#222', marginBottom: '32px' }}>
                Send us a Message
              </h2>
              
              {submitStatus === 'success' && (
                <div style={{
                  background: '#d4edda',
                  color: '#155724',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  border: '1px solid #c3e6cb'
                }}>
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#ff7f50'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#ff7f50'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff7f50'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>
                
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff7f50'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: '#863d28',
                    color: 'white',
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => !isSubmitting && (e.target.style.background = '#6b2e1e')}
                  onMouseLeave={(e) => !isSubmitting && (e.target.style.background = '#863d28')}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4">
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '40px', height: 'fit-content' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#222', marginBottom: '32px' }}>
                Get in Touch
              </h3>
              
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '16px' }}>
                  📧 Email
                </h4>
                <p style={{ color: '#666', margin: 0 }}>
                  <a href="mailto:contact@balvinder.com" style={{ color: '#ff7f50', textDecoration: 'none' }}>
                    contact@balvinder.com
                  </a>
                </p>
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '16px' }}>
                  📱 Phone
                </h4>
                <p style={{ color: '#666', margin: 0 }}>
                  <a href="tel:+91-98765-43210" style={{ color: '#ff7f50', textDecoration: 'none' }}>
                    +91 98765 43210
                  </a>
                </p>
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '16px' }}>
                  📍 Address
                </h4>
                <p style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
                  123 Mindful Street<br />
                  Wellness District<br />
                  New Delhi, India 110001
                </p>
              </div>
              
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '16px' }}>
                  ⏰ Business Hours
                </h4>
                <p style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs; 
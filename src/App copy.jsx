import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Header from './components/header.jsx'
import AboutMe from './pages/AboutMe.jsx'
import Blog from './pages/Blog.jsx'
import Youtube from './pages/YouTube.jsx'
import Gallery from './pages/Gallery.jsx'
import Login from './pages/admin/login.jsx'
import './App.css'
import Sidebar from './components/Sidebar.jsx'
import BlogDetail from './pages/BlogDetail.jsx';
import ContactUs from './pages/ContactUs.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <>
            <Header />
            <Home />
          </>
        } />
        <Route path="/about" element={
          <>
            <Header />
            <AboutMe />
          </>
        } />
        <Route path="/blog" element={
          <>
            <Header />
            <Blog />
          </>
        } />
        <Route path="/blog/:id" element={
          <BlogDetail />
        } />
        <Route path="/youtube" element={
          <>
            <Header />
            <Youtube />
          </>
        } />
        <Route path="/gallery" element={
          <>
            <Header />
            <Gallery />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Header />
            <ContactUs />
          </>
        } />
        {/* Admin routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <Sidebar />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  FormControlLabel,
  Switch,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  Chip
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ToggleOn,
  ToggleOff
} from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Header from '../../components/header';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../Api';
// Custom Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder = "Start writing..." }) => {
  const editorRef = React.useRef(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [showLinkDialog, setShowLinkDialog] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState('');
  const [linkText, setLinkText] = React.useState('');

  // Update editor content when value prop changes
  React.useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleKeyDown = (e) => {
    // Ctrl+B for bold
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      execCommand('bold');
    }
    // Ctrl+I for italic
    if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      execCommand('italic');
    }
    // Ctrl+U for underline
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      execCommand('underline');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = `<img src="${e.target.result}" style="max-width: 100%; height: auto;" />`;
        execCommand('insertHTML', img);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const link = `<a href="${linkUrl}" target="_blank">${linkText}</a>`;
      execCommand('insertHTML', link);
      setShowLinkDialog(false);
      setLinkUrl('');
      setLinkText('');
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const toolbarStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    padding: '8px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px 4px 0 0'
  };

  const buttonStyle = {
    padding: '6px 8px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '30px',
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold'
  };

  const selectStyle = {
    padding: '4px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    backgroundColor: 'white',
    cursor: 'pointer'
  };

  const editorStyle = {
    minHeight: '300px',
    padding: '12px',
    border: 'none',
    outline: 'none',
    lineHeight: '1.5',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif'
  };

  const containerStyle = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    position: isFullscreen ? 'fixed' : 'relative',
    top: isFullscreen ? '0' : 'auto',
    left: isFullscreen ? '0' : 'auto',
    width: isFullscreen ? '100vw' : '100%',
    height: isFullscreen ? '100vh' : 'auto',
    zIndex: isFullscreen ? 9999 : 1,
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={containerStyle}>
      {/* Toolbar */}
      <div style={toolbarStyle}>
        {/* Text Formatting */}
        <button type="button" style={buttonStyle} onClick={() => execCommand('bold')} title="Bold">
          <strong>B</strong>
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('italic')} title="Italic">
          <em>I</em>
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('underline')} title="Underline">
          <u>U</u>
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('strikeThrough')} title="Strikethrough">
          <s>S</s>
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }} />

        {/* Headings */}
        <select style={selectStyle} onChange={(e) => execCommand('formatBlock', e.target.value)}>
          <option value="">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>

        {/* Font Size */}
        <select style={selectStyle} onChange={(e) => execCommand('fontSize', e.target.value)}>
          <option value="">Size</option>
          <option value="1">8px</option>
          <option value="2">10px</option>
          <option value="3">12px</option>
          <option value="4">14px</option>
          <option value="5">18px</option>
          <option value="6">24px</option>
          <option value="7">36px</option>
        </select>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }} />

        {/* Alignment */}
        <button type="button" style={buttonStyle} onClick={() => execCommand('justifyLeft')} title="Align Left">
          ⬅
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('justifyCenter')} title="Align Center">
          ↔
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('justifyRight')} title="Align Right">
          ➡
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('justifyFull')} title="Justify">
          ⬌
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }} />

        {/* Lists */}
        <button type="button" style={buttonStyle} onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
          • List
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('insertOrderedList')} title="Numbered List">
          1. List
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('indent')} title="Indent">
          ➤
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('outdent')} title="Outdent">
          ◀
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }} />

        {/* Colors */}
        <input
          type="color"
          style={{ ...buttonStyle, width: '40px', height: '30px', padding: '2px' }}
          onChange={(e) => execCommand('foreColor', e.target.value)}
          title="Text Color"
        />
        <input
          type="color"
          style={{ ...buttonStyle, width: '40px', height: '30px', padding: '2px' }}
          onChange={(e) => execCommand('backColor', e.target.value)}
          title="Background Color"
        />

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }} />

        {/* Media */}
        <button type="button" style={buttonStyle} onClick={() => setShowLinkDialog(true)} title="Insert Link">
          🔗
        </button>
        <label style={{ ...buttonStyle, cursor: 'pointer' }} title="Insert Image">
          📷
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </label>
        <button type="button" style={buttonStyle} onClick={() => execCommand('insertHTML', '<hr>')} title="Insert Line">
          ━
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }} />

        {/* Table */}
        <button
          type="button"
          style={buttonStyle}
          onClick={() => execCommand('insertHTML', '<table border="1" style="border-collapse: collapse;"><tr><td>Cell 1</td><td>Cell 2</td></tr><tr><td>Cell 3</td><td>Cell 4</td></tr></table>')}
          title="Insert Table"
        >
          ⊞
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }} />

        {/* Undo/Redo */}
        <button type="button" style={buttonStyle} onClick={() => execCommand('undo')} title="Undo">
          ↩
        </button>
        <button type="button" style={buttonStyle} onClick={() => execCommand('redo')} title="Redo">
          ↪
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }} />

        {/* Fullscreen */}
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setIsFullscreen(!isFullscreen)}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? '✕' : '⛶'}
        </button>

        {/* Clear Formatting */}
        <button type="button" style={buttonStyle} onClick={() => execCommand('removeFormat')} title="Clear Formatting">
          Clear
        </button>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        style={{
          ...editorStyle,
          height: isFullscreen ? 'calc(100vh - 60px)' : '300px',
          overflow: 'auto'
        }}
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          zIndex: 10000
        }}>
          <h3>Insert Link</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Link Text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '8px', border: '1px solid #ddd', borderRadius: '3px' }}
            />
            <input
              type="url"
              placeholder="URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '3px' }}
            />
          </div>
          <button type="button" onClick={insertLink} style={{ marginRight: '8px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
            Insert
          </button>
          <button type="button" onClick={() => setShowLinkDialog(false)} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, -5%)",
  width: "90%",
  maxWidth: 1200,
  maxHeight: "90vh",
  backgroundColor: "white",
  boxShadow: 24,
  padding: 4,
  borderRadius: "8px",
  overflow: "auto"
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category_id: "",
    content: "",
    image: null,
    alt_text: "",
    seo_title: "",
    seo_keywords: "",
    seo_description: "",
    status: "1"
  });

  const [imagePreview, setImagePreview] = useState(null);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
  });

  const fetchBlogs = () => {
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/blog/list`, {}, { headers: getAuthHeaders() })
      .then((response) => {
        setBlogs(response.data.blog || []);
      })
      .catch((error) => console.error("Error fetching blogs:", error))
      .finally(() => setLoading(false));
  };

  const fetchCategories = () => {
    axios
      .post(`${API_BASE_URL}/category/list`, {}, { headers: getAuthHeaders() })
      .then((response) => {
        setCategories(response.data.category || []);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleTitleChange = (title) => {
    handleInputChange('title', title);
    handleInputChange('slug', generateSlug(title));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Title and content are required");
      return;
    }

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (key === "image") {
          // Only append if it's a File object (new image selected)
          if (formData[key] instanceof File) {
            submitData.append(key, formData[key]);
            console.log("Appending new image to FormData:", formData[key]);
          } else if (formData[key] && typeof formData[key] === 'string') {
            // If it's a string (existing image filename), append it
            submitData.append('existing_image', formData[key]);
            console.log("Keeping existing image:", formData[key]);
          }
        } else {
          submitData.append(key, formData[key]);
        }
      }
    });

    if (editingId) {
      submitData.append("id", editingId);
    }

    const url = `${API_BASE_URL}/blog/create`;

    try {
      const response = await axios.post(url, submitData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.status === "Success"){
        setSnackbarSeverity("success");
        setSnackbarMessage(
          response.data.message ||
            (editingId
              ? "Blog Updated Successfully!"
              : "Blog Added Successfully!")
        );
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          response.data.message || "Error occurred while saving blog."
        );
      }

      fetchBlogs();
      setSnackbarOpen(true);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving blog:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("An unexpected error occurred.");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (blog) => {
    let content = blog.content || "";
    // Try to decode JSON if content is a JSON string with an 'html' key
    try {
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === 'object' && parsed.html) {
        content = parsed.html;
      }
    } catch (e) {
      // Not JSON, use as is
    }
    setEditingId(blog.bl_id);
    setFormData({
      id: blog.bl_id || "",
      title: blog.title || "",
      slug: blog.post_slug || "",
      category_id: blog.category_id || "",
      content: content,
      image: blog.image || "",
      alt_text: blog.alt_tag || "",
      seo_title: blog.btitle || "",
      seo_keywords: blog.bkeyword || "",
      seo_description: blog.bdescription || "",
      status: blog.status || "1"
    });
    setImagePreview(blog.image ? `${API_BASE_URL}/uploads/images/${blog.image}` : null);
    setOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category_id: "",
      content: "",
      image: null,
      alt_text: "",
      seo_title: "",
      seo_keywords: "",
      seo_description: "",
      status: "1"
    });
    setImagePreview(null);
    setOpen(true);
  };



  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus == 1 ? "A" : "B";
      const formData = new FormData();
      formData.append("bl_id", id);
      formData.append("status", newStatus);

      const response = await axios.post(
        `${API_BASE_URL}/blog/delete`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.status === "Success") {
        setSnackbarSeverity("success");
        setSnackbarMessage("Blog status updated successfully!");
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error updating blog status.");
      }

      fetchBlogs();
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating blog status:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("An unexpected error occurred.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category_id: "",
      content: "",
      image: null,
      alt_text: "",
      seo_title: "",
      seo_keywords: "",
      seo_description: "",
      status: "1"
    });
    setImagePreview(null);
    // Reset link dialog state
    setShowLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', padding: '32px' }}>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="page-title mb-0 font-size-18">Blog Management</h4>
              </div>
            </div>
          </div>
          <Box p={2}>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <CircularProgress />
              </div>
            ) : (
              <>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <Button
                    style={{ backgroundColor: "#28408f" }}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddNew}
                  >
                    Add Blog
                  </Button>
                </Box>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="table-responsive">
                        <table className="table mb-0 tbl">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Image</th>
                              <th>Title</th>
                              <th>Category</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedBlogs.map((blog, index) => (
                              <tr key={blog.bl_id}>
                                <th scope="row">
                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                </th>
                                <td>
                                  {blog.image ? (
                                    <img 
                                      src={`${API_BASE_URL}/uploads/images/${blog.image}`}
                                      alt={blog.title}
                                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                  ) : (
                                    <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      No Image
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <Typography variant="body2" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {blog.title}
                                  </Typography>
                                </td>
                                <td>
                                  {categories.find(cat => cat.id === blog.category_id)?.category_name || 'N/A'}
                                </td>
                                
                                <td>
                                  <IconButton
                                    color="primary"
                                    onClick={() => handleEdit(blog)}
                                    size="small"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    color="error"
                                    onClick={() =>
                                      handleToggleStatus(
                                        blog.bl_id,
                                        blog.status
                                      )
                                    }
                                    size="small"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                 
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Box display="flex" justifyContent="center" mt={2}>
                  <Pagination
                    count={Math.ceil(blogs.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>

                <Modal open={open} onClose={handleCloseModal}>
                  <Box sx={modalStyle}>
                    <Typography variant="h6" gutterBottom>
                      {editingId ? "Edit Blog" : "Add New Blog"}
                    </Typography>
                    
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Blog Title */}
                        <TextField
                          fullWidth
                          label="Blog Title"
                          required
                          value={formData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          variant="outlined"
                        />
                        
                        {/* Slug */}
                        <TextField
                          fullWidth
                          label="Slug"
                          value={formData.slug}
                          onChange={(e) => handleInputChange('slug', e.target.value)}
                          variant="outlined"
                          helperText="URL-friendly version of the title"
                        />

                        {/* Category */}
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Category</InputLabel>
                          <Select
                            value={formData.category_id}
                            onChange={(e) => handleInputChange('category_id', e.target.value)}
                            label="Category"
                          >
                            {categories.map((category) => (
                              <MenuItem key={category.id} value={category.id}>
                                {category.category_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        {/* Alt Text */}
                        <TextField
                          fullWidth
                          label="Alt Text for Image"
                          value={formData.alt_text}
                          onChange={(e) => handleInputChange('alt_text', e.target.value)}
                          variant="outlined"
                        />

                        {/* Blog Image */}
                        <Box>
                          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Blog Image
                          </Typography>
                          {editingId && formData.image && typeof formData.image === 'string' && (
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                              Current image: {formData.image} (Upload a new image to replace it)
                            </Typography>
                          )}
                          <input
                            accept="image/*"
                            type="file"
                            onChange={handleImageChange}
                            style={{ 
                              marginBottom: '10px',
                              padding: '8px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              width: '100%'
                            }}
                          />
                          {imagePreview && (
                            <Box mt={1}>
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
                              />
                            </Box>
                          )}
                        </Box>

                        {/* Content Editor */}
                        <Box>
                          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Content
                          </Typography>
                          <RichTextEditor
                            value={formData.content}
                            onChange={(content) => handleInputChange('content', content)}
                            placeholder="Start writing your blog content..."
                          />
                        </Box>

                        {/* SEO Section Header */}
                        <Box sx={{ mt: 4, mb: 2 }}>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            SEO Information
                          </Typography>
                        </Box>

                        {/* SEO Title */}
                        <TextField
                          fullWidth
                          label="SEO Title"
                          value={formData.seo_title}
                          onChange={(e) => handleInputChange('seo_title', e.target.value)}
                          variant="outlined"
                          helperText="Title for search engines (recommended: 50-60 characters)"
                        />

                        {/* SEO Keywords */}
                        <TextField
                          fullWidth
                          label="SEO Keywords"
                          value={formData.seo_keywords}
                          onChange={(e) => handleInputChange('seo_keywords', e.target.value)}
                          variant="outlined"
                          helperText="Keywords separated by commas"
                        />

                        {/* SEO Description */}
                        <TextField
                          fullWidth
                          label="SEO Description"
                          value={formData.seo_description}
                          onChange={(e) => handleInputChange('seo_description', e.target.value)}
                          variant="outlined"
                          multiline
                          rows={3}
                          helperText="Description for search engines (recommended: 150-160 characters)"
                        />
                      </Box>

                      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={handleCloseModal} variant="outlined">
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                          {editingId ? "Update Blog" : "Save Blog"}
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Modal>

                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={snackbarSeverity === "success" ? 3000 : null}
                  onClose={() => setSnackbarOpen(false)}
                >
                  <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default BlogList;
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
  Card,
  CardMedia
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../Api';

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "white",
  boxShadow: 24,
  padding: 4,
  borderRadius: "8px",
  maxHeight: "90vh",
  overflow: "auto"
};

const Images = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [removedImageIndexes, setRemovedImageIndexes] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const navigate = useNavigate();

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
  });

  // const fetchImages = () => {
  //   setLoading(true);
  //   axios
  //     .get(`${API_BASE_URL}/image/list`, {}, { headers: getAuthHeaders() })
  //     .then((response) => {
  //       setImages(response.data.images || []);
  //     })
  //     .catch((error) => console.error("Error fetching images:", error))
  //     .finally(() => setLoading(false));
  // };

  const fetchImages = () => {
    setLoading(true); // Start loader
    axios
      .post(`${API_BASE_URL}/image/list`, {}, { headers: getAuthHeaders() })
      .then((response) => {
        setImages(response.data.images || []);
      })
      .catch((error) => console.error("Error fetching images:", error))
      .finally(() => setLoading(false)); // Stop loader
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedImages(files);
      
      // Create previews for all selected images
      const previews = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          previews.push({
            name: file.name,
            url: e.target.result
          });
          setImagePreviews([...previews]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index) => {
    setRemovedImageIndexes(prev => [...prev, index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageTitle) {
      alert("Image title is required");
      return;
    }

    if (selectedImages.length === 0 && !editingId) {
      alert("Please select at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("title", imageTitle);

    if (selectedImages.length > 0) {
      selectedImages.forEach((image, index) => {
        formData.append(`images[]`, image);
      });
    }

    // For edit mode, add remaining images (excluding removed ones)
    if (editingId) {
      formData.append("id", editingId);
      
      // Filter out removed images and add remaining ones
      const remainingImages = imagePreviews.filter((_, index) => !removedImageIndexes.includes(index));
      remainingImages.forEach((image, index) => {
        formData.append(`images[]`, image.url);
      });
    }

    const url = `${API_BASE_URL}/image/create`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.status === "Success") {
        setSnackbarSeverity("success");
        setSnackbarMessage(
          response.data.message ||
            (editingId
              ? "Image Updated Successfully!"
              : "Image Added Successfully!")
        );
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          response.data.message || "Error occurred while saving image."
        );
      }

      fetchImages();
      setSnackbarOpen(true);
      setOpen(false);
      setEditingId(null);
      setImageTitle("");
      setSelectedImages([]);
      setImagePreviews([]);
      setRemovedImageIndexes([]);
    } catch (error) {
      console.error("Error saving image:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("An unexpected error occurred.");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (imageGroup) => {
    setEditingId(imageGroup.id);
    setImageTitle(imageGroup.title);
    setRemovedImageIndexes([]); // Reset removed images when editing starts
    
    // Handle images array - it can be either URLs or filenames
    let imageFiles = [];
    if (Array.isArray(imageGroup.images)) {
      imageFiles = imageGroup.images;
    } else {
      try {
        imageFiles = JSON.parse(imageGroup.images || '[]');
      } catch (error) {
        console.error('Error parsing images JSON:', error);
        imageFiles = [];
      }
    }
    
    // Create previews for existing images
    const previews = imageFiles.map((imageFile, index) => ({
      name: `Current Image ${index + 1}`,
      url: imageFile.startsWith('http') ? imageFile : `${API_BASE_URL}/uploads/${imageFile}`
    }));
    
    setImagePreviews(previews);
    setOpen(true);
  };



  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "1" ? "A" : "B";
      const formData = new FormData();
      formData.append("id", id);
      formData.append("status", newStatus);

      const response = await axios.post(
        `${API_BASE_URL}/image/delete`,
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
        setSnackbarMessage("Image Status Updated Successfully!");
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(response.data.message || "Error updating image status.");
      }

      fetchImages();
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating image status:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("An unexpected error occurred while updating status.");
      setSnackbarOpen(true);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', padding: '32px' }}>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="page-title mb-0 font-size-18">Manage Images</h4>
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
                    onClick={() => {
                      setEditingId(null);
                      setImageTitle("");
                      setSelectedImages([]);
                      setImagePreviews([]);
                      setRemovedImageIndexes([]);
                      setOpen(true);
                    }}
                  >
                    Add Image
                  </Button>
                </Box>

                <div className="row">
                  {paginatedImages.map((imageGroup, index) => {
                    // Handle images array - it can be either URLs or filenames
                    let imageFiles = [];
                    if (Array.isArray(imageGroup.images)) {
                      imageFiles = imageGroup.images;
                    } else {
                      try {
                        imageFiles = JSON.parse(imageGroup.images || '[]');
                      } catch (error) {
                        console.error('Error parsing images JSON:', error);
                        imageFiles = [];
                      }
                    }

                    return (
                      <div key={imageGroup.id} className="col-lg-6 col-md-8 col-sm-12 mb-4">
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ p: 2, flexGrow: 1 }}>
                            <Typography variant="h6" component="div" gutterBottom>
                              {imageGroup.title || `Image Group ${imageGroup.id}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Created: {imageGroup.created_at}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Images: {imageFiles.length}
                            </Typography>
                            
                            {/* Display image previews */}
                            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {imageFiles.map((imageFile, imgIndex) => (
                                <Box key={imgIndex} sx={{ position: 'relative' }}>
                                  <img
                                    src={imageFile.startsWith('http') ? imageFile : `${API_BASE_URL}/uploads/${imageFile}`}
                                    alt={`Image ${imgIndex + 1}`}
                                    style={{ 
                                      width: '80px', 
                                      height: '80px', 
                                      objectFit: 'cover',
                                      borderRadius: '4px',
                                      border: '1px solid #ddd'
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                </Box>
                              ))}
                            </Box>

                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={imageGroup.status === "1"}
                                    onChange={() => handleToggleStatus(imageGroup.id, imageGroup.status)}
                                    color="primary"
                                  />
                                }
                                label={imageGroup.status === "1" ? "Active" : "Inactive"}
                              />
                              <Box>
                                <IconButton
                                  color="primary"
                                  onClick={() => handleEdit(imageGroup)}
                                  size="small"
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  color="error"
                                  onChange={() => handleToggleStatus(imageGroup.id, imageGroup.status)}
                                  size="small"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </Box>
                          </Box>
                        </Card>
                      </div>
                    );
                  })}
                </div>

                {images.length > 0 && (
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                      count={Math.ceil(images.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Box>
                )}

                <Modal open={open} onClose={() => {
                  setOpen(false);
                  setRemovedImageIndexes([]);
                }}>
                  <Box sx={modalStyle}>
                    <Typography variant="h6" gutterBottom>
                      {editingId ? "Edit Image" : "Add New Image"}
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                      <TextField
                        fullWidth
                        label="Image Title"
                        required
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      
                                             {!editingId && (
                         <Box sx={{ mb: 2 }}>
                           <input
                             accept="image/*"
                             multiple
                             style={{ display: 'none' }}
                             id="image-upload"
                             type="file"
                             onChange={handleImageChange}
                           />
                           <label htmlFor="image-upload">
                             <Button
                               variant="outlined"
                               component="span"
                               startIcon={<CloudUploadIcon />}
                               fullWidth
                               sx={{ height: '56px' }}
                             >
                               {selectedImages.length > 0 
                                 ? `${selectedImages.length} image(s) selected` 
                                 : "Choose Images (Multiple)"}
                             </Button>
                           </label>
                         </Box>
                       )}

                       {imagePreviews.length > 0 && (
                         <Box sx={{ mb: 2 }}>
                           <Typography variant="subtitle2" gutterBottom>
                             {editingId ? "Current Images" : "Selected Images"} ({imagePreviews.length}):
                           </Typography>
                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                             {imagePreviews.map((preview, index) => {
                               const isRemoved = removedImageIndexes.includes(index);
                               return (
                                 <Box key={index} sx={{ position: 'relative' }}>
                                   <img
                                     src={preview.url}
                                     alt={preview.name}
                                     style={{ 
                                       width: '80px', 
                                       height: '80px', 
                                       objectFit: 'cover',
                                       borderRadius: '4px',
                                       border: '1px solid #ddd',
                                       opacity: isRemoved ? 0.5 : 1,
                                       filter: isRemoved ? 'grayscale(100%)' : 'none'
                                     }}
                                   />
                                   {editingId && !isRemoved && (
                                     <IconButton
                                       size="small"
                                       sx={{
                                         position: 'absolute',
                                         top: -8,
                                         right: -8,
                                         backgroundColor: 'red',
                                         color: 'white',
                                         '&:hover': {
                                           backgroundColor: 'darkred',
                                         },
                                         width: 24,
                                         height: 24
                                       }}
                                       onClick={() => handleRemoveImage(index)}
                                     >
                                       <CloseIcon sx={{ fontSize: 16 }} />
                                     </IconButton>
                                   )}
                                   <Typography variant="caption" sx={{ 
                                     display: 'block', 
                                     textAlign: 'center',
                                     maxWidth: '80px',
                                     overflow: 'hidden',
                                     textOverflow: 'ellipsis',
                                     whiteSpace: 'nowrap',
                                     color: isRemoved ? 'text.disabled' : 'text.primary'
                                   }}>
                                     {preview.name}
                                   </Typography>
                                 </Box>
                               );
                             })}
                           </Box>
                         </Box>
                       )}

                      <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                        <Button onClick={() => {
                          setOpen(false);
                          setRemovedImageIndexes([]);
                        }} variant="outlined">
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                          {editingId ? "Update" : "Save"}
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

export default Images;
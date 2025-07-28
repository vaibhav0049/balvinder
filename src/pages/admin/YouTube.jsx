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
  CircularProgress
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  ToggleOn,
  ToggleOff
} from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Header from '../../components/header';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../Api';


const modalStyle = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "white",
  boxShadow: 24,
  padding: 4,
  borderRadius: "8px"
};

const YouTube = () => {
  const [videos, setVideos] = useState([]); // Now only videos
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [iframe, setIframe] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const navigate = useNavigate();

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
  });

  // Fetch videos (previously categories)
  const fetchVideos = () => {
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/youtube/list`, {}, { headers: getAuthHeaders() })
      .then((response) => {
        setVideos(response.data.iframe || []);
      })
      .catch((error) => console.error("Error fetching videos:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!iframe) {
      alert("YouTube iframe is required");
      return;
    }
    const formData = new FormData();
    formData.append("iframe", iframe);
    if (editingId) {
      formData.append("id", editingId);
    }
    const url = `${API_BASE_URL}/youtube/create`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage(
          response.data.message ||
            (editingId ? "Video Updated Successfully!" : "Video Added Successfully!")
        );
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          response.data.message || "Error occurred while saving video."
        );
      }
      fetchVideos();
      setSnackbarOpen(true);
      setOpen(false);
      setEditingId(null);
      setIframe("");
    } catch (error) {
      console.error("Error saving video:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("An unexpected error occurred.");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (video) => {
    setEditingId(video.id);
    setIframe(video.iframe || "");
    setOpen(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedVideos = videos.slice(
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
                  <h4 className="page-title mb-0 font-size-18">Add YouTube Video</h4>
                </div>
              </div>
            </div>
            <Box p={2}>
              {loading ? (
              <div
                 className="d-flex justify-content-center align-items-center"
                 style={{ height: "50vh" }}>
                  <CircularProgress />
                  </div>
              ) : (
                <>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      style={{ backgroundColor: "#28408f" }}
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setEditingId(null);
                        setIframe("");
                        setOpen(true);
                      }}
                    >
                       Add Video
                    </Button>
                  </Box>
                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="table-responsive">
                          <table className="table mb-0 tbl">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Added At</th>
                                <th>Video</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginatedVideos.map((video, index) => (
                                <tr key={video.id}>
                                  <th scope="row">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                  </th>
                                  <td>{video.created_at ? new Date(video.created_at).toLocaleDateString('en-GB') : ''}</td>
                                  <td>
                                    {video.iframe ? (
                                      <div
                                        dangerouslySetInnerHTML={{ __html: video.iframe }}
                                        style={{ maxWidth: 320, maxHeight: 180, overflow: "hidden" }}
                                      />
                                    ) : (
                                      <span>No Video</span>
                                    )}
                                  </td>
                                  <td>
                                    <IconButton
                                      color="primary"
                                      onClick={() => handleEdit(video)}
                                    >
                                      <EditIcon />
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
                      count={Math.ceil(videos.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Box>
                  <Modal open={open} onClose={() => setOpen(false)}>
                    <Box sx={modalStyle}>
                      <Typography variant="h6" gutterBottom>
                        {editingId ? "Edit Video" : "Add New Video"}
                      </Typography>
                      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                        <TextField
                          fullWidth
                          label="YouTube Iframe URL"
                          required
                          value={iframe}
                          onChange={(e) => setIframe(e.target.value)}
                          placeholder="Paste YouTube embed URL here (e.g. https://www.youtube.com/embed/...)"
                        />
                        <Box mt={2} display="flex" style={{float:"right"}}>
                          <Button onClick={() => setOpen(false)} variant="outlined"  style={{marginRight:"10px"}}>
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

export default YouTube;
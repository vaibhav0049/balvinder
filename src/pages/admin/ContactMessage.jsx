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
  Delete as DeleteIcon,
  ToggleOn,
  ToggleOff,
  Email as EmailIcon
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

const ContactMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [messageData, setMessageData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const navigate = useNavigate();

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
  });

  const fetchMessages = () => {
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/contact_message`, {}, { headers: getAuthHeaders() })
      .then((response) => {
        setMessages(response.data.messages || []);
      })
      .catch((error) => console.error("Error fetching messages:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedMessages = messages.slice(
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
                  <h4 className="page-title mb-0 font-size-18">Contact Us Messages</h4>
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
                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="table-responsive">
                          <table className="table mb-0 tbl">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginatedMessages.map((message, index) => (
                                <tr key={message.id}>
                                  <th scope="row">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                  </th>
                                  <td>
                                    {message.name
                                      ? message.name.charAt(0).toUpperCase() +
                                        message.name.slice(1)
                                      : "N/A"}
                                  </td>
                                  <td>{message.email || "N/A"}</td>
                                  <td>{message.subject || "N/A"}</td>
                                  <td>
                                    <div style={{ maxWidth: '200px',whiteSpace: 'nowrap' }}>
                                      {message.message || "N/A"}
                                    </div>
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
                      count={Math.ceil(messages.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Box>

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

export default ContactMessage;
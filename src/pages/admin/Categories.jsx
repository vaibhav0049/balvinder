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

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" or "error"
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const navigate = useNavigate();

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
  });

  const fetchCategories = () => {
    setLoading(true); // Start loader
    axios
      .post(`${API_BASE_URL}/category/list`, {}, { headers: getAuthHeaders() })
      .then((response) => {
       
        setCategories(response.data.category || []);
      })
      .catch((error) => console.error("Error fetching categories:", error))
      .finally(() => setLoading(false)); // Stop loader
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      alert("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", categoryName);

    if (editingId) {
      formData.append("id", editingId);
    }

    const url = `${API_BASE_URL}/category/create`;

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
            (editingId
              ? "Category Updated Successfully!"
              : "Category Added Successfully!")
        );
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          response.data.message || "Error occurred while saving category."
        );
      }

      fetchCategories();
      setSnackbarOpen(true);
      setOpen(false);
      setEditingId(null);
      setCategoryName("");
    } catch (error) {
      console.error("Error saving category:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("An unexpected error occurred.");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setCategoryName(category.category_name);
    setOpen(true);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus == 1 ? "A" : "B";
      const formData = new FormData();
      formData.append("id", id);
      formData.append("status", newStatus);

      const response = await axios.post(
        `${API_BASE_URL}/category/delete`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data"
          }
        }
      );
      

      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage(
          response.data.message || "Category Status Updated Successfully!"
        );
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          response.data.message || "Error updating category status."
        );
      }

      fetchCategories();
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating category status:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("An unexpected error occurred while updating status.");
      setSnackbarOpen(true);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <>
      {/* Admin Header with Logout */}
      
      <div style={{ minHeight: '100vh' }}>
        <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', padding: '32px' }}>
          <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="page-title mb-0 font-size-18">Add Category</h4>
                  
                </div>
              </div>
            </div>
            <Box p={2}>
              {loading ? ( // Show loader when loading
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
                        setCategoryName("");
                        setOpen(true);
                      }}
                    >
                       Add Category
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
                                <th>Category Name</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginatedCategories.map((category, index) => (
                                <tr key={category.id}>
                                  <th scope="row">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                  </th>
                                  <td>
                                  {category.category_name
                                  ? category.category_name.charAt(0).toUpperCase() +
                                    category.category_name.slice(1)
                                  : "N/A"}
                                  </td>
                                  <td>{category.created_at}</td>
                                  <td>
                                    {category.status === "1"
                                      ? "Active"
                                      : "Inactive"}
                                  </td>
                                  <td>
                                  <IconButton
                                      color="primary"
                                      onClick={() => handleEdit(category)}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                    <FormControlLabel
                                      control={
                                        <IconButton
                                          color="error"
                                          onClick={() =>
                                            handleToggleStatus(
                                              category.id,
                                              category.status
                                            )
                                          }
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      }
                                    />
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
                      count={Math.ceil(categories.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Box>

                  <Modal open={open} onClose={() => setOpen(false)}>
                    <Box sx={modalStyle}>
                      <Typography variant="h6" gutterBottom>
                        {editingId ? "Edit Category" : "Add New Category"}
                      </Typography>
                      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                        <TextField
                          fullWidth
                          label="Category Name"
                          required
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
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

export default Category;
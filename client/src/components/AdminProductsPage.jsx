"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "@/api/axios";
import AdminNavbar from "./AdminNavbar";
import { useAuthContext } from "@/utils/useAuthContext";
import { ToastError } from "@/utils/toast-error";

const AdminProductsPage = () => {
  const { user } = useAuthContext();

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    discountType: "Percentage",
    discount: "",
    stock: "",
    imageURL: "",
    category: "",
  });
  const [editableRow, setEditableRow] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/product/add", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success(response.data.message);
      setFormData({
        name: "",
        description: "",
        brand: "",
        price: "",
        discountType: "Percentage",
        discount: "",
        stock: "",
        imageURL: "",
        category: "",
      });
      fetchProducts();
    } catch (error) {
      ToastError(error);
    }
  };

  const handleEdit = (id) => {
    setEditableRow(id);
  };

  const handleUpdate = async (product) => {
    try {
      await axios.put(`/product/update/${product._id}`, product, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Product updated successfully");
      setEditableRow(null);
    } catch (error) {
      if (error.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/product", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      if (error.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  return (
    <div>
      <AdminNavbar />
      <Box
        className="p-6 bg-gray-100 min-h-screen flex flex-col items-center"
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <ToastContainer />
        <Typography variant="h4" gutterBottom>
          Add New Product
        </Typography>
        <Box className="bg-white p-6 rounded shadow-lg w-full">
          <TextField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            type="number"
          />
          <TextField
            label="Discount Type"
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            select
          >
            <MenuItem value="Percentage">Percentage</MenuItem>
            <MenuItem value="Value">Value</MenuItem>
          </TextField>
          <TextField
            label="Discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            type="number"
          />
          <TextField
            label="Image URL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <Box className="p-6">
        <Typography variant="h5" gutterBottom>
          Product List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    {editableRow === product._id ? (
                      <TextField
                        value={product.name}
                        onChange={(e) =>
                          setProducts((prev) =>
                            prev.map((p) =>
                              p._id === product._id
                                ? { ...p, name: e.target.value }
                                : p
                            )
                          )
                        }
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editableRow === product._id ? (
                      <TextField
                        value={product.price}
                        onChange={(e) =>
                          setProducts((prev) =>
                            prev.map((p) =>
                              p._id === product._id
                                ? { ...p, price: e.target.value }
                                : p
                            )
                          )
                        }
                      />
                    ) : (
                      `₹${product.price}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editableRow === product._id ? (
                      <TextField
                        value={product.stock}
                        onChange={(e) =>
                          setProducts((prev) =>
                            prev.map((p) =>
                              p._id === product._id
                                ? { ...p, stock: e.target.value }
                                : p
                            )
                          )
                        }
                      />
                    ) : (
                      product.stock
                    )}
                  </TableCell>
                  <TableCell>
                    {editableRow === product._id ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(product)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(product._id)}
                      >
                        Update
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default AdminProductsPage;

"use client";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuthContext } from "@/utils/useAuthContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "@/api/axios";
import {
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const ProductsPage = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
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

    if (user) fetchProducts();
  }, [user]);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        "/cart/add",
        { user: user.userId, productID: productId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      if (error.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <Link href={"/cart"}>
        <IconButton color="primary">
          <ShoppingCartIcon />
        </IconButton>
      </Link>
      <ToastContainer />
      <Grid2 container spacing={4} className="mt-4">
        {products.map((product) => (
          <Grid2 key={product._id} xs={12} sm={6} md={4} lg={3} display="flex">
            <Card className="shadow-lg rounded-lg flex flex-col h-full w-full">
              <CardMedia
                component="img"
                height="200"
                image={product.imageURL}
                alt={product.name}
                className="object-cover"
              />
              <CardContent className="flex flex-col flex-grow">
                <Typography variant="h6" className="font-semibold">
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ${product.price}
                </Typography>
                <div className="mt-auto">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => addToCart(product._id)}
                    className="mt-2"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default ProductsPage;

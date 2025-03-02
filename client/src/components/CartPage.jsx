import { useAuthContext } from "@/utils/useAuthContext";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { toast, ToastContainer } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StripeCheckout from "react-stripe-checkout";
import { useRouter } from "next/navigation";
import { ToastError } from "@/utils/toast-error";

const CartPage = () => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [shipmentAddress, setShipmentAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const deliveryCharge = 100;
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/user/profile/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setAddresses(response.data.addresses);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    const getCart = async () => {
      try {
        const response = await axios.get(`/cart/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCart(response.data);
      } catch (error) {
        ToastError(error);
      }
    };

    if (user) {
      getCart();
      fetchProfile();
    }
  }, [user]);

  const decrementQuantity = async (e) => {
    try {
      const response = await axios.put(
        `/cart/dec/${e.target.value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === e.target.value
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const incrementQuantity = async (e) => {
    try {
      const response = await axios.put(
        `/cart/inc/${e.target.value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === e.target.value
            ? { ...item, quantity: Math.max(0, item.quantity + 1) }
            : item
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const removeItemFromCart = async (e) => {
    const itemId = e.currentTarget.value;
    try {
      await axios.delete(`/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const calculateSubtotal = () =>
    cart.reduce(
      (total, item) => total + item.productID.price * item.quantity,
      0
    );

  const checkout = async () => {
    setLoading(true);
    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!shipmentAddress) {
      toast.error("Please update your address before placing an order.");
      return;
    }

    try {
      const orders = cart.map((item) => ({
        user: user.userId,
        product: item.productID._id,
        effectivePrice: item.productID.price,
        quantity: item.quantity,
        address: shipmentAddress,
      }));

      const responses = await Promise.all(
        orders.map((order) =>
          axios.post("/order", order, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
        )
      );

      toast.success("Order placed successfully!");
      setCart([]);
      router.push("/shop");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <Typography variant="h6" className="text-center text-gray-500 mt-10">
          Your cart is empty
        </Typography>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Typography variant="h4" className="text-center my-6">
              Your Shopping Cart
            </Typography>
            <TableContainer component={Paper} className="shadow-lg">
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-200">
                    <TableCell className="font-bold">#</TableCell>
                    <TableCell className="font-bold">Product Name</TableCell>
                    <TableCell className="font-bold">Quantity</TableCell>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="font-bold">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item, idx) => (
                    <TableRow key={idx} className="hover:bg-gray-100">
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.productID.name}</TableCell>
                      <TableCell>
                        <Button
                          value={item._id}
                          onClick={
                            item.quantity === 1
                              ? removeItemFromCart
                              : decrementQuantity
                          }
                        >
                          -
                        </Button>
                        {item.quantity}
                        <Button value={item._id} onClick={incrementQuantity}>
                          +
                        </Button>
                      </TableCell>
                      <TableCell>
                        ${(item.productID.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button value={item._id} onClick={removeItemFromCart}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="mt-6">
              <Typography variant="h6">Select Shipping Address</Typography>
              <FormControl fullWidth className="mt-2">
                <InputLabel>Select Address</InputLabel>
                <Select
                  value={shipmentAddress}
                  onChange={(e) => setShipmentAddress(e.target.value)}
                  className="bg-white"
                >
                  {addresses.map((address, idx) => (
                    <MenuItem key={idx} value={address.location}>
                      {address.name} - {address.location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {addresses.length === 0 && (
                <Typography className="mt-2 text-red-500">
                  No addresses found. Please add an address in your profile
                  page.
                </Typography>
              )}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <Box className="space-y-4">
              <Typography variant="h6">Price Breakdown</Typography>
              <Divider />
              <Box className="flex justify-between">
                <Typography>Products Total:</Typography>
                <Typography>₹{calculateSubtotal().toFixed(2)}</Typography>
              </Box>
              <Box className="flex justify-between">
                <Typography>Delivery Charge:</Typography>
                <Typography>₹{deliveryCharge.toFixed(2)}</Typography>
              </Box>
              <Divider />
              <Box className="flex justify-between font-bold text-lg">
                <Typography>Total Amount:</Typography>
                <Typography>
                  ₹{(calculateSubtotal() + deliveryCharge).toFixed(2)}
                </Typography>
              </Box>
              <StripeCheckout
                token={checkout}
                stripeKey="pk_test_51ONYMRSDE8rC4k6ZWV1YOtKZz0UWgQ1XLrpD2vd5QRPIji4Q0z189Vo6gBXSTmS9GtnLkBISNROqaFCCGA4HjBfM00MlxfaaZx"
              />
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

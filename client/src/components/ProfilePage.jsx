import { useAuthContext } from "@/utils/useAuthContext";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { toast, ToastContainer } from "react-toastify";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const params = useParams();
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/user/profile/${params.slug}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (user && params) fetchProfile();
  }, [user]);

  const handleUpdateClick = () => {
    setUpdatedPhone(profile.phone);
    setUpdatedAddress(profile.address);
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `/user/profile/update/${user.userId}`,
        { phone: updatedPhone, address: updatedAddress },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setProfile((prev) => ({
        ...prev,
        phone: updatedPhone,
        address: updatedAddress,
      }));
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />

      <div className="max-w-3xl mx-auto p-6">
        <Typography variant="h4" className="text-center mb-6 font-semibold">
          Your Profile
        </Typography>

        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : profile ? (
          <Card className="shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6" className="text-gray-700">
                Name: <span className="font-semibold">{profile.name}</span>
              </Typography>
              <Typography variant="h6" className="text-gray-700">
                Email: <span className="font-semibold">{profile.email}</span>
              </Typography>
              {editMode ? (
                <>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    value={updatedPhone}
                    onChange={(e) => setUpdatedPhone(e.target.value)}
                    className="my-4"
                  />
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={updatedAddress}
                    onChange={(e) => setUpdatedAddress(e.target.value)}
                    className="my-4"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    className="mr-4"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" className="text-gray-700">
                    Phone:{" "}
                    <span className="font-semibold">{profile.phone}</span>
                  </Typography>
                  <Typography variant="h6" className="text-gray-700">
                    Address:{" "}
                    <span className="font-semibold">{profile.address}</span>
                  </Typography>
                  {user.userId === params.slug && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateClick}
                      className="mt-4"
                    >
                      Update Profile
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h6" className="text-center text-gray-500">
            Profile not found.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

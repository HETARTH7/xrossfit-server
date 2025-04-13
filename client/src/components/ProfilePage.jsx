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
  Avatar,
  IconButton,
} from "@mui/material";
import { Person as PersonIcon, Edit, Delete } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { ToastError } from "@/utils/toast-error";

const ProfilePage = () => {
  const params = useParams();
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddressName, setNewAddressName] = useState("");
  const [newAddressLocation, setNewAddressLocation] = useState("");

  const isOwner = user?.userId === params?.slug;

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/user/profile/${params.slug}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfile(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && params) fetchProfile();
  }, [user]);

  const handleAddAddressClick = () => {
    setShowAddressForm(true);
    setNewAddressName("");
    setNewAddressLocation("");
  };

  const handleCancelAddAddress = () => {
    setShowAddressForm(false);
  };

  const handleDeleteAddress = async (address) => {
    try {
      const response = await axios.put(
        `/user/profile/delete/address/${user.userId}`,
        { address },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const json = await response.data;
      toast.success(json.message);
      await fetchProfile();
    } catch (error) {
      ToastError(error);
    }
  };

  const saveAddress = async () => {
    try {
      const response = await axios.post(
        `/user/profile/add/address/${user.userId}`,
        { name: newAddressName, location: newAddressLocation },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const json = await response.data;
      profile.addresses.push({
        name: newAddressName,
        location: newAddressLocation,
      });
      toast.success(json.message);
      handleCancelAddAddress();
    } catch (error) {
      ToastError(error);
    }
  };

  const renderProfileImage = () => {
    if (profile?.profileImgUrl) {
      return (
        <Avatar
          src={profile.profileImgUrl}
          className="w-28 h-28 md:w-36 md:h-36"
        />
      );
    }
    return (
      <Avatar className="w-28 h-28 md:w-36 md:h-36">
        <PersonIcon className="w-16 h-16" />
      </Avatar>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />

      <div className="max-w-4xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center mt-20">
            <CircularProgress />
          </div>
        ) : profile ? (
          <Card className="shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center space-x-6">
                {renderProfileImage()}
                <div className="flex-1">
                  <Typography variant="h4" className="font-bold">
                    {profile.name}
                  </Typography>
                  <div className="flex space-x-4 mt-2">
                    <Typography variant="body1">
                      <span className="font-semibold">
                        {profile.followers?.length}
                      </span>{" "}
                      Followers
                    </Typography>
                    <Typography variant="body1">
                      <span className="font-semibold">
                        {profile.following?.length}
                      </span>{" "}
                      Following
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {isOwner && (
                  <div>
                    <Typography variant="body1" className="text-gray-700">
                      <span className="font-semibold">Email:</span>{" "}
                      {profile.email}
                    </Typography>
                    <Typography variant="body1" className="text-gray-700">
                      <span className="font-semibold">Phone:</span>{" "}
                      {profile.phone || "Not provided"}
                    </Typography>
                  </div>
                )}
                <Typography variant="h6" className="mt-4 font-semibold">
                  Addresses
                </Typography>
                <div className="space-y-2">
                  {profile.addresses?.length > 0 ? (
                    profile.addresses.map((address, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border p-2 rounded-md bg-gray-50"
                      >
                        <div>
                          <Typography variant="body1" className="font-semibold">
                            {address.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {address.location}
                          </Typography>
                        </div>
                        <div className="space-x-2">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteAddress(address)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Typography variant="body2" className="text-gray-500">
                      No addresses added.
                    </Typography>
                  )}
                </div>

                {/* Add New Address Button */}
                {isOwner && !showAddressForm && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddAddressClick}
                    className="mt-2"
                  >
                    Add New Address
                  </Button>
                )}
                {showAddressForm && (
                  <div className="border p-4 rounded-md bg-white shadow-sm space-y-3">
                    <TextField
                      label="Address Name"
                      variant="outlined"
                      fullWidth
                      value={newAddressName}
                      onChange={(e) => setNewAddressName(e.target.value)}
                    />
                    <TextField
                      label="Address Location"
                      variant="outlined"
                      fullWidth
                      value={newAddressLocation}
                      onChange={(e) => setNewAddressLocation(e.target.value)}
                    />
                    <div className="flex space-x-3">
                      <Button
                        onClick={saveAddress}
                        variant="contained"
                        color="primary"
                      >
                        Save Address
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancelAddAddress}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
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

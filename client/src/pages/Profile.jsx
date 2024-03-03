import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../utils/useAuthContext";
import Navbar from "./Navbar";
import Error from "./Error";
import Success from "./Success";
import axios from "../api/axios";

const Profile = () => {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    address: "",
    phone: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`/user/${user.id}`);
      const json = await response.data;
      setUserInfo(json);
    } catch (error) {
      setError(error.message);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchUser();
  }, [user, fetchUser]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`/user/${user.id}`, editedInfo);
      const json = await response.data;
      setSuccess(json);
      fetchUser();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({
      ...editedInfo,
      [name]: value,
    });
  };

  return (
    <div>
      <Navbar />
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      <div className="container mt-4">
        {user ? (
          <div>
            <h2>Your Profile</h2>
            <div className="mb-3 mt-5">
              <strong>Name:</strong> {user.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {user.email}
            </div>
            {!userInfo.address && !editMode ? (
              <div className="mb-3">
                <button
                  className="btn rounded"
                  style={{ background: "#96f2d7" }}
                  onClick={handleEditClick}
                >
                  Complete Profile
                </button>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <strong>Address:</strong>{" "}
                  {!editMode ? (
                    userInfo.address
                  ) : (
                    <textarea
                      className="form-control"
                      name="address"
                      value={editedInfo.address}
                      onChange={handleInputChange}
                    ></textarea>
                  )}
                </div>
                <div className="mb-3">
                  <strong>Phone:</strong>{" "}
                  {!editMode ? (
                    userInfo.phone
                  ) : (
                    <input
                      className="form-control"
                      type="tel"
                      name="phone"
                      value={editedInfo.phone}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
                <div className="mb-3">
                  <strong>Gender:</strong>{" "}
                  {!editMode ? (
                    userInfo.gender
                  ) : (
                    <select
                      className="form-control"
                      name="gender"
                      value={editedInfo.gender}
                      onChange={handleInputChange}
                    >
                      <option>Choose your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  )}
                </div>
                <div className="mb-3">
                  <strong>Age:</strong>{" "}
                  {!editMode ? (
                    userInfo.age
                  ) : (
                    <input
                      className="form-control"
                      type="number"
                      name="age"
                      value={editedInfo.age}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
                <div className="mb-3">
                  <strong>Height:</strong>{" "}
                  {!editMode ? (
                    userInfo.height
                  ) : (
                    <input
                      className="form-control"
                      type="number"
                      name="height"
                      value={editedInfo.height}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
                <div className="mb-3">
                  <strong>Weight:</strong>{" "}
                  {!editMode ? (
                    userInfo.weight
                  ) : (
                    <input
                      className="form-control"
                      type="number"
                      name="weight"
                      value={editedInfo.weight}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
                {editMode && (
                  <button
                    className="btn rounded"
                    style={{ background: "#96f2d7" }}
                    onClick={() => handleSaveClick()}
                  >
                    Save Changes
                  </button>
                )}
              </>
            )}
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

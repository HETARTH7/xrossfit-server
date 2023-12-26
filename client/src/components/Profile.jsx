import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";

const Profile = () => {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    address: "",
    phone: "",
    age: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`http://localhost:5000/user/${user.email}`);
      const json = await response.json();
      setUserInfo(json[0]);
    };
    if (user) getInfo();
  }, [user]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async (id) => {
    const response = await fetch(`http://localhost:5000/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedInfo),
    });

    if (response.ok) {
      setUserInfo({ ...userInfo, ...editedInfo });
      setEditMode(false);
    } else {
      console.error("Failed to update user information");
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
      <div className="container mt-4">
        {userInfo ? (
          <div>
            <h2>Your Profile</h2>
            <div className="mb-3 mt-5">
              <strong>Name:</strong> {userInfo.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {userInfo.email}
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
                    onClick={() => handleSaveClick(userInfo._id)}
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

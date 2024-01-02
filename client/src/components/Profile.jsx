import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";

const Profile = () => {
  const { user } = useAuthContext();

  console.log(user);
  const { dispatch } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    address: "",
    phone: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const response = await fetch(`http://localhost:5000/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedInfo),
    });

    if (response.ok) {
      const json = { ...user, ...editedInfo };
      user.address = editedInfo.address;
      user.phone = editedInfo.phone;
      user.age = editedInfo.age;
      user.gender = editedInfo.gender;
      user.height = editedInfo.height;
      user.weight = editedInfo.weight;
      dispatch({ type: "LOGIN", payload: json });
      localStorage.setItem("user", JSON.stringify(json));
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
        {user ? (
          <div>
            <h2>Your Profile</h2>
            <div className="mb-3 mt-5">
              <strong>Name:</strong> {user.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {user.email}
            </div>
            {!user.address && !editMode ? (
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
                    user.address
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
                    user.phone
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
                    user.gender
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
                    user.age
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
                    user.height
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
                    user.weight
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

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`http://localhost:5000/user/${user.email}`);
      const json = await response.json();
      setUserInfo(json[0]);
    };
    if (user) getInfo();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        {userInfo ? (
          <div>
            <h2>User Profile</h2>
            <div className="mb-3">
              <strong>Username:</strong> {userInfo.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {userInfo.email}
            </div>
            <div className="mb-3">
              <strong>Address:</strong>{" "}
              {userInfo.address || <textarea></textarea>}
            </div>
            <div className="mb-3">
              <strong>Phone:</strong> {userInfo.phone || <input type="tel" />}
            </div>
            <div className="mb-3">
              <strong>Age:</strong> {userInfo.age || <input type="number" />}
            </div>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

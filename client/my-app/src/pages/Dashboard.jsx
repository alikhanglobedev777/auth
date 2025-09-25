import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user: storeUser, token } = useSelector((state) => state.auth);

  const [user, setUser] = useState(storeUser);
  const [loading, setLoading] = useState(!storeUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Unauthorized");

        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user info:", err.message);
        handleLogout();
      }
    };

    if (!storeUser && token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [storeUser, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard!</h1>

      {loading ? (
        <p>Loading user info...</p>
      ) : user ? (
        <div className="user-info">
          <p><strong>User ID:</strong> {user._id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Unable to load user information.</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

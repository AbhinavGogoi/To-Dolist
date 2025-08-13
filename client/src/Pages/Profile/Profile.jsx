import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import "./Profile.css";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const start = Date.now();

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found");
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.userid;

        const response = await axios.get(
          `http://localhost:3000/profile/api/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        const elapsed = Date.now() - start;
        const delay = Math.max(0, 5000 - elapsed);
        setTimeout(() => setLoading(false), delay);
      }
    };

    fetchUserData();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <div class="loading loading04">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    );

  if (!userData)
    return (
      <div className="profile-page">No user data found. Please log in.</div>
    );

  return (
    <>
      <div className="profile-page">
        <h1>Profile Page</h1>
        <div className="profile-container">
          <div className="content">
            <h2>{userData.name}</h2>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
          </div>
        </div>
        <div className="profile-tasks">
          <div className="tasks">
            <div className="cards" onClick={() => navigate("/work")}>
              Works
            </div>
            <div className="cards">Personal</div>
            <div className="cards">Shopping</div>
            <div className="cards" onClick={() => navigate("/other")}>
              Other
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

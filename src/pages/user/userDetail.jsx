import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "../../service/userService";
import Button from "../../components/button";
import Sidebar from "../../layouts/sidebar";
import Loader from "../../components/loader";
import Toast from "../../components/toast";

export const UserDetail = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserById(id);
        setUserData(data);
        setUpdatedUserData({
          name: data.name || "",
          email: data.email || "",
          password: "",
        });
      } catch (error) {
        Toast("error", "Error fetching user details:");
      }
    };

    getUserData();
  }, [id]);

  const handleBack = () => {
    navigate("/userlist");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(id, updatedUserData);
      setUserData(updatedUser);
      setEditMode(false);
      Toast("success", "User updated successfully!");
    } catch (error) {
      Toast("error", "Failed to update user.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Sidebar />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #9D50BB, #6E48AA)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.1)",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            width: "100%",
            maxWidth: "600px",
            minHeight: "420px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: userData ? "flex-start" : "center",
            color: "#fff",
          }}
        >
          {!userData ? (
            <Loader size="3rem" color="success" />
          ) : (
            <>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwTiGhEbkT1_hRJIuuvfatzFEaSIk6sgzqA&s"
                alt="User"
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "20px",
                  border: "5px solid rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              />

              <h2
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedUserData.name}
                    onChange={handleInputChange}
                    style={{
                      fontSize: "18px",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      outline: "none",
                    }}
                  />
                ) : (
                  userData.name
                )}
              </h2>

              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "15px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                📧 <strong>Email:</strong>{" "}
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={updatedUserData.email}
                    onChange={handleInputChange}
                    style={{
                      fontSize: "16px",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      outline: "none",
                    }}
                  />
                ) : (
                  userData.email
                )}
              </p>

              {editMode ? (
                <p
                  style={{
                    fontSize: "16px",
                    marginBottom: "15px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  🔒 <strong>Password:</strong>{" "}
                  <input
                    type="password"
                    name="password"
                    value={updatedUserData.password}
                    onChange={handleInputChange}
                    style={{
                      fontSize: "16px",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      outline: "none",
                    }}
                  />
                </p>
              ) : (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#ddd",
                    fontFamily: "monospace",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  🆔 <strong>User Id:</strong> {userData.id}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  marginTop: "30px",
                  justifyContent: "center",
                }}
              >
                {editMode ? (
                  <>
                    <Button
                      type="button"
                      title="💾 Save"
                      onClick={handleUpdate}
                      style={{
                        padding: "10px 25px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        border: "none",
                        background:
                          "linear-gradient(to right, #b06ab3, #4568dc)",
                        color: "#fff",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      }}
                    />
                    <Button
                      type="button"
                      title="✖ Cancel"
                      onClick={() => setEditMode(false)}
                      style={{
                        padding: "10px 25px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        border: "none",
                        background:
                          "linear-gradient(to right, #ff758c, #ff7eb3)",
                        color: "#fff",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      }}
                    />
                  </>
                ) : (
                  <Button
                    type="button"
                    title="✏️ Edit User"
                    onClick={() => setEditMode(true)}
                    style={{
                      padding: "10px 25px",
                      fontSize: "15px",
                      borderRadius: "10px",
                      border: "none",
                      background: "linear-gradient(to right, #8E2DE2, #4A00E0)",
                      color: "#fff",
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    }}
                  />
                )}
              </div>

              <div style={{ marginTop: "25px" }}>
                <Button
                  type="button"
                  title="← Back to User List"
                  onClick={handleBack}
                  style={{
                    padding: "10px 25px",
                    fontSize: "15px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(to right, #a18cd1, #fbc2eb)",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

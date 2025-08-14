import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser } from "../../service/userService";
import Button from "../../components/button";
import Table from "../../components/Table";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import Heading from "../../components/heading";
import Toast from "../../components/toast";
import { pageCount } from "../../helper/helperFunctions";
import Modal from "../../components/modal";

export const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();

  const loadUsers = async (page) => {
    setLoadingState(true);
    try {
      const { users, totalRecords } = await fetchUsers(page);
      setUserList(users);
      setTotalUserCount(totalRecords);
    } catch (error) {
      Toast("error", "Failed to load users.");
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    loadUsers(currentPageNum);
  }, [currentPageNum]);

  const handleDetails = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      await deleteUser(selectedUserId);
      Toast("success", "User deleted successfully!");
      const updatedList = userList.filter((user) => user.id !== selectedUserId);
      setUserList(updatedList);
      setTotalUserCount((prev) => prev - 1);
    } catch {
      Toast("error", "Failed to delete user.");
    }

    setShowModal(false);
    setSelectedUserId(null);
  };

  const tableHeaders = ["S.No.", "Name", "Email", "Action"];

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(to right top, #1f005c, #5b0060, #870160, #ac255e, #ca485c)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem 1rem",
        }}
      >
        <div
          className="shadow rounded-4 border"
          style={{
            width: "100%",
            maxWidth: "1100px",
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "20px",
            color: "#222",
            padding: "2rem",
          }}
        >
          <Heading title="User Dashboard" />

          {loadingState ? (
            <div className="d-flex justify-content-center py-5">
              <Loader size="3rem" color="dark" />
            </div>
          ) : (
            <div className="table-responsive mt-4">
              <Table headers={tableHeaders}>
                {userList.map((user, index) => (
                  <tr
                    onClick={() => handleDetails(user.id)}
                    style={{ cursor: "pointer" }}
                    key={user.id}
                    className="align-middle"
                  >
                    <td>{(currentPageNum - 1) * 10 + index + 1}</td>
                    <td className="fw-semibold text-dark">{user.name}</td>
                    <td className="text-dark">{user.email}</td>
                    <td>
                      <Button
                        className="btn btn-sm me-2"
                        title="Details"
                        onClick={() => handleDetails(user.id)}
                        style={{
                          background:
                            "linear-gradient(to right, #00f2fe, #4facfe)",
                          border: "none",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          boxShadow: "0 4px 12px rgba(0, 242, 254, 0.4)",
                        }}
                      />
                      <Button
                        className="btn btn-sm"
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation(), handleDeleteClick(user.id);
                        }}
                        style={{
                          background:
                            "linear-gradient(to right, #f12711, #f5af19)",
                          border: "none",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          boxShadow: "0 4px 12px rgba(241, 39, 17, 0.4)",
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            currentPage={currentPageNum}
            totalPages={pageCount(totalUserCount, 10)}
            onPageChange={setCurrentPageNum}
          />
        </div>
      </div>

      {/* Confirm Modal */}
      <Modal
        show={showModal}
        title="Confirm Deletion"
        message={
          selectedUserId
            ? `Are you sure you want to delete "${
                userList.find((u) => u.id === selectedUserId)?.name
              }"?`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

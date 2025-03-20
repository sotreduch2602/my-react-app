import { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
    account_type: "member",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await axios.put(`/user/${selectedUser.id}`, formData);
      } else {
        await axios.post("/user", formData);
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id) => {
    const userToDelete = users.find((user) => user.id === id);
    if (userToDelete.account_type === "admin") {
      alert("Cannot delete admin accounts!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/user/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      address: "",
      phone_number: "",
      account_type: "member",
    });
  };

  const handleEdit = (user) => {
    if (user.account_type === "admin") {
      alert("Cannot edit admin accounts!");
      return;
    }

    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      address: user.address,
      phone_number: user.phone_number,
      account_type: user.account_type,
    });
    setShowModal(true);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between mb-3">
        <h3>Users Management</h3>
        <div>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New User
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Account Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.phone_number}</td>
              <td>{user.account_type}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEdit(user)}
                  disabled={user.account_type === "admin"}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                  disabled={user.account_type === "admin"}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? "Edit User" : "Add New User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </Form.Group>
            {!selectedUser && (
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Select
                className="ml-2"
                value={formData.account_type}
                onChange={(e) =>
                  setFormData({ ...formData, account_type: e.target.value })
                }
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {selectedUser ? "Update" : "Create"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserManagement;

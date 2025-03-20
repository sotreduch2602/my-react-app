import axios from "axios";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const { user } = useAuth();
  const [UserProfile, setUserProfile] = useState({});
  const [inputValue, setInputValue] = useState({});
  const [modalUpdateProfile, setModalUpdateProfile] = useState(false);

  const openModal = () => {
    setModalUpdateProfile(true);
    setInputValue(UserProfile);
  };

  const closeModal = () => {
    setModalUpdateProfile(false);
    setInputValue({});
  };

  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(inputValue);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`user/${UserProfile.id}`, inputValue);
      setUserProfile((prev) => ({
        ...prev,
        ...inputValue,
      }));
      console.log(UserProfile);

      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (user) {
    useEffect(() => {
      axios.get("user").then((res) => {
        console.log(res.data.find((u) => u.username === user.username));
        setUserProfile(res.data.find((u) => u.username === user.username));
      });
    }, [user]);
  }

  return (
    <>
      <Modal show={modalUpdateProfile} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                value={inputValue.username || ""}
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={inputValue.email || ""}
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone_number"
                value={inputValue.phone_number || ""}
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="address"
                value={inputValue.address || ""}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">User Profile</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4} className="text-center mb-4">
                    <div className="rounded-circle bg-light p-3 d-inline-block mb-3">
                      <FontAwesomeIcon
                        icon={faUser}
                        size="4x"
                        className="text-primary"
                      />
                    </div>
                    <h4>{UserProfile.username}</h4>
                    <p className="text-muted">{UserProfile.role}</p>
                    <Button onClick={openModal}>Update Profile</Button>
                  </Col>
                  <Col md={8}>
                    <div className="mb-3">
                      <h5 className="text-primary">
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                        Email
                      </h5>
                      <p>{UserProfile.email || "Not provided"}</p>
                    </div>
                    <div className="mb-3">
                      <h5 className="text-primary">
                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                        Phone
                      </h5>
                      <p>{UserProfile.phone_number || "Not provided"}</p>
                    </div>
                    <div className="mb-3">
                      <h5 className="text-primary">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="me-2"
                        />
                        Address
                      </h5>
                      <p>{UserProfile.address || "Not provided"}</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;

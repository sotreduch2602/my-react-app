import axios from "axios";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
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

  if (user) {
    useEffect(() => {
      axios.get("user").then((res) => {
        console.log(res.data.find((u) => u.username === user.username));
        setUserProfile(res.data.find((u) => u.username === user.username));
      });
    }, [user]);
  }

  console.log(UserProfile);
  

  return (
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
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
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
  );
};

export default UserProfile;

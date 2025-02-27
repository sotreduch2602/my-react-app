import axios from "axios";
import { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentAdd = () => {
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const updateValue =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    setStudent({ ...student, [e.target.name]: updateValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/students", student).then((response) => {
      console.log(response);
      navigate("/students");
    });
  };
  return (
    <>
      <h1>Student Add</h1>
      <Container className="mt-4">
        <h2 className="text-center mb-4">Add New Student</h2>
        <Form className="mx-auto" style={{ maxWidth: "600px" }}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder="Enter first name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  placeholder="Enter last name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="mathGrade">
                <Form.Label>Math Grade</Form.Label>
                <Form.Control
                  type="number"
                  name="math_grade"
                  placeholder="Enter math grade"
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="physicsGrade">
                <Form.Label>Physics Grade</Form.Label>
                <Form.Control
                  type="number"
                  name="physics_grade"
                  placeholder="Enter physics grade"
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="chemistryGrade">
                <Form.Label>Chemistry Grade</Form.Label>
                <Form.Control
                  type="number"
                  name="chemistry_grade"
                  placeholder="Enter chemistry grade"
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-center gap-2">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Add Student
            </Button>
            <Button variant="secondary" type="reset">
              Clear
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default StudentAdd;

import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const StudentEdit = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch((error) => navigate(`/error/${error.status}`));
  }, []);

  const handleChange = (e) => {
    const updateValue =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    if (updateValue < 0 || updateValue > 100) {
      alert("Grade must be between 0 and 100");
      return;
    }
    setStudent({ ...student, [e.target.name]: updateValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/students/${id}`, student)
      .then((res) => {
        navigate("/students");
      })
      .catch((error) => navigate(`/error/${error.status}`));
  };
  return (
    <>
      <h1>Student Edit</h1>
      <Container className="mt-4">
        <h2 className="text-center mb-4">Edit Student</h2>
        <Form className="mx-auto" style={{ maxWidth: "600px" }}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder="Enter first name"
                  value={student.first_name || ""}
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
                  value={student.last_name || ""}
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
                  value={student.math_grade || ""}
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
                  value={student.physics_grade || ""}
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
                  value={student.chemistry_grade || ""}
                  min="0"
                  max="100"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-center gap-2">
            <Button variant="primary mr-2" type="submit" onClick={handleSubmit}>
              Edit Student
            </Button>
            <Button variant="secondary" as={Link} to={"/students"}>
              Back to List
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default StudentEdit;

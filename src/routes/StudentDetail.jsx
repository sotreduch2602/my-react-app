import { useEffect, useState } from "react";
import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const StudentDetail = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/students/${id}`).then((response) => {
      setStudent(response.data);
    });
  }, [id]);

  if (!student) return <div>Loading...</div>;

  const calculateGPA = () => {
    const grades = [
      student.math_grade,
      student.physics_grade,
      student.chemistry_grade,
    ].filter((grade) => grade !== undefined);

    if (grades.length === 0) return "N/A";

    const average =
      grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    return average.toFixed(2);
  };

  return (
    <Container className="mt-4">
      <Card className="mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Header as="h2" className="text-center">
          Student Details
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Student ID:</strong> {student.id}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Full Name:</strong> {student.first_name}{" "}
              {student.last_name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Math Grade:</strong> {student.math_grade || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Physics Grade:</strong> {student.physics_grade || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Chemistry Grade:</strong>{" "}
              {student.chemistry_grade || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>GPA:</strong> {calculateGPA()}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button as={Link} to="/students" variant="secondary" className="me-2">
            Back to List
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default StudentDetail;

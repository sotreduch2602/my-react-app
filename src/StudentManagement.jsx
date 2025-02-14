import { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Table } from "react-bootstrap";

const StudentManagement = () => {
  const [students, setstudents] = useState([]);
  const [student, setstudent] = useState({});
  const [index, setindex] = useState(-1);

  useEffect(() => {
    fetch("student.json")
      .then((res) => res.json())
      .then((data) => setstudents(data));
  });

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label className="font-weight-bold">Name</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="font-weight-bold">Age:</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="font-weight-bold">GPA:</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
        <ButtonGroup className="mt-2">
          <Button variant="success">Add</Button>
          <Button variant="info">Update</Button>
        </ButtonGroup>
      </Form>

      <Table className="mt-2" striped bordered>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.gpa}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default StudentManagement;

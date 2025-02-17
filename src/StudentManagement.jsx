import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const StudentManagement = () => {
  const [students, setstudents] = useState([]);
  const [student, setstudent] = useState({});
  const [index, setindex] = useState(-1);

  useEffect(() => {
    fetch("students.json")
      .then((res) => res.json())
      .then((data) => setstudents(data));
  }, []);

  const clearInput = () => {
    setstudent({ name: "", age: "", gpa: "" });
  };

  const HandleChange = (e) => {
    setstudent({ ...student, [e.target.name]: e.target.value });
  };
  const HandleAdd = (e) => {
    e.preventDefault();
    setstudents([...students, student]);
    clearInput();
  };

  const HandleUpdate = (e) => {
    e.preventDefault();
    const newStudents = students.map((item, i) => {
      if (i === index) {
        return student;
      } else {
        return item;
      }
    });

    setstudents(newStudents);
    setindex(-1);
    clearInput();
  };

  const HandleDelete = () => {
    const newStudents = students.filter((item, i) => i !== index);
    setstudents(newStudents);
    handleClose();
  };

  const HandleEdit = (index) => {
    setindex(index);
    setstudent(students[index]);
  };

  //Modal
  const [InfoShow, setInfoShow] = useState(false);
  const [DeleteShow, setDeleteShow] = useState(false);

  const handleClose = () => {
    setInfoShow(false);
    setDeleteShow(false);
    setindex(-1);
  };
  const handleInfoShow = (sel_index) => {
    setstudent(students[sel_index]);
    setInfoShow(true);
  };

  const handleDeleteShow = (sel_index) => {
    setindex(sel_index);
    setDeleteShow(true);
  };

  return (
    <>
      {/* INFO Modal */}
      <Modal show={InfoShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Name: {student.name} <br />
          Age: {student.age} <br />
          GPA: {student.gpa} <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={DeleteShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => HandleDelete()}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Main */}
      <Row>
        <Col md={3}>
          <Form>
            <Form.Group>
              <Form.Label className="font-weight-bold">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={student.name || ""}
                onChange={HandleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">Age:</Form.Label>
              <Form.Control
                name="age"
                type="text"
                value={student.age || ""}
                onChange={HandleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">GPA:</Form.Label>
              <Form.Control
                name="gpa"
                type="text"
                value={student.gpa || ""}
                onChange={HandleChange}
              ></Form.Control>
            </Form.Group>
            <ButtonGroup className="mt-2">
              <Button variant="success" className="me-2" onClick={HandleAdd}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
              <Button variant="info" className="me-2" onClick={HandleUpdate}>
                <FontAwesomeIcon icon={faCheck} className="" /> Update
              </Button>
            </ButtonGroup>
          </Form>
        </Col>

        <Col md={9}>
          <Table className="mt-2" striped bordered>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>GPA</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gpa}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        variant="info"
                        onClick={() => handleInfoShow(index)}
                      >
                        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => HandleEdit(index)}
                      >
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteShow(index)}
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default StudentManagement;

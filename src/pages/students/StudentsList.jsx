import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faPen, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table, Modal } from "react-bootstrap";

const StudentsList = () => {
  const [Students, setStudents] = useState([]);
  const [Student, setStudent] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleShow = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  useEffect(() => {
    fetch("students.json")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  const DeleteStudent = (id) => {
    const newStudents = Students.filter((std) => std.id !== id);
    setStudents(newStudents);
  };

  return (
    <>
      <h1 className="text-center">Students List</h1>
      <Table
        striped
        bordered
        style={{ width: "80%", margin: "auto", boxShadow: "0 0 5px 1px #ddd" }}
      >
        <thead className="table-dark">
          <tr>
            {["ID", "Name", "Age", "GPA", "Action"].map((title, index) => (
              <th className="text-center" key={index}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Students.map((std, index) => (
            <tr className="text-center" key={index}>
              <td className="align-middle">{std.id}</td>
              <td className="align-middle">{std.name}</td>
              <td className="align-middle">{std.age}</td>
              <td className="align-middle">{std.gpa}</td>
              <td className="align-middle" style={{ width: "200px" }}>
                <Button
                  className="mr-2"
                  variant="info"
                  onClick={() => handleShow(std)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button className="mr-2" variant="warning" onClick={() => {}}>
                  <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    DeleteStudent(std.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Student Details</Modal.Title>
          <Button variant="close" onClick={handleClose}>
            <FontAwesomeIcon icon={faX} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <p>
                <strong>ID:</strong> {selectedStudent.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>Age:</strong> {selectedStudent.age}
              </p>
              <p>
                <strong>GPA:</strong> {selectedStudent.gpa}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentsList;

import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const handleDeleteShowUp = (std) => {
    setStudent(std);
    setDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setStudent({});
    setDeleteModal(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/students/${student.id}`)
      .then((res) => {
        setStudents(students.filter((std) => std.id != student.id));
        alert("delete succcess");
        handleDeleteClose();
      })
      .catch((error) => navigate(`/error/${error.status}`));
  };

  const calculateGPA = (student) => {
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
    <>
      <h1 className="text-center">Students List</h1>

      <Button as={Link} to="/students/add" className="btn btn-primary m-2">
        Add Student
      </Button>

      <Table striped>
        <thead className="table table-dark">
          <tr>
            {[
              "Student ID",
              "First Name",
              "Last Name",
              "Math Grade",
              "Physic Grade",
              "Chemistry Grade",
              "GPA",
              "Action",
            ].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((std, index) => (
            <tr key={index}>
              <td>{std.id}</td>
              <td>{std.first_name}</td>
              <td>{std.last_name}</td>
              <td>{std.math_grade}</td>
              <td>{std.physics_grade}</td>
              <td>{std.chemistry_grade}</td>
              <td>{calculateGPA(std)}</td>
              <td>
                <Link className="btn btn-info mr-2" to={`details/${std.id}`}>
                  <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                </Link>
                <Link className="btn btn-warning mr-2" to={`edit/${std.id}`}>
                  <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                </Link>
                <Link
                  className="btn btn-danger"
                  onClick={() => handleDeleteShowUp(std)}
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={deleteModal} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this student ( ID: {student.id} ) ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentsList;

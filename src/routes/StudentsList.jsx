import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

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

      <Button
        as={Link}
        to="/students/add"
        className="btn btn-primary m-2"
      >
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default StudentsList;

import { useState } from "react";

const StudentManagement = () => {
  const [students, setStudents] = useState([
    { name: "John", age: 20, gpa: 3.0 },
    { name: "Jane", age: 21, gpa: 3.2 },
    { name: "Doe", age: 22, gpa: 3.5 },
  ]);
  const [student, setStudent] = useState({});
  const [index, setIndex] = useState(null);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setStudents([...students, student]);
    setStudent({});
  };

  const handDelete = (index) => {
    const newStudents = students.filter((student, i) => i !== index);
    setStudents(newStudents);
  };

  const handleEdit = (selected_student, index) => {
    setStudent(selected_student);
  };
  return (
    <div>
      <h1 className="text-center">Student Management</h1>
      <div className="row">
        <div className="col-md-3">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={handleChange}
                value={student.name || ""}
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                className="form-control"
                type="text"
                name="age"
                onChange={handleChange}
                value={student.age || ""}
              />
            </div>
            <div className="form-group">
              <label>GPA</label>
              <input
                className="form-control"
                type="text"
                name="gpa"
                onChange={handleChange}
                value={student.gpa || ""}
              />
            </div>
            <button className="btn btn-primary mr-2" onClick={handleAdd}>
              Add
            </button>
            <button className="btn btn-secondary">Update</button>
          </form>
        </div>
        <div className="col-md-9">
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>GPA</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.gpa}</td>
                  <td>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => handDelete(index)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => handleEdit(student, index)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;

import { useState } from "react";

const StudentManagement = () => {
  const [tmpIndex, setIndex] = useState(-1);
  //setStudents is used to update the students array
  const [students, setStudents] = useState([]);
  //setStudent is used to update the student object (name, age, gpa)
  const [student, setStudent] = useState({});

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setStudents([...students, student]);
    setStudent({ name: "", age: "", gpa: "" });
  };

  const handleEdit = (selected_student, index) => {
    setIndex(index);
    setStudent(selected_student);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const newStudents = students.map((item, i) => {
      if (i === tmpIndex) {
        return student;
      }
      return item;
    });
    setStudents(newStudents);
  };

  const handleDelete = (index) => {
    alert("Are you sure you want to delete " + students[index].name + "?");
    const newStudents = students.filter((item, i) => i !== index);
    setStudents(newStudents);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={student.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="text"
                className="form-control"
                name="age"
                value={student.age}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>GPA:</label>
              <input
                type="text"
                className="form-control"
                name="gpa"
                value={student.gpa}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-success mr-2" onClick={handleAdd}>
              Add
            </button>
            <button className="btn btn-info" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </div>

        <div className="col-md-9">
          <table className="table table-light table-striped">
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
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => handleEdit(item, index)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentManagement;

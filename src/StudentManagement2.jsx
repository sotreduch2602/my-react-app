import React from "react";

class StudentManagement2 extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: -1,
      students: [],
      student: {},
    };
  }

  componentDidMount() {
    fetch("students.json")
      .then((response) => response.json())
      .then((data) => this.setState({ students: data }));
  }

  render() {
    return (
      <>
        <table className="table table-light">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>GPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.gpa}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleEdit(student, index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default StudentManagement2;

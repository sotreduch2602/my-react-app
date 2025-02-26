import { faP, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const AddStudent = () => {
  const [Student, setStudent] = useState({});

  const handleChange = (e) => {
    setStudent({ ...Student, [e.target.name]: e.target.value });
    console.log(Student);
  };

  const AddStudent = () => { 
  };
  
  return (
    <>
      <h1 className="text-center">Add a student</h1>
      <Container
        style={{
          width: "50%",
          boxShadow: "0 0 5px 1px #ddd",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age:</Form.Label>
            <Form.Control type="text" name="age" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>GPA:</Form.Label>
            <Form.Control type="text" name="gpa" onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" onClick={AddStudent}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"></FontAwesomeIcon>
            Add
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddStudent;

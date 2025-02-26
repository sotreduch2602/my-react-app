import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const EditStudent = () => {
  const LoadDataPath = () => {
    let { id } = useParams();
    console.log(id);
    };
    
    useEffect(() => {
        LoadDataPath();
    }, []);

  return (
    <>
      <h1>EditStudent</h1>
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
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>GPA:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Button variant="primary" onClick={() => {}}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"></FontAwesomeIcon>
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EditStudent;

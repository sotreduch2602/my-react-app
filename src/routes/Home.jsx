import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <Link className="btn btn-success" to={'/students'}>Students List</Link>
    </>
  );
};

export default Home;

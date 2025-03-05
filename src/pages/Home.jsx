import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Button as={Link} to={'./products'}>Products List</Button>
    </>
  );
};

export default Home;

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center">
      <h1>Home</h1>
      <Button as={Link} to={"/products"}>
        Products List
      </Button>
    </div>
  );
};

export default Home;

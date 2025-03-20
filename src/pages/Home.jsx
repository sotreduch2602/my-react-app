import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1>Home</h1>
      <Button className="mr-2" as={Link} to={"/products"}>
        Products List
      </Button>
      {user.role === "admin" && <Button as={Link} to={"/admin"}>Admin DashBoard</Button>}
    </div>
  );
};

export default Home;

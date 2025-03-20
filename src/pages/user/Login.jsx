import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [user, setUser] = useState({});
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get("user").then((res) => setUserList(res.data));
  }, []);

  const handleLogin = () => {
    try {
      const foundUser = userList.find(
        (dbUser) =>
          dbUser.username === user.username && dbUser.password === user.password
      );

      if (foundUser) {
        login({
          username: foundUser.username,
          role: foundUser.account_type,
        });

        // if (foundUser.account_type == "admin") {
        //   navigate("/admin");
        // } else {
        //   navigate("/");
        // }

        navigate("/");
      } else {
        console.log("login fail");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    // if (user.username == "member" && user.password == "123456") {
    //   login({
    //     username: "member",
    //     role: "member",
    //   });
    //   console.log("login member success");
    // } else if (user.username == "admin" && user.password == "123456") {
    //   login({
    //     username: "admin",
    //     role: "admin",
    //   });
    //   console.log("login admin success");
    // } else {
    //   setMessage("Login Failed");
    // }
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter Your Username"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Your Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

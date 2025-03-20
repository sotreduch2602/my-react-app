import { Link, Outlet, useNavigate } from "react-router-dom";
import userAvatar from "../assets/user.png";
import { Badge, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLayout } from "../hooks/LayoutContext";
import { useAuth } from "../hooks/AuthContext";

const NavbarMenu = () => {
  const { cartQuantity, setCartQuantity } = useLayout();
  const [categories, setCategories] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("cart").then((res) => {
      let quantity = 0;
      res.data.forEach((item) => (quantity += item.quantity));
      setCartQuantity(quantity);
    });
  }, []);

  const goToProfile = () => {
    navigate("profile");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand as={Link} to={"/"}>
          <FontAwesomeIcon icon={faHouse} className="pr-2" />
          <span>React Bootstrap</span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/products"}>
              Book List
            </Nav.Link>
            {categories && (
              <NavDropdown title="Categories">
                {categories.map((category) => (
                  <NavDropdown.Item
                    key={category.id}
                    as={Link}
                    to={`products/categories/${category.id}`}
                  >
                    {category.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
            <Nav.Link as={Link} to={"/products/search"}>
              Search Item
            </Nav.Link>
          </Nav>

          {!user ? (
            <Link className="mr-2 py-2" as={Link} to={"/login"}>
              Log in
            </Link>
          ) : (
            <Link className="mr-2 py-2" onClick={logout} to={"/"}>
              Log out
            </Link>
          )}

          {user && (
            <div onClick={goToProfile}>
              <img
                src={userAvatar}
                alt="User avatar"
                className="mr-2 my-2 border border-2 rounded-circle"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            </div>
          )}

          <div className="mr-2 py-2">
            <Button as={Link} to={"/cart"}>
              <FontAwesomeIcon icon={faShoppingCart} />
              <Badge bg="secondary">{cartQuantity}</Badge>
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavbarMenu;

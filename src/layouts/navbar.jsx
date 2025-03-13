import { Link, Outlet } from "react-router-dom";

import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLongArrowAltDown,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLayout } from "../hooks/LayoutContext";

const NavbarMenu = () => {
  const { cartQuantity, setCartQuantity } = useLayout();

  useEffect(() => {
    axios.get("cart").then((res) => {
      let quantity = 0;
      res.data.forEach((item) => (quantity += item.quantity));
      setCartQuantity(quantity);
    });
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-them="dark"
      >
        <Navbar.Brand as={Link} to={"/"}>
          <FontAwesomeIcon icon={faHouse} className="pr-2" />
          <span>React Bootstrap</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/products"}>
              Book List
            </Nav.Link>
          </Nav>
          <Button className="ml-auto" as={Link} to={"/cart"}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <Badge bg="secondary">{cartQuantity}</Badge>
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavbarMenu;

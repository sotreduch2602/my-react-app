import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.png";

const Navigation = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Image
              src={logo}
              alt="Logo"
              style={{ width: "30px", height: "30px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="QLSV_nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Trang chủ
              </Nav.Link>
              <NavDropdown title="Quản lý sinh viên">
                <NavDropdown.Item as={Link} to="/students">
                  Danh sách
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/students/add">
                  Thêm
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Navigation;

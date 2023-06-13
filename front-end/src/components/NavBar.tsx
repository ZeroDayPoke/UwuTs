import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

interface NavBarProps {
  logo: string;
  primaryItems: string[];
  secondaryItems: string[];
  onItemSelect: (item: string, index: number) => void;
  selectedItem?: string;
}

const NavBar: React.FC<NavBarProps> = ({
  logo,
  primaryItems,
  secondaryItems,
  onItemSelect,
  selectedItem,
}) => {
  const navigate = useNavigate();

  const handleClick = async (item: string, index: number) => {
    onItemSelect(item, index);
    if (item === "Logout") {
      const response = await fetch("http://localhost:3100/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User successfully logged out");
        navigate("/");
      } else {
        console.log("Error logging out");
      }
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">
        <img src={logo} width="30" height="30" alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav-dropdown" />
      <Navbar.Collapse id="navbar-nav-dropdown">
        <Nav className="mr-auto">
          {primaryItems.map((item, index) => (
            <Nav.Link
              as={Link}
              key={item}
              to={"/" + item.toLowerCase()}
              onClick={() => handleClick(item, index)}
              active={selectedItem === item}
            >
              {item}
            </Nav.Link>
          ))}
        </Nav>
        <Nav className="ml-auto">
          {secondaryItems.map((item, index) => (
            <Nav.Link
              as={Link}
              key={item}
              to={"/" + item.toLowerCase()}
              onClick={() => handleClick(item, index)}
              active={selectedItem === item}
            >
              {item}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

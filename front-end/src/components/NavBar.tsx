// frontend/src/components/NavBar.tsx

import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

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
              onClick={() => onItemSelect(item, index)}
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
              onClick={() => onItemSelect(item, index)}
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

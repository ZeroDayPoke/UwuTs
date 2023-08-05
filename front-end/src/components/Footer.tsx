import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface FooterProps {
  leftItems: string[];
  rightItems: string[];
  onItemSelect: (item: string, index: number) => void;
}

const Footer: React.FC<FooterProps> = ({ leftItems, rightItems, onItemSelect }) => {
  const handleClick = (item: string, index: number) => {
    onItemSelect(item, index);
  };

  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Row>
          <Col>
            <ul className="list-unstyled">
              {leftItems.map((item, index) => (
                <li key={index}>
                  <a href="#" onClick={() => handleClick(item, index)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          <Col className="text-right">
            <ul className="list-unstyled">
              {rightItems.map((item, index) => (
                <li key={index}>
                  <button onClick={() => handleClick(item, index)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

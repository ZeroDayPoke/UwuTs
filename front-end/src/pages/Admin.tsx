import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

interface Home {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

function Admin() {
  const [homes, setHomes] = useState<Home[]>([]);

  useEffect(() => {
    const fetchHomes = async () => {
      const response = await fetch("http://localhost:3100/homes/read");
      const data = await response.json();
      setHomes(data);
    };

    fetchHomes();
  }, []);

  return (
    <div className="HomesList">
      <h2>All Homes</h2>
      <Row xs={1} md={3} className="g-4">
        {homes.map((home, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Body>
                <Card.Text>{home.street}</Card.Text>
                <Card.Text>
                  {home.city}, {home.state} {home.zipcode}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Admin;

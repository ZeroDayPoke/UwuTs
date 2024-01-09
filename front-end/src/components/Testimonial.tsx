// ./src/components/Testimonial.tsx

import { Card } from 'react-bootstrap';
import { Testimonial } from '@types';

interface TestimonialProps {
  data: Testimonial;
}

const TestimonialComponent: React.FC<TestimonialProps> = ({ data }) => {
  return (
    <Card className="text-center">
      <Card.Body>
        {data.image && <Card.Img variant="top" src={data.image} />}
        <Card.Text>"{data.message}"</Card.Text>
        <Card.Title>{data.author}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default TestimonialComponent;

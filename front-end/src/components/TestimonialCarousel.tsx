// ./src/components/TestimonialCarousel.tsx

import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Testimonial } from '../types';
import TestimonialComponent from './Testimonial';

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
    return (
        <Carousel>
            {testimonials.map((testimonial, index) => (
                <Carousel.Item key={index}>
                    <TestimonialComponent data={testimonial} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default TestimonialCarousel;

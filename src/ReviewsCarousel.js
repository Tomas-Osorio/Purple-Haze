import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ReviewsCarousel.css'; 

const ReviewsCarousel = ({ reviews }) => {
  return (
    <Carousel 
      nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
      prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
    >
      {reviews.map((review, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={review.image || "https://via.placeholder.com/800x400?text=No+Image+Available"}
            alt={`Review slide for ${review.title}`}
            style={{ height: '500px', width: '100%', objectFit: 'contain' }}
          />
          <Carousel.Caption className="custom-caption">
            <h3>{review.title.toUpperCase()}</h3>
            <p>{review.genre || "No genres given."}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ReviewsCarousel;
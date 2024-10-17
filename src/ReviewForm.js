import React, { useState } from 'react';

const ReviewForm = ({ onClose, onAddReview }) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = () => {
        const review = { image, title, genre, rating };
        onAddReview(review);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Create Review</h2>
                <input type="text" placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Genre" onChange={(e) => setGenre(e.target.value)} />
                <input type="number" placeholder="Rating (out of 10)" onChange={(e) => setRating(e.target.value)} />
                <button onClick={handleSubmit}>Submit Review</button>
            </div>
        </div>
    );
};

export default ReviewForm;

import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

const ReviewFormContainer = ({ onAddReview, currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleAddReview = (review) => {
        onAddReview(review);
        handleClose(); 
    };

    return (
        <div>
            <button onClick={handleOpen}>Create Review</button>
            {isOpen && (
                <ReviewForm 
                    onClose={handleClose} 
                    onAddReview={handleAddReview} 
                    currentUser={currentUser} 
                />
            )}
        </div>
    );
};

export default ReviewFormContainer;

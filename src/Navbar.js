import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReviewFormContainer from './ReviewFormContainer';

const Navbar = ({ onAddReview, currentUser, setShowLogin, setShowSignup }) => {
    const location = useLocation();

    return (
        <header>
            <Link to="/">
                <button>Home</button>
            </Link>

            {location.pathname === "/posted-reviews" ? (
                <ReviewFormContainer onAddReview={onAddReview} currentUser={currentUser} />
            ) : (
                <Link to="/posted-reviews">
                    <button>Posted Reviews</button>
                </Link>
            )}
            
            <Link to="/about-us">
                <button>About Us</button>
            </Link>
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button onClick={() => setShowSignup(true)}>Sign Up</button>
        </header>
    );
};

export default Navbar;

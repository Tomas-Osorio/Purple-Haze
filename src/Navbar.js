import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReviewFormContainer from './ReviewFormContainer';

const Navbar = ({ onAddReview, currentUser, setShowLogin, setShowSignup, onLogout }) => {
    const location = useLocation();

    return (
        <header className="navbar">
            <div className="left-buttons">
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
            </div>

            <div className="nav-buttons">
                <Link to="/about-us">
                    <button className="right-button">About Us</button>
                </Link>
                {currentUser ? (
                    <button className="right-button" onClick={onLogout}>Logout</button>
                ) : (
                    <>
                        <button className="right-button" onClick={() => setShowLogin(true)}>Login</button>
                        <button className="right-button" onClick={() => setShowSignup(true)}>Sign Up</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;

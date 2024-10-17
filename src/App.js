import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReviewFormContainer from './ReviewFormContainer';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import PostedReviews from './PostedReviews'; 
import './style.css';

const App = () => {
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, []);

    const handleLogin = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        setShowLogin(false);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const handleAddReview = (review) => {
        if (!currentUser) {
            alert('You must be logged in to create a review.');
            return;
        }
        setReviews([...reviews, review]);
    };

    return (
        <Router>
            <div id="mainWrapper">
                <header>
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                    <Link to="/posted-reviews">
                        <button>Posted Reviews</button>
                    </Link>
                    
                    <ReviewFormContainer onAddReview={handleAddReview} currentUser={currentUser} />
                    <Link to="/about-us">
                        <button>About Us</button>
                    </Link>
                    <button onClick={() => setShowLogin(true)}>Login</button>
                    <button onClick={() => setShowSignup(true)}>Sign Up</button>
                </header>

                <Routes>
                    <Route path="/about-us" element={<section>
                        <h2>About Us</h2>
                        <p>
                            Peliculonas is your go-to platform for sharing and discovering movie reviews. 
                            Whether you're looking for the latest action flick or a heartwarming drama, 
                            our community of movie enthusiasts is here to help you find your next favorite film. 
                            Join us in sharing your opinions and exploring new genres!
                        </p>
                    </section>} />
                    <Route path="/" element={<section>
                        <h2>Welcome to Peliculonas</h2>
                        <p>Your favorite movie reviews, all in one place!</p>
                    </section>} />
                    <Route path="/posted-reviews" element={<PostedReviews reviews={reviews} />} />
                </Routes>

                {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
                {showSignup && <SignupModal onClose={() => setShowSignup(false)} onLogin={handleLogin} />}

                <footer>
                    <p>&copy; 2024 Peliculonas. All rights reserved.</p>
                    <p>
                        <a href="/about-us" style={{ color: '#FFF', margin: '0 10px' }}>About Us</a> |
                        <a href="/contact" style={{ color: '#FFF', margin: '0 10px' }}>Contact</a> |
                        <a href="/terms" style={{ color: '#FFF', margin: '0 10px' }}>Terms of Service</a> |
                        <a href="/privacy" style={{ color: '#FFF', margin: '0 10px' }}>Privacy Policy</a>
                    </p>
                    <p>Follow us on:
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFF', margin: '0 10px' }}>Twitter</a>,
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFF', margin: '0 10px' }}>Facebook</a>,
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFF', margin: '0 10px' }}>Instagram</a>
                    </p>
                </footer>
            </div>
        </Router>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'; // Import Supabase client
import Navbar from './Navbar'; 
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import PostedReviews from './PostedReviews'; 
import ReviewForm from './ReviewForm'; 
import ReviewsCarousel from './ReviewsCarousel';
import './style.css';

const supabaseUrl = 'https://svkdacbyzmnptyglxixv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2a2RhY2J5em1ucHR5Z2x4aXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMzY2MjcsImV4cCI6MjA0NTgxMjYyN30.IrgYEf2uS_NB57a1H1ZbtdZAYLPiSd153JHccz6Yhdc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const App = () => {
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false); 

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (savedUser) {
            setCurrentUser(savedUser);
        }
        fetchReviews(); 
    }, []);

  
    const fetchReviews = async () => {
        const { data, error } = await supabase.from('reviews').select('*');
        if (error) {
            console.error("Error fetching reviews:", error);
        } else {
            setReviews(data);
        }
    };

    const handleLogin = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        setShowLogin(false);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const handleAddReview = (newReview) => {
        if (!currentUser) {
            alert('You must be logged in to create a review.');
            return;
        }
       
        setReviews((prevReviews) => [...prevReviews, newReview]);
        fetchReviews(); 
    };

    return (
        <Router>
            <div id="mainWrapper">
                <Navbar 
                    onAddReview={() => setShowReviewForm(true)} 
                    currentUser={currentUser} 
                    setShowLogin={setShowLogin} 
                    setShowSignup={setShowSignup} 
                    onLogout={handleLogout} 
                />

                <Routes>
                    <Route path="/about-us" element={<section>
                        <h2 className="category-title">About Us</h2>
                        <p>
                            Peliculonas is your go-to platform for sharing and discovering movie reviews. 
                            Whether you're looking for the latest action flick or a heartwarming drama, 
                            our community of movie enthusiasts is here to help you find your next favorite film. 
                            Join us in sharing your opinions and exploring new genres!
                        </p>
                    </section>} />
                    <Route path="/" element={<section>
                        <h2 className="category-title">Welcome to Peliculonas</h2>
                        <p>Your favorite movie reviews, all in one place!</p>
                        <ReviewsCarousel reviews={reviews} />
                    </section>} />
                    <Route path="/posted-reviews" element={<PostedReviews reviews={reviews} />} />
                </Routes>

                {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
                {showSignup && <SignupModal onClose={() => setShowSignup(false)} onLogin={handleLogin} />}
                
                {showReviewForm && (
                    <ReviewForm
                        onClose={() => setShowReviewForm(false)} 
                        onAddReview={handleAddReview}
                        currentUser={currentUser} 
                    />
                )}

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

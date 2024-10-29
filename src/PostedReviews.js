import React, { useState, useEffect, useRef  } from 'react';
import ReviewsCarousel from './ReviewsCarousel';
import { createClient } from '@supabase/supabase-js';
import ReviewForm from './ReviewForm'; 

const supabaseUrl = 'https://svkdacbyzmnptyglxixv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2a2RhY2J5em1ucHR5Z2x4aXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMzY2MjcsImV4cCI6MjA0NTgxMjYyN30.IrgYEf2uS_NB57a1H1ZbtdZAYLPiSd153JHccz6Yhdc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const GenreSelect = ({ selectedGenre, setSelectedGenre }) => {
    const [isOpen, setIsOpen] = useState(false);
    const genres = [
        "All", "Action", "Adventure", "Animation", "Comedy", 
        "Crime", "Documentary", "Drama", "Family", "Fantasy", 
        "History", "Horror", "Music", "Mystery", "Romance", 
        "Science Fiction", "TV Movie", "Thriller", "War", "Western"
    ];

    const selectRef = useRef();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (genre) => {
        setSelectedGenre(genre);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-select" ref={selectRef}>
            <div className="selected" onClick={toggleDropdown}>
                {selectedGenre || "Select Genre"}
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {genres.map((genre) => (
                        <li key={genre} onClick={() => handleSelect(genre)}>
                            {genre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const PostedReviews = ({ onAddReview }) => {
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');

    const fetchReviews = async () => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*');
        
        if (error) {
            console.error("Error fetching reviews:", error);
        } else {
            setReviews(data);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const filteredReviews = reviews.filter(review => {
        const matchesGenre = selectedGenre === 'All' || review.genre === selectedGenre;
        const matchesTitle = review.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesGenre && matchesTitle;
    });

    return (
        <section>
            <h2 className="category-title">Posted Reviews</h2>
            <div className="filterContainer">
                <input 
                    type="text" 
                    className="searchInput" 
                    placeholder="Search for movie titles..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <GenreSelect 
                    selectedGenre={selectedGenre} 
                    setSelectedGenre={setSelectedGenre} 
                />
            </div>
            
            <div className="reviews">
                {filteredReviews.map((review, index) => (
                    <div key={index} className="reviewCard">
                        <img src={review.image} alt={review.title} />
                        <h3>{review.title}</h3>
                        <p>Genre: {review.genre}</p>
                        <p>Rating: {review.rating}/10</p>
                        <p>By: {review.username}</p>
                        <p>Movie ID: {review.movie_id}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PostedReviews;

import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ onClose, onAddReview, currentUser }) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('Action'); // Default genre
    const [rating, setRating] = useState('');

    const genres = ['Action', 'Drama', 'Comedy', 'Horror']; // Define available genres

    const fetchMovieImage = async (title) => {
        const apiKey = 'e845651629ccba8e1cfc92622401198b'; // Replace with your TMDb API key
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`);
            const firstResult = response.data.results[0];
            if (firstResult) {
                const imageUrl = `https://image.tmdb.org/t/p/w500${firstResult.poster_path}`;
                setImage(imageUrl);
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    const handleSubmit = () => {
        const review = { image, title, genre, rating, username: currentUser?.username }; // Include username in review object
        onAddReview(review);
        onClose();
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (newTitle) {
            fetchMovieImage(newTitle);
        } else {
            setImage(''); // Clear image if title is empty
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Create Review</h2>
                <input 
                    type="text" 
                    placeholder="Title" 
                    onChange={handleTitleChange} 
                />
                <input type="text" value={image} readOnly placeholder="Image URL" />
                <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    {genres.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                <input type="number" placeholder="Rating (out of 10)" onChange={(e) => setRating(e.target.value)} />
                <button onClick={handleSubmit}>Submit Review</button>
            </div>
        </div>
    );
};

export default ReviewForm;

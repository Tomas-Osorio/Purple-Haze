import React, { useState } from 'react';

const PostedReviews = ({ reviews }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');

    const filteredReviews = reviews.filter(review => {
        const matchesGenre = selectedGenre === 'All' || review.genre === selectedGenre;
        const matchesTitle = review.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesGenre && matchesTitle;
    });

    return (
        <section>
            <h2 class="category-title">Posted Reviews</h2>
            <div className="filterContainer">
                <input 
                    type="text" 
                    className="searchInput" 
                    placeholder="Search for movie titles..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <select 
                    className="genreSelect" 
                    value={selectedGenre} 
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Animation">Animation</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Crime">Crime</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Drama">Drama</option>
                    <option value="Family">Family</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="History">History</option>
                    <option value="Horror">Horror</option>
                    <option value="Music">Music</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="TV Movie">TV Movie</option>
                    <option value="Thriller">Thriller</option>
                    <option value="War">War</option>
                    <option value="Western">Western</option>
                </select>
            </div>
            <div className="reviews">
                {filteredReviews.map((review, index) => (
                    <div key={index} className="reviewCard">
                        <img src={review.image} alt={review.title} />
                        <h3>{review.title}</h3>
                        <p>Genre: {review.genre}</p>
                        <p>Rating: {review.rating}/10</p>
                        <p>By: {review.username}</p>
                        <p>Movie ID: {review.movieId}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PostedReviews;

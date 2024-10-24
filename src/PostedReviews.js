import React, { useState, useRef, useEffect } from 'react';

// Componente de selección de género personalizado
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

// Componente principal de reseñas publicadas
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
                        <p>Movie ID: {review.movieId}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PostedReviews;

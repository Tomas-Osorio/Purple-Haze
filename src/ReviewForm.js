import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svkdacbyzmnptyglxixv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2a2RhY2J5em1ucHR5Z2x4aXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMzY2MjcsImV4cCI6MjA0NTgxMjYyN30.IrgYEf2uS_NB57a1H1ZbtdZAYLPiSd153JHccz6Yhdc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ReviewForm = ({ onClose, onAddReview, currentUser }) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [movieId, setMovieId] = useState(null);
    const [genres, setGenres] = useState({});
    const modalRef = useRef();

    useEffect(() => {
        const fetchGenres = async () => {
            const apiKey = 'e845651629ccba8e1cfc92622401198b';
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
                const genreList = response.data.genres;
                const genreMapping = genreList.reduce((acc, genre) => {
                    acc[genre.id] = genre.name;
                    return acc;
                }, {});
                setGenres(genreMapping);
            } catch (error) {
                console.error('Error fetching genre list:', error);
            }
        };

        fetchGenres();
    }, []);

    const fetchMovieData = async (title) => {
        const apiKey = 'e845651629ccba8e1cfc92622401198b';
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`);
            const firstResult = response.data.results[0];
            if (firstResult) {
                const imageUrl = `https://image.tmdb.org/t/p/w500${firstResult.poster_path}`;
                setImage(imageUrl);
                setMovieId(firstResult.id);

                if (firstResult.genre_ids && firstResult.genre_ids.length > 0) {
                    const firstGenreId = firstResult.genre_ids[0];
                    const genreName = genres[firstGenreId] || 'Unknown';
                    setGenre(genreName);
                } else {
                    setGenre('Unknown');
                }
            } else {
                console.error('No results found for the given title');
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    const handleSubmit = async () => {
        const review = {
            image: image || 'Test Image URL',
            title: title || 'Test Title',
            genre: genre || 'Test Genre',
            rating: rating || 5,
            username: currentUser?.username || 'Anonymous',
            movie_id: movieId || 0,
        };
    
        const { data, error } = await supabase.from('reviews').insert([review]);
    
        if (error) {
            console.error('Error inserting data:', error);
            return;
        }
    
        if (data) {
            console.log('Insert successful:', data);
            onAddReview(data[0]); 
            onClose();
        }
    };
    

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (newTitle) {
            fetchMovieData(newTitle);
        } else {
            setImage('');
            setMovieId(null);
            setGenre('');
        }
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Create Review</h2>
                <input 
                    type="text" 
                    placeholder="Title" 
                    onChange={handleTitleChange} 
                />
                <input type="text" value={image} readOnly placeholder="Image URL" />
                <input type="text" value={genre} readOnly placeholder="Genre" />
                <input type="number" placeholder="Rating (out of 10)" onChange={(e) => setRating(e.target.value)} />
                <button onClick={handleSubmit}>Submit Review</button>
            </div>
        </div>
    );
};

export default ReviewForm;

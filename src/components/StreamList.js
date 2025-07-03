import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

import { getPopularMovies } from '../api/tmdb';

//const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const StreamList = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [movies, setMovies] = useState([]);
  
  

  //Add a new movie
    const addItem = (e) => {
    e.preventDefault(); // Prevent page reload
    if (input.trim() === '') return;

     setItems([...items, { title: input, completed: false }]);
    setInput('');
  };

  //Remove item
  const removeItem = (indexToRemove) => {
    const updatedItems = items.filter((_, index) => index !== indexToRemove);
    setItems(updatedItems);
  };
 //Edit item
const startEditing = (index) => {
    setIsEditing(index);
    setEditInput(items[index].title);
  };
 //Save item
  const saveEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index].title = editInput;
    setItems(updatedItems);
    setIsEditing(null);
  };

  const toggleComplete = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
  };

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      console.log('Fetched movies from TMDB:', response.data.results);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    
  };

  fetchMovies();
}, []);

  return (
    <main className="streamlist-container">
      <h2>Welcome to StreamList App</h2>
      <p> Here are the best sites for watching and renting movies online!</p>
      
      <div id="myDIV" className="header">
        <input
          type="text"
          id="myInput"
          placeholder="Title..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
       <button type="button" onClick={addItem} className="addBtn">Add</button>
      </div>

      <ul id="myUL">
        {items.map((item, index) => (
           <li key={index} className="movie-item" style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                {isEditing === index && (
                <button onClick={() => saveEdit(index)} title="Save" className="icon-btn save-btn">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
)}
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                  
                />

                <span className="movie-title" style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                 {item.title}
                </span>
                <button onClick={() => startEditing(index)} title="Edit" className="icon-btn edit-btn">
                  <FontAwesomeIcon icon={faEdit} />
                </button>

                <button onClick={() => removeItem(index)} title="Delete" className="icon-btn delete-btn">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="movieList">
      <h2>Popular Movies:</h2>
      <ul className="movie-list" style={{ listStyle: 'none', padding: 0 }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ marginBottom: '20px' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100px', display: 'block' }}
            />
            <p>{movie.title} ({movie.release_date})</p>
          </li>
        ))}
      </ul>
    </div>
    </main>
  );
};

export default StreamList;
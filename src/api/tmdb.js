// Example content for ../api/tmdb.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Ensure your .env file has this

export const getPopularMovies = async () => {
  if (!API_KEY) {
    throw new Error('TMDB API Key is not defined. Please set REACT_APP_TMDB_API_KEY in your .env file.');
  }
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  return response.data; // Return the data directly
};

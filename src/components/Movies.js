import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api/tmdb'; // Assuming this handles the axios call and API key

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null);     // New error state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // 1. Try to load from local storage first
        const cachedMovies = localStorage.getItem('popularMovies');
        if (cachedMovies) {
          setMovies(JSON.parse(cachedMovies));
          setLoading(false); // Data loaded from cache, no longer loading
          return; // Exit early if data is found in cache
        }

        // 2. If not in local storage, fetch from API
        setLoading(true); // Set loading to true before fetching
        setError(null);   // Clear any previous errors

        const response = await getPopularMovies(); // Use the imported function
        setMovies(response.results); // Assuming getPopularMovies returns { results: [...] }
        localStorage.setItem('popularMovies', JSON.stringify(response.results));
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.'); // Set user-friendly error message
      } finally {
        setLoading(false); // Always set loading to false after fetch attempt
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <main>
        <div className="movieList">
          <h2>Loading Movies...</h2>
          <p>Please wait while we fetch the latest popular movies.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="movieList">
          <h2>Error!</h2>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="movieList">
        <h2>Welcome to My Popular Movies:</h2>

        <ul className="movie-list" style={{ listStyle: 'none', padding: 0 }}>
          {movies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: '20px' }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100px', display: 'block' }}
              />
              <p className="title">{movie.title} ({movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Movies;

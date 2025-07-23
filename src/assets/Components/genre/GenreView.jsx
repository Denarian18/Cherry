import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "4361826f832b07fea8110402c5c1e244";

const GenreView = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`)
      .then(res => res.json())
      .then(data => setMovies(data.results || []));
  }, [id]);

  return (
    <div className="container my-4">
      <h2>Movies in this Genre</h2>
      <div className="row">
        {movies.map(movie => (
          <div className="col-6 col-md-3 mb-4" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : "https://via.placeholder.com/185x278?text=No+Image"}
                alt={movie.title}
                className="img-fluid rounded shadow-sm mb-2"
              />
              <div className="fw-bold text-dark">{movie.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreView;
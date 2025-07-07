import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import './home.css';
import Hero from '../hero/hero';

const API_KEY = "4361826f832b07fea8110402c5c1e244";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch trending movies
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setTrending(data.results || []));

    // Fetch genres
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => setGenres(data.genres || []));
  }, []);

   const discoverMovie = trending.length > 0 ? trending[Math.floor(Math.random() * trending.length)] : null;
  return (
     <> 
    
      {/* Hero Carousel Section */}
      <div className="mb-5 hero-carousel-container position-relative">
        <Carousel fade controls={trending.length > 1} indicators={trending.length > 1}>
          {trending.slice(0, 5).map(movie => (
            <Carousel.Item key={movie.id}>
              <div
                className="d-flex align-items-center justify-content-center text-white hero-carousel-slide"
                style={{
                  minHeight: "350px",
                  background: movie.backdrop_path
                    ? `linear-gradient(rgba(30,30,30,0.7),rgba(30,30,30,0.7)),url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) center/cover`
                    : "#222",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative"
                }}
              >
                <div style={{zIndex: 2, textAlign: "center", width: "100%"}}>
                  <h1 className="display-3 fw-bold mb-3" style={{textShadow: "2px 2px 8px #000"}}>
                    {movie.title}
                  </h1>
                  <p className="lead mb-4" style={{maxWidth: 700, margin: "0 auto", textShadow: "1px 1px 6px #000", fontSize:"1rem"}}>
                    {movie.overview}
                  </p>
                </div>
              </div>
            </Carousel.Item>
          ))}
           {/* Overlay Search Button */}
         <div className="carousel-search-btn-centered">
      <Link to="/search" className="btn btn-lg btn-primary px-5 shadow">Search Movies</Link>
    </div>
  </Carousel>
      </div>

      
      {/* Trending Movies */}
      <h3>Trending This Week</h3>
      <div className="d-flex overflow-auto py-2" style={{gap: "1rem"}}>
        {trending.slice(0, 10).map(movie => (
          <div key={movie.id} className="text-center" style={{minWidth: 150}}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : "https://via.placeholder.com/120x180?text=No+Image"}
                alt={movie.title}
                className="rounded mb-2"
                style={{width: 120, height: 180, objectFit: "cover"}}
              />
              <div style={{fontSize: "0.95rem", color: "#222"}}>{movie.title}</div>
            </Link>
          </div>
        ))}
      </div>

        {discoverMovie && (
  <div className="mt-5 p-4 bg-light rounded shadow-sm">
    <h4>✨ Discover a Movie</h4>
    <div className="row align-items-center">
      <div className="col-md-2">
        <img
          src={discoverMovie.poster_path ? `https://image.tmdb.org/t/p/w185${discoverMovie.poster_path}` : "https://via.placeholder.com/120x180?text=No+Image"}
          alt={discoverMovie.title}
          className="img-fluid rounded"
        />
      </div>
      <div className="col-md-10">
        <h5>{discoverMovie.title}</h5>
        <p className="mb-2">{discoverMovie.overview}</p>
        <Link to={`/movie/${discoverMovie.id}`} className="btn btn-sm btn-primary">View Details</Link>
      </div>
    </div>
  </div>
)}
      {/* Genres */}
      <h3 className="mt-5">Browse by Genre</h3>
      <div className="d-flex flex-wrap" style={{gap: "1rem"}}>
        {genres.map(genre => (
          <Link key={genre.id} to={`/genre/${genre.id}`} className="btn btn-outline-secondary mb-2">
            {genre.name}
          </Link>
        ))}
      </div>
    
    </> 
        
    )
}



export default Home
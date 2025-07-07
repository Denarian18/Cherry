import Hero from "../hero/hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "4361826f832b07fea8110402c5c1e244";

const MovieView = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    // Fetch movie details
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4361826f832b07fea8110402c5c1e244&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          setIsLoading(false);
          setMovieDetails({});
        } else {
          setMovieDetails(data);
          setIsLoading(false);
        }
      });
      // Fetch credits (actors)
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data) => setCast(data.cast || []));

      // Fetch similar movies
      fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data) => setSimilarMovies(data.results || []));

  }, [id]);

  function renderMovieDetails() {
    console.log(id, movieDetails, isLoading);
    if (isLoading) {
      return <Hero text={"loading..."} />;
    }
    if (movieDetails && movieDetails.original_title) {
        //to do : write a code to deal with a possible missing image.
         const posterPath = movieDetails.poster_path
        ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
      const backdropUrl = movieDetails.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
        : null;
      const year = movieDetails.release_date ? movieDetails.release_date.slice(0, 4) : "N/A";
      const genres = movieDetails.genres ? movieDetails.genres.map(g => g.name).join(", ") : "N/A";
      return (
        <>
          <Hero text={movieDetails.original_title} backdrop={backdropUrl} />
          <div className="container">
            <div className="row">
              <div className="col-md-3"> <img src={posterPath} alt='...' className="img-fluid shadow rounded"/> </div>
              <div className="col-md-9">
                <h2>{movieDetails.original_title} <span className="text-muted fs-5">({year})</span></h2>
                <p className="fst-italic">{movieDetails.tagline}</p>
                <p><strong>Genres:</strong> {genres}</p>
                <p><strong>Runtime:</strong> {movieDetails.runtime} min</p>
                <p><strong>Rating:</strong> {movieDetails.vote_average} / 10</p>
                <p className="lead">{movieDetails.overview}</p>
              </div>
            </div>
          </div>

              {/* Actors Section */}
            <h4 className="mt-5">Cast</h4>
            <div className="d-flex overflow-auto py-2" style={{ gap: "1rem" }}>
              {cast.slice(0, 10).map(actor => (
                <div key={actor.cast_id || actor.id} className="text-center" style={{ minWidth: 120 }}>
                  <img
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/120x180?text=No+Image"}
                    alt={actor.name}
                    className="rounded mb-2"
                    style={{ width: 80, height: 120, objectFit: "cover" }}
                  />
                  <div style={{ fontSize: "0.9rem" }}>{actor.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#aaa" }}>{actor.character}</div>
                </div>
              ))}
            </div>


                 {/* Similar Movies Section */}
           <h4 className="mt-5">Similar Movies</h4>
<div className="row">
  {similarMovies.slice(0, 6).map(movie => (
    <div className="col-6 col-md-2 mb-3" key={movie.id}>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : "https://via.placeholder.com/120x180?text=No+Image"}
        alt={movie.title}
        className="img-fluid rounded"
      />
      <Link to={`/movie/${movie.id}`} style={{ fontSize: "0.9rem", textDecoration: "none" }}>
        {movie.title}
      </Link>
    </div>
  ))}
</div>
        </>
      );
    }
    return <Hero text="Movie not found" />;
  }

  return renderMovieDetails();
};

export default MovieView;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Hero from "../hero/hero";

const API_KEY = "4361826f832b07fea8110402c5c1e244";

const TvSeriesView = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Fetch TV series details
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setDetails(data);
        setIsLoading(false);
      });

    // Fetch cast
    fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => setCast(data.cast || []));

    // Fetch similar series
    fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => setSimilar(data.results || []));
  }, [id]);

  if (isLoading) return <Hero text="Loading..." />;

  const posterPath = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
  const backdropUrl = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : null;
  const year = details.first_air_date ? details.first_air_date.slice(0, 4) : "N/A";
  const genres = details.genres ? details.genres.map(g => g.name).join(", ") : "N/A";

  return (
    <>
      <Hero text={details.name} backdrop={backdropUrl} />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-3">
            <img src={posterPath} alt={details.name} className="img-fluid shadow rounded" />
          </div>
          <div className="col-md-9">
            <h2>{details.name} <span className="text-muted fs-5">({year})</span></h2>
            <p className="fst-italic">{details.tagline}</p>
            <p><strong>Genres:</strong> {genres}</p>
            <p><strong>Seasons:</strong> {details.number_of_seasons}</p>
            <p><strong>Episodes:</strong> {details.number_of_episodes}</p>
            <p><strong>Rating:</strong> {details.vote_average} / 10</p>
            <p className="lead">{details.overview}</p>
          </div>
        </div>

        {/* Cast Section */}
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
              <Link
                to={`/person/${actor.id}`}
                style={{ fontSize: "0.9rem", textDecoration: "none", color: "#007bff" }}
              >
                {actor.name}
              </Link>
              <div style={{ fontSize: "0.8rem", color: "#aaa" }}>{actor.character}</div>
            </div>
          ))}
        </div>

        {/* Similar Series Section */}
        <h4 className="mt-5">Similar Series</h4>
        <div className="row">
          {similar.slice(0, 6).map(tv => (
            <div className="col-6 col-md-2 mb-3" key={tv.id}>
              <img
                src={tv.poster_path ? `https://image.tmdb.org/t/p/w185${tv.poster_path}` : "https://via.placeholder.com/120x180?text=No+Image"}
                alt={tv.name}
                className="img-fluid rounded"
              />
              <Link to={`/tv/${tv.id}`} style={{ fontSize: "0.9rem", textDecoration: "none" }}>
                {tv.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TvSeriesView;
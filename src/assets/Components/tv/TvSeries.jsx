import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "4361826f832b07fea8110402c5c1e244";

const TvSeries = () => {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const url = query
      ? `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
      : `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setSeries(data.results || []));
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="container my-4">
      <h2>TV Series</h2>
      <form className="mb-4 d-flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search TV series..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>
      <div className="row">
        {series.map(tv => (
          <div className="col-6 col-md-3 mb-4" key={tv.id}>
            <Link to={`/tv/${tv.id}`}>
              <img
                src={tv.poster_path ? `https://image.tmdb.org/t/p/w342${tv.poster_path}` : "https://via.placeholder.com/185x278?text=No+Image"}
                alt={tv.name}
                className="img-fluid rounded shadow-sm mb-2"
              />
              <div className="fw-bold text-dark">{tv.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvSeries;
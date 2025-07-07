import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


const API_KEY = "4361826f832b07fea8110402c5c1e244";

const PeopleView = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    // Fetch person details
    fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => setPerson(data));

    // Fetch movie and TV credits
    fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => setCredits(data.cast || []));
  }, [id]);

  return (
    <div className="container my-4">
      <div className="row mb-4">
        <div className="col-md-3">
          <img
            src={person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={person.name}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-9">
          <h2>{person.name}</h2>
          <p><strong>Known For:</strong> {person.known_for_department}</p>
          <p><strong>Birthday:</strong> {person.birthday || "N/A"}</p>
          <p><strong>Place of Birth:</strong> {person.place_of_birth || "N/A"}</p>
          <p>{person.biography}</p>
        </div>
      </div>
      <h4>Filmography</h4>
      <div className="row">
        {credits.slice(0, 20).map(item => (
          <div className="col-6 col-md-3 mb-4" key={item.credit_id}>
            <Link to={item.media_type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`}>
              <img
                src={item.poster_path ? `https://image.tmdb.org/t/p/w185${item.poster_path}` : "https://via.placeholder.com/120x180?text=No+Image"}
                alt={item.title || item.name}
                className="img-fluid rounded mb-2"
              />
              <div className="fw-bold text-dark">{item.title || item.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleView;
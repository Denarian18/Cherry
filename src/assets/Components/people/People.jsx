import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "4361826f832b07fea8110402c5c1e244";

const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setPeople(data.results || []));
  }, []);

  return (
    <div className="container my-4">
      <h2>Popular People</h2>
      <div className="row">
        {people.map(person => (
          <div className="col-6 col-md-3 mb-4" key={person.id}>
            <Link to={`/person/${person.id}`}>
              <img
                src={person.profile_path ? `https://image.tmdb.org/t/p/w342${person.profile_path}` : "https://via.placeholder.com/185x278?text=No+Image"}
                alt={person.name}
                className="img-fluid rounded shadow-sm mb-2"
              />
              <div className="fw-bold text-dark">{person.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
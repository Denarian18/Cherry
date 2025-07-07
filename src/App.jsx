import { HashRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import Header from './assets/Components/Header/Header';
import Home from './assets/Components/home/home';
import About from './assets/Components/about/about';
import SearchView from './assets/Components/search/searchView';
import MovieView from './assets/Components/movies/movieView';
import Movies from './assets/Components/movies/Movies';
import TvSeries from './assets/Components/tv/TvSeries';
import TvSeriesView from './assets/Components/tv/TvSeriesView';
import People from './assets/Components/people/People';
import PeopleView from './assets/Components/people/PeopleView';
// Import Contact and Location if you have them

function App() {

  const [searchResults, setSearchResults] = useState ([])
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText) {
    console.log(searchText, "is the searchtext")
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4361826f832b07fea8110402c5c1e244&include_adult=false&language=en-US&query=${searchText}&page=1`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setSearchResults(data.results)
        })
      }
  }, [searchText])

  return (
    <HashRouter>
      <Header searchText={searchText} setSearchText={setSearchText}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
         <Route path="/search" element={<SearchView keyword={searchText} searchResults={searchResults}/>} />
         <Route path="/movie/:id" element={<MovieView/>} />
         <Route path="/movies" element={<Movies />} />
         <Route path="/tvseries" element={<TvSeries />} />
         <Route path="/tv/:id" element={<TvSeriesView />} />
         <Route path="/people" element={<People />} />
         <Route path="/person/:id" element={<PeopleView />} />
        {/* Add these only if you have the components */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/location" element={<Location />} /> */}
      </Routes>
    </HashRouter>
  );
}

export default App;

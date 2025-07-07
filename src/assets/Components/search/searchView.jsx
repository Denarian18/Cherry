import Hero from '../hero/hero';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const MovieCard = ({movie}) =>{
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const detailUrl = `/movies/${movie.id}`
    return(
 // Former code

 /*
     <Card style={{ width: '18rem', height:'auto' }}>
  <Card.Img variant="top" src={posterUrl} alt={movie.original_title}/>
  <Card.Body>
    <Card.Title>{movie.original_title}</Card.Title>
    <Card.Text>
        
      {movie.overview}
        
    </Card.Text>
    <Button variant="primary">Show Details</Button>
  </Card.Body>
    </Card>

</div>
 */

//new code to make all  the boxes the same (CO-Pilot Modified)


        <div className="col-lg-3 col-md-3 col-12 my-4">
  <Card className="h-100 d-flex flex-column" style={{ width: '100%' }}>
    <Card.Img
      variant="top"
      src={posterUrl}
      alt={movie.original_title}
      style={{ objectFit: 'cover', height: '300px' }} // uniform image height
    />
    <Card.Body className="flex-grow-1 d-flex flex-column">
      <Card.Title>{movie.original_title}</Card.Title>
      <Card.Text className="flex-grow-1">
        {movie.overview}
      </Card.Text>
      <Button 
      as={Link}
        to={`/movie/${movie.id}`}
      variant="primary" className="mt-auto w-100">Show Details</Button>
    </Card.Body>
  </Card>
</div>
    )
}

const SearchView = ({keyword, searchResults}) => {
    const title =`You are searching for... ${keyword}`

    const resultsHtml = searchResults.map((obj, i) => {
        return <MovieCard movie={obj} key={i} />
    })
    return (
    
        <>
         <Hero text={title} />
         {resultsHtml &&
            <div className='container'>
                <div className='row'>
                    {resultsHtml}
                </div>
            </div>
         }
        </>
        
    )
}



export default SearchView;
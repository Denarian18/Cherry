import React from 'react';
import './about.css';
import Hero from '../hero/hero';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const About = () => {
  return (
    <>
      <Hero text="About Cherry" />

      <div className="about-container py-5">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-8 text-center">
              <h2 className="mb-3">Welcome to Cherry 🍒</h2>
              <p className="lead">
                Cherry is your gateway to discovering trending, popular, and upcoming movies. Search, browse by genre, and dive into detailed movie info, cast, and more—all in one beautiful, easy-to-use app.
              </p>
            </div>
          </div>

          <div className="row text-center mb-5">
            <div className="col-md-4 mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>🎬 Discover Movies</Card.Title>
                  <Card.Text>
                    Explore trending, top-rated, and upcoming movies from around the world.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4 mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>🔍 Smart Search</Card.Title>
                  <Card.Text>
                    Find your favorite movies instantly with our powerful search and genre filters.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4 mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>🌟 Movie Details</Card.Title>
                  <Card.Text>
                    View cast, similar movies, ratings, and more for every title you love.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h4 className="mb-3">Our Mission</h4>
              <p>
                We are a team of passionate developers dedicated to creating innovative, user-friendly movie discovery experiences. Our mission is to deliver high-quality software that makes exploring movies fun and effortless for everyone.
              </p>
              <Button variant="primary" href="mailto:hello@cherryapp.com" className="mt-3">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
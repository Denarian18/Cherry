import React from 'react';
import './header.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


const Header = ({searchText, setSearchText}) => {
  const navigate = useNavigate();

  const updateSearchText = (e) => {
    navigate('/search')
    setSearchText(e.target.value)
  }
    return (
        <div>

         <Navbar expand="lg" className="bg-body-tertiary w-100">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <span role="img" aria-label="cherry" style={{fontSize: "1.5rem", verticalAlign: "middle"}}>🍒</span>
          <b style={{marginLeft: "0.5rem"}}>Cherry</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="about">About</Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/movies/">Movies</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tvseries">
                Tv Series
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/people/">
                People
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="#" disabled>
              Downloads
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={updateSearchText}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>


        </div>
    )
}

export default Header
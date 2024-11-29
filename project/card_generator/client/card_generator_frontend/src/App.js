import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import Login from './views/login/Login';
import MyCards from './views/my_cards/MyCards';
import Signup from './views/sign_up/Signup';
import VirtualCards from './views/virtual_cards/VirtualCards';
import EditCard from './views/my_cards/EditCard';

function App() {
  const [isAuth, setIsAuth] = useState(sessionStorage.getItem("isAuth"));
  const signUserOut = async () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsAuth(false);
    window.location.pathname = '/auth/login';
  }
  return (
    <>
      <Router>
        <Navbar collapseOnSelect bg='dark' data-bs-theme='dark' expand='lg'>
          <Container>
            <Navbar.Brand href='#'>Card Generator</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                {!isAuth ? (
                  <>
                    <Nav.Link href='/auth/login'>Login</Nav.Link>
                    <Nav.Link href='/auth/signup'>Sign Up</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href='/virtual/cards'>Virtual Cards</Nav.Link>
                    <Nav.Link href='/my/cards'>My Cards</Nav.Link>
                    <Button variant='dark' onClick={signUserOut}>Logout</Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/auth/login' element={<Login setIsAuth={setIsAuth} />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/virtual/cards' element={<VirtualCards isAuth={isAuth} />} />
          <Route path='/my/cards' element={<MyCards isAuth={isAuth} />} />
          <Route path='/myCards/edit/:id' element={<EditCard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { Container, Nav,  Navbar } from 'react-bootstrap';

const Header = () => {



    return (

        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )

} 

export default Header;

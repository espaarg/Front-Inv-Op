import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const styles = {
        navbar: {
            backgroundColor: '#1a202c', // Color gris oscuro
            padding: '15px 20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        },
        brand: {
            color: '#ffffff', // Color blanco para el texto del logo
            fontSize: '1.5rem',
            fontWeight: 'bold',
            cursor: 'pointer'
        },
        navLink: {
            color: '#a0aec0', // Color gris claro para los enlaces
            marginLeft: '15px',
            fontSize: '1rem',
            transition: 'color 0.3s ease, transform 0.3s ease',
            cursor: 'pointer'
        },
        navLinkHover: {
            color: '#ffffff', // Color blanco para el hover
            transform: 'scale(1.1)'
        }
    };

    const navigate = useNavigate(); // Asegúrate de tener importado useNavigate desde react-router-dom

    const handleMouseOver = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.currentTarget.style.color = styles.navLinkHover.color;
        e.currentTarget.style.transform = styles.navLinkHover.transform;
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.currentTarget.style.color = styles.navLink.color;
        e.currentTarget.style.transform = 'none';
    };

    return (
        <Navbar expand="lg" style={styles.navbar}>
            <Container style={{ backgroundColor: '#1a202c' }}>
                <Navbar.Brand as={Link} to="/" style={styles.brand}>LOGO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            as={Link}
                            to="/ventas"
                            style={styles.navLink}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Ventas
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/articulos"
                            style={styles.navLink}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Artículos
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/demandasHistoricas"
                            style={styles.navLink}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Demanda Histórica
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/ordenesDeCompra"
                            style={styles.navLink}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Órdenes de Compra
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/proveedores"
                            style={styles.navLink}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Proveedores
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/configParams"
                            style={styles.navLink}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Configurar Parámetros
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

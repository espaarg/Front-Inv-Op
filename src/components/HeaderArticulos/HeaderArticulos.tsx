import { Container, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ArticuloTable from '../Tables/ArticuloTable';


const HeaderArticulos = () => {
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
    <Tabs
      defaultActiveKey="Todos los articulos"
      id="uncontrolled-tab-example"
      className="mb-3"
        >
      <Tab eventKey="Todos los articulos" title="Todos los articulos">
        <ArticuloTable/>
      </Tab>
      <Tab eventKey="Articulos a reponer" title="Articulos a reponer">
        
      </Tab>
    </Tabs>
    );
}

export default HeaderArticulos;

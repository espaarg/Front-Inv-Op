import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="custom-footer">
            <Container className="custom-container">
                <Row>
                    <Col>
                        <p>&copy; 2024 LOGO</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <a href="#home" className="custom-link">Home</a>
                        <a href="#about" className="custom-link">About</a>
                        <a href="#contact" className="custom-link">Contact</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;

import { Navbar, Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MainMenu = () => {
    return (
        <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
            <Navbar bg="light" expand="lg" style={{ marginBottom: '30px' }}>
                <Container>
                    <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '2rem', color: '#333' }}>
                        Menú principal
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <Card style={{ width: '100%', minHeight: '200px', marginBottom: '20px' }}>
                        <Card.Body>
                            <Card.Title>Ventas</Card.Title>
                            <Card.Text>
                                Administra las ventas diarias y reportes de ingresos.
                            </Card.Text>
                            <LinkContainer to="/ventas">
                                <Button variant="primary">Ir a Ventas</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card style={{ width: '100%', minHeight: '200px', marginBottom: '20px' }}>
                        <Card.Body>
                            <Card.Title>Artículos</Card.Title>
                            <Card.Text>
                                Gestiona el inventario y detalles de cada artículo.
                            </Card.Text>
                            <LinkContainer to="/articulos">
                                <Button variant="primary">Ir a Artículos</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card style={{ width: '100%', minHeight: '200px', marginBottom: '20px' }}>
                        <Card.Body>
                            <Card.Title>Demanda Histórica</Card.Title>
                            <Card.Text>
                                Visualiza y analiza la demanda histórica de productos.
                            </Card.Text>
                            <LinkContainer to="/demandasHistoricas">
                                <Button variant="primary">Ir a Demanda Histórica</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card style={{ width: '100%', minHeight: '200px', marginBottom: '20px' }}>
                        <Card.Body>
                            <Card.Title>Órdenes de Compra</Card.Title>
                            <Card.Text>
                                Gestiona las órdenes de compra y proveedores.
                            </Card.Text>
                            <LinkContainer to="/ordenesDeCompra">
                                <Button variant="primary">Ir a Órdenes de Compra</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card style={{ width: '100%', minHeight: '200px', marginBottom: '20px' }}>
                        <Card.Body>
                            <Card.Title>Proveedores</Card.Title>
                            <Card.Text>
                                Administra los proveedores y la información relacionada.
                            </Card.Text>
                            <LinkContainer to="/proveedores">
                                <Button variant="primary">Ir a Proveedores</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card style={{ width: '100%', minHeight: '200px', marginBottom: '20px' }}>
                        <Card.Body>
                            <Card.Title>Configurar Parámetros</Card.Title>
                            <Card.Text>
                                Configura parámetros y ajustes del sistema.
                            </Card.Text>
                            <LinkContainer to="/configParams">
                                <Button variant="primary">Ir a Configurar Parámetros</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;

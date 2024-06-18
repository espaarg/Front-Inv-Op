import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ConfigParams = () => {
  const navigate = useNavigate();

  const goToMultiplicadorCa = () => {
    navigate("/mCA");
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", padding: "20px" }}>
      <Container>
        <Row className="align-items-center mb-4">
          <Col xs={12} md={6}>
            <Button
              variant="dark"
              style={{ width: "170px", height: "50px", padding: "5px" }}
              onClick={() => navigate("/")}
            >
              Volver al menú
            </Button>
          </Col>
          <Col xs={12} md={6}>
            <h1 style={{ marginTop: "30px" }}>Configuración de parámetros</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card
              style={{
                backgroundColor: "#ced4da",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Body>
                <Card.Title className="text-center mb-4">Opciones de configuración</Card.Title>
                <Row className="justify-content-center mb-4">
                  <Col xs={6} md={4}>
                    <Button
                      className="w-100"
                      variant="primary"
                      onClick={goToMultiplicadorCa}
                    >
                      Multiplicador de Ca
                    </Button>
                  </Col>
                  <Col xs={6} md={4}>
                    <Button className="w-100" variant="primary">
                      Otra opción
                    </Button>
                  </Col>
                </Row>
                {/* Más opciones de configuración */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ConfigParams;

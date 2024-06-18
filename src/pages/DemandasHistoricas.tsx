import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DemandaHistoricaTable from "../components/Tables/DemandaHistoricaTable";

const DemandasHistoricas = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Button 
                    variant="dark" 
                    style={{
                        margin: '10px',
                        width: '170px',
                        height: '50px',
                        padding: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease'
                    }}
                    onClick={() => navigate('/')}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#343a40'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#212529'}
                >
                    Volver al menú
                </Button>
                <h1 style={{ paddingLeft: '100px', margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#212529' }}>
                    Demandas Históricas
                </h1>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <DemandaHistoricaTable />
            </div>
        </div>
    );
};

export default DemandasHistoricas;

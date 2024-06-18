import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import DeleteButton from '../DeleteButton/DeleteButton';
import VentaModal from '../Modals/VentaModal';
import { VentaService } from '../../services/VentaService';
import { Venta } from '../../types/Venta';
import DetalleButton from '../DetalleButton/DetalleButton';

function VentaTable() {

    const [ventas, setVentas] = useState<Venta[]>([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchVentas = async () => {
            const ventas = await VentaService.getVentas();
            setVentas(ventas);
        };
        fetchVentas();
    }, [refreshData]);

    const initializableNewVenta = (): Venta => ({
        id: 0,
        montoTotal: 0,
        fechaVenta: '',
    });

    const [venta, setVenta] = useState<Venta>(initializableNewVenta);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [nombre, setNombre] = useState('');

    const handleClick = (newNombre: string, venta: Venta, modal: ModalType) => {
        setNombre(newNombre);
        setModalType(modal);
        setVenta(venta);
        setShowModal(true);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
                <Button
                    onClick={() => handleClick('Nueva venta', initializableNewVenta(), ModalType.CREATE)}
                    style={{
                        width: '150px',
                        backgroundColor: '#007bff',
                        borderColor: '#007bff',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                    Añadir venta
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <Table striped bordered hover style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th>Id</th>
                            <th>Monto Total</th>
                            <th>Fecha de Venta</th>
                            <th>Ver Detalle</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.id} style={{ textAlign: 'center' }}>
                                <td>{venta.id}</td>
                                <td>{venta.montoTotal}</td>
                                <td>{venta.fechaVenta}</td>
                                <td>
                                    <DetalleButton onClick={() => handleClick('Ver detalle de venta', venta, ModalType.DETAIL)} />
                                </td>
                                <td>
                                    <DeleteButton onClick={() => handleClick('Eliminar venta', venta, ModalType.DELETE)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {showModal && (
                <VentaModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    nombre={nombre}
                    modalType={modalType}
                    venta={venta}
                    refreshData={setRefreshData}
                />
            )}
        </>
    );
}

export default VentaTable;

import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import VentaModal from '../Modals/VentaModal';
import { VentaService } from '../../services/VentaService';
import { Venta } from '../../types/Venta';
import DetalleButton from '../DetalleButton/DetalleButton';
import '../../styles/VentaTable.css'; // Importar el archivo CSS

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
        fecha: '',
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
            <div className="venta-table-header">
                <Button
                    onClick={() => handleClick('Nueva venta', initializableNewVenta(), ModalType.CREATE)}
                    className="btn-custom"
                >
                    Añadir venta
                </Button>
            </div>
            <div className="venta-table-container">
                <Table striped bordered hover className="venta-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Monto Total</th>
                            <th>Fecha de Venta</th>
                            <th>Ver Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.id}>
                                <td>{venta.id}</td>
                                <td>{venta.montoTotal}</td>
                                <td>{venta.fecha}</td>
                                <td>
                                    <DetalleButton onClick={() => handleClick('Ver detalle de venta', venta, ModalType.DETAIL)} />
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

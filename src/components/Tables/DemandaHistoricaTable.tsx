import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import DeleteButton from '../DeleteButton/DeleteButton';
import { DemandaHistoricaService } from '../../services/DemandaHistoricaService';
import { DemandaHistorica } from '../../types/DemandaHistorica';
import DemandaHistoricaModal from '../Modals/DemandaHistoricaModal';

function DemandaHistoricaTable() {
    const [ventas, setVentas] = useState<DemandaHistorica[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    const [sortBy, setSortBy] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [ventaID, setVentaID] = useState<number>(0);

    useEffect(() => {
        const fetchVentas = async () => {
            const ventas = await DemandaHistoricaService.getDemandaHistorica();
            sortVentas(ventas);
        };
        fetchVentas();
    }, [refreshData, sortBy, sortOrder]);

    const initializableNewVenta = (): DemandaHistorica => {
        return {
            id: 0,
            nombreArticulo: "",
            fechaInicio: "",
            fechaFin: "",
            cantidadVendida: 0,
            id_articulo: 0,
        };
    };

    const [venta, setVenta] = useState<DemandaHistorica>(initializableNewVenta);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [nombre, setNombre] = useState("");

    const handleClick = (newNombre: string, venta: DemandaHistorica, modal: ModalType, ventaID: number) => {
        setNombre(newNombre);
        setModalType(modal);
        setVenta(venta);
        setShowModal(true);
        setVentaID(ventaID);
    }

    const sortVentas = (ventas: DemandaHistorica[]) => {
        const sortedVentas = [...ventas].sort((a, b) => {
            if (sortOrder === 'asc') {
                switch (sortBy) {
                    case 'id':
                        return a.id - b.id;
                    case 'nombre':
                        return a.nombreArticulo.localeCompare(b.nombreArticulo);
                    case 'fechaInicio':
                        return new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime();
                    case 'fechaFin':
                        return new Date(a.fechaFin).getTime() - new Date(b.fechaFin).getTime();
                    default:
                        return 0;
                }
            } else {
                switch (sortBy) {
                    case 'id':
                        return b.id - a.id;
                    case 'nombre':
                        return b.nombreArticulo.localeCompare(a.nombreArticulo);
                    case 'fechaInicio':
                        return new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime();
                    case 'fechaFin':
                        return new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime();
                    default:
                        return 0;
                }
            }
        });
        setVentas(sortedVentas);
    }

    const handleSort = (column: string) => {
        if (column === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <Button
                        onClick={() => handleClick("Nueva venta", initializableNewVenta(), ModalType.CREATE, ventaID)}
                        style={{
                            width: '200px',
                            height: '70px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                            padding: '10px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s ease, transform 0.3s ease'
                        }}
                    >
                        Generar demanda histórica
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                    <Table striped bordered hover style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>Id</th>
                                <th onClick={() => handleSort('nombre')} style={{ cursor: 'pointer' }}>Articulo</th>
                                <th onClick={() => handleSort('fechaInicio')} style={{ cursor: 'pointer' }}>Fecha Inicio Periodo</th>
                                <th onClick={() => handleSort('fechaFin')} style={{ cursor: 'pointer' }}>Fecha Fin Periodo</th>
                                <th>Cantidad demandada</th>
                                <th>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta) => (
                                <tr key={venta.id}>
                                    <td>{venta.id}</td>
                                    <td>{venta.nombreArticulo}</td>
                                    <td>{venta.fechaInicio}</td>
                                    <td>{venta.fechaFin}</td>
                                    <td>{venta.cantidadVendida}</td>
                                    <td><DeleteButton onClick={() => handleClick("Eliminar venta", venta, ModalType.DELETE, venta.id)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {showModal && (
                <DemandaHistoricaModal
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

export default DemandaHistoricaTable;

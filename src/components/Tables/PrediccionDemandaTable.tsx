import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import { PrediccionDemanda } from '../../types/PrediccionDemanda';
import { PrediccionDemandaService } from '../../services/PrediccionDemandaService';
import DetalleButton from '../DetalleButton/DetalleButton';
import PrediccionDemandaModal from '../Modals/PrediccionDemandaModal';
import { Articulo } from '../../types/Articulo';
import { ArticuloService } from '../../services/ArticuloService';

function DemandaHistoricaTable() {
    const [ventas, setVentas] = useState<PrediccionDemanda[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    const [sortBy, setSortBy] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [ventaID, setVentaID] = useState<number>(0);

    useEffect(() => {
        const fetchVentas = async () => {
            const ventas = await PrediccionDemandaService.getVentas();
            sortVentas(ventas);
        };
        fetchVentas();
    }, [refreshData, sortBy, sortOrder]);

    const initializableNewVenta = (): PrediccionDemanda => {
        return {
            id: 0,

            articulo:"",
            
            porcentajeDeError: 0,

            fechaInicio: "",

            fechaFin: "",

            cantidadPeriodo: "",

            metodoPrediccion: "",

            valorPrediccion: 0,

            error:0,

        
        };
    };

    const [venta, setVenta] = useState<PrediccionDemanda>(initializableNewVenta);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [nombre, setNombre] = useState("");

    const handleClick = (newNombre: string, venta: PrediccionDemanda, modal: ModalType) => {
        setNombre(newNombre);
        setModalType(modal);
        setVenta(venta);
        setShowModal(true);
    }

    const sortVentas = (ventas: PrediccionDemanda[]) => {
        const sortedVentas = [...ventas].sort((a, b) => {
            if (sortOrder === 'asc') {
                switch (sortBy) {
                    case 'id':
                        return a.id - b.id;
                    case 'porcentajeDeError':
                        return a.porcentajeDeError-b.porcentajeDeError;
                    case 'fechaInicio':
                        return new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime();
                    case 'fechaFin':
                        return new Date(a.fechaFin).getTime() - new Date(b.fechaFin).getTime();
                    case 'cantidadPeriodo':
                        return a.cantidadPeriodo.localeCompare(b.cantidadPeriodo);
                    case 'metodoPrediccion':
                        return a.metodoPrediccion.localeCompare(b.metodoPrediccion);
                    default:
                        return 0;
                }
            } else {
                switch (sortBy) {
                    case 'id':
                        return b.id - a.id;
                    case 'porcentajeDeError':
                        return b.porcentajeDeError-a.porcentajeDeError;
                    case 'fechaInicio':
                        return new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime();
                    case 'fechaFin':
                        return new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime();
                    case 'cantidadPeriodo':
                        return b.cantidadPeriodo.localeCompare(a.cantidadPeriodo);
                    case 'metodoPrediccion':
                        return b.metodoPrediccion.localeCompare(a.metodoPrediccion);
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

    //ARTICULO

    const [articuloNombre, setArticuloNombre] = useState<Articulo[]|null>(null);

    useEffect(() => {
            const fetchVentas = async () => {
                const art = await ArticuloService.getVentas();
                setArticuloNombre(art);
            };
            fetchVentas();
        }, [refreshData, sortBy, sortOrder]);


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <Button
                        onClick={() => handleClick("Nueva Prediccion de Demanda", initializableNewVenta(), ModalType.CREATE)}
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
                        Generar prediccion de demanda
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                    <Table striped bordered hover style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>Id</th>
                                <th onClick={() => handleSort('porcentajeDeError')} style={{ cursor: 'pointer' }}>Porcentaje de Error</th>
                                <th onClick={() => handleSort('error')} style={{ cursor: 'pointer' }}>Error</th>
                                <th onClick={() => handleSort('articulo')} style={{ cursor: 'pointer' }}>Articulo</th>
                                <th onClick={() => handleSort('valorPrediccion')} style={{ cursor: 'pointer' }}>Valor de la Prediccion</th>
                                <th onClick={() => handleSort('fechaInicio')} style={{ cursor: 'pointer' }}>Fecha Inicio Periodo</th>
                                <th onClick={() => handleSort('fechaFin')} style={{ cursor: 'pointer' }}>Fecha Fin Periodo</th>
                                <th onClick={() => handleSort('cantidadPeriodo')} style={{ cursor: 'pointer' }}>Cantidad de periodos</th>
                                <th onClick={() => handleSort('metodoPrediccion')} style={{ cursor: 'pointer' }}>Metodo de prediccion</th>
                                <th>Ver detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta) => (
                                <tr key={venta.id}>
                                    <td>{venta.id}</td>
                                    <td>{venta.porcentajeDeError}</td>
                                    <td>{venta.error}</td>
                                    <td>{venta.articulo}</td>
                                    <td>{venta.valorPrediccion}</td>
                                    <td>{venta.fechaInicio}</td>
                                    <td>{venta.fechaFin}</td>
                                    <td>{venta.cantidadPeriodo}</td>
                                    <td>{venta.metodoPrediccion}</td>
                                    <td>                                    
                                        <DetalleButton  onClick={() => handleClick('Ver detalle de venta', venta, ModalType.DETAIL)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {showModal && (
                <PrediccionDemandaModal
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

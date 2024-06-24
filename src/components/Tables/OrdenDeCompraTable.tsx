import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button, Modal } from 'react-bootstrap';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { OrdenDeCompra } from '../../types/OrdenDeCompra';
import { OrdenDeCompraService } from '../../services/OrdenDeCompraService';
import OrdenDeCompraModal from '../Modals/OrdenDeCompraModal';
import { FaSort } from 'react-icons/fa'; // Importa el ícono de ordenamiento

function OrdenDeCompraTable() {
    const [ordenesDeCompra, setOrdenesDeCompra] = useState<OrdenDeCompra[]>([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchOrdenesDeCompra = async () => {
            const ordenesDeCompra = await OrdenDeCompraService.getVentas();
            setOrdenesDeCompra(ordenesDeCompra);
        };
        fetchOrdenesDeCompra();
    }, [refreshData]);

    const initializableNewOrdenDeCompra = (): OrdenDeCompra => ({
        id: 0,
        nombreArticulo: "",
        precioIndividual: 0,
        totalCompra: 0,
        cantidad: 0,
        fechaLlegada: "",
        fechaPedido: '',
        estadoOrdenDeCompra: '',
        proveedorArticulo: '',
    });

    const [ordenDeCompra, setOrdenDeCompra] = useState<OrdenDeCompra>(initializableNewOrdenDeCompra);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [nombre, setNombre] = useState('');

    const handleClick = (newNombre: string, ordenDeCompra: OrdenDeCompra, modal: ModalType) => {
        setNombre(newNombre);
        setModalType(modal);
        setOrdenDeCompra(ordenDeCompra);
        setShowModal(true);
    };

    // CONFIRMAR ORDEN

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleClickConfirm = (ordenDeCompra: OrdenDeCompra) => {
        setOrdenDeCompra(ordenDeCompra);
        setShowConfirmModal(true);
    };

    const handleConfirmOrder = async () => {
        if (ordenDeCompra.id) {
            const response = await OrdenDeCompraService.confirmarOrdenDeCompra(ordenDeCompra.id);
            setRefreshData(prev => !prev); // Actualizar la tabla después de la confirmación
        }
        setShowConfirmModal(false); // Ocultar el modal después de confirmar o cancelar
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const [orderBy, setOrderBy] = useState<string>('id'); // Columna inicial de orden
    const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc'); // Dirección inicial de orden

    const handleSort = (column: string) => {
        if (orderBy === column) {
            // Si ya está ordenado por la misma columna, cambia la dirección
            setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Si es una nueva columna, ordena por esa columna en dirección ascendente por defecto
            setOrderBy(column);
            setOrderDirection('asc');
        }
    };

    // Función para ordenar los datos basándose en el estado actual de orderBy y orderDirection
    const sortedOrdenesDeCompra = [...ordenesDeCompra].sort((a, b) => {
        const columnA = a[orderBy as keyof OrdenDeCompra];
        const columnB = b[orderBy as keyof OrdenDeCompra];
        if (columnA < columnB) {
            return orderDirection === 'asc' ? -1 : 1;
        }
        if (columnA > columnB) {
            return orderDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
                <Button
                    onClick={() => handleClick('Nueva orden de compra', initializableNewOrdenDeCompra(), ModalType.CREATE)}
                    style={{
                        width: '200px',
                        backgroundColor: '#28a745',
                        borderColor: '#28a745',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
                >
                    Generar orden de compra
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <Table striped bordered hover style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th onClick={() => handleSort('id')}>
                                Id {orderBy === 'id' && <FaSort style={{ marginLeft: '5px' }} />}
                            </th>
                            <th onClick={() => handleSort('nombreArticulo')}>
                                Articulo {orderBy === 'nombreArticulo' && <FaSort style={{ marginLeft: '5px' }} />}
                            </th>
                            <th onClick={() => handleSort('precioIndividual')}>
                                Precio individual {orderBy === 'precioIndividual' && <FaSort style={{ marginLeft: '5px' }} />}
                            </th>
                            <th onClick={() => handleSort('totalCompra')}>
                                Monto Total {orderBy === 'totalCompra' && <FaSort style={{ marginLeft: '5px' }} />}
                            </th>
                            <th onClick={() => handleSort('cantidad')}>
                                Cantidad {orderBy === 'cantidad' && <FaSort style={{ marginLeft: '5px' }} />}
                            </th>
                            <th onClick={() => handleSort('fechaPedido')}>
                                Fecha de Pedido {orderBy === 'fechaPedido' && <FaSort style={{ marginLeft: '5px' }} />}
                            </th>
                            <th onClick={() => handleSort('fechaLlegada')}>
                                Fecha de Llegada {orderBy === 'fechaLlegada' && <FaSort style={{ marginLeft: '5px' }} />}
                            </th>
                            <th onClick={() => handleSort('estadoOrdenDeCompra')}>
                                Estado {orderBy === 'estadoOrdenDeCompra' && <FaSort style={{ marginLeft: '5px' }} />}
                            </th>
                            <th onClick={() => handleSort('proveedorArticulo')}>
                                Proveedor {orderBy === 'proveedorArticulo' && <FaSort style={{ marginLeft: '5px' }} />}
                            </th>
                            <th>Marcar como recibida</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrdenesDeCompra.map((ordenDeCompra) => (
                            <tr key={ordenDeCompra.id} style={{ textAlign: 'center' }}>
                                <td>{ordenDeCompra.id}</td>
                                <td>{ordenDeCompra.nombreArticulo}</td>
                                <td>{ordenDeCompra.precioIndividual}</td>
                                <td>{ordenDeCompra.totalCompra}</td>
                                <td>{ordenDeCompra.cantidad}</td>
                                <td>{ordenDeCompra.fechaPedido}</td>
                                <td>{ordenDeCompra.fechaLlegada === "" ? "--" : ordenDeCompra.fechaLlegada}</td>
                                <td>{ordenDeCompra.estadoOrdenDeCompra}</td>
                                <td>{ordenDeCompra.proveedorArticulo}</td>
                                <td>
                                    {ordenDeCompra.estadoOrdenDeCompra === "PEDIDA" ? (
                                        <Button onClick={() => handleClickConfirm(ordenDeCompra)} variant="primary">
                                            Confirmar
                                        </Button>
                                    ) : (
                                        <Button variant='dark'>Confirmada</Button>
                                    )}
                                </td>
                                <td>
                                    <DeleteButton onClick={() => handleClick('Eliminar orden de compra', ordenDeCompra, ModalType.DELETE)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {showModal && (
                <OrdenDeCompraModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    nombre={nombre}
                    modalType={modalType}
                    ventaArticulo={ordenDeCompra}
                    refreshData={setRefreshData}
                />
            )}
            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Orden de Compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Confirmar la llegada de la orden de compra?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmOrder}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrdenDeCompraTable;

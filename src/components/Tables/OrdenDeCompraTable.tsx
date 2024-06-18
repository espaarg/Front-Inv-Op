import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { OrdenDeCompra } from '../../types/OrdenDeCompra';
import { OrdenDeCompraService } from '../../services/OrdenDeCompraService';
import OrdenDeCompraModal from '../Modals/OrdenDeCompraModal';

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
        totalCompra: 0,
        totalArticulos: 0,
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
                            <th>Id</th>
                            <th>Monto Total</th>
                            <th>Cantidad de Artículos</th>
                            <th>Fecha de Pedido</th>
                            <th>Estado</th>
                            <th>Proveedor</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenesDeCompra.map((ordenDeCompra) => (
                            <tr key={ordenDeCompra.id} style={{ textAlign: 'center' }}>
                                <td>{ordenDeCompra.id}</td>
                                <td>{ordenDeCompra.totalCompra}</td>
                                <td>{ordenDeCompra.totalArticulos}</td>
                                <td>{ordenDeCompra.fechaPedido}</td>
                                <td>{ordenDeCompra.estadoOrdenDeCompra}</td>
                                <td>{ordenDeCompra.proveedorArticulo}</td>
                                <td>
                                    <EditButton onClick={() => handleClick('Editar orden de compra', ordenDeCompra, ModalType.UPDATE)} />
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
        </>
    );
}

export default OrdenDeCompraTable;

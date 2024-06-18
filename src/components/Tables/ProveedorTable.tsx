import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { ModalType } from '../../types/ModalType';
import { Proveedor } from '../../types/Proveedor';
import { ProveedorService } from '../../services/ProveedorService';
import ProveedorModal from '../Modals/ProveedorModal';

function ProveedorTable() {
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [articulo, setArticulo] = useState<Proveedor>({
        id: 0,
        nombreProveedor: '',
        diasDemora: 0,
    });
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const proveedoresData = await ProveedorService.getVentas();
                setProveedores(proveedoresData);
            } catch (error) {
                console.error('Error fetching Proveedores:', error);
            }
        };
        fetchProveedores();
    }, [refreshData]);

    const initializableNewArticulo = (): Proveedor => {
        return {
            id: 0,
            nombreProveedor: '',
            diasDemora: 0,
        };
    };

    const handleClick = (newNombre: string, articulo: Proveedor, modal: ModalType) => {
        setNombre(newNombre);
        setModalType(modal);
        setArticulo(articulo);
        setShowModal(true);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                    onClick={() => handleClick('Nuevo proveedor', initializableNewArticulo(), ModalType.CREATE)}
                    style={{ width: '150px', margin: '20px' }}
                >
                    Añadir proveedor
                </Button>
            </div>
            <div className="container mt-5">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {proveedores.map(proveedor => (
                        <div key={proveedor.id} className="col mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{proveedor.nombreProveedor}</Card.Title>
                                    <Card.Text>
                                        Días de demora: {proveedor.diasDemora}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <EditButton onClick={() => handleClick('Editar proveedor', proveedor, ModalType.UPDATE)} />
                                        <DeleteButton onClick={() => handleClick('Eliminar proveedor', proveedor, ModalType.DELETE)} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <ProveedorModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    nombre={nombre}
                    modalType={modalType}
                    ventaArticulo={articulo}
                    refreshData={setRefreshData}
                />
            )}
        </>
    );
}

export default ProveedorTable;

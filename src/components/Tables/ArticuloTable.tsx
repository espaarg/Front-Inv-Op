import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Articulo } from '../../types/Articulo';
import { ArticuloService } from '../../services/ArticuloService';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import ArticuloModal from '../Modals/ArticuloModal';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

function ArticuloTable() {

    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchArticulos = async () => {
            const articulos = await ArticuloService.getVentas();
            setArticulos(articulos);
        };
        fetchArticulos();
    }, [refreshData]);

    const initializableNewArticulo = (): Articulo => ({
        id: 0,
        nombre: "",
        precioCompra: 0,
        stockActual: 0,
        stockDeSeguridad: 0,
        loteOptimo: 0,
        cgiArticulo: 0,
        fechaAlta: "new Date('2024-06-07')"
    });

    const [articulo, setArticulo] = useState<Articulo>(initializableNewArticulo);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [nombre, setNombre] = useState("");

    const handleClick = (newNombre: string, articulo: Articulo, modal: ModalType) => {
        setNombre(newNombre);
        setModalType(modal);
        setArticulo(articulo);
        setShowModal(true);
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
                <Button
                    onClick={() => handleClick("Nuevo articulo", initializableNewArticulo(), ModalType.CREATE)}
                    style={{
                        width: '150px',
                        backgroundColor: '#007bff',
                        borderColor: '#007bff',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Añadir articulo
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <Table striped bordered hover style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock Actual</th>
                            <th>Stock De Seguridad</th>
                            <th>Lote Óptimo</th>
                            <th>CGI</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulos.map(articulo => (
                            <tr key={articulo.id} style={{ textAlign: 'center' }}>
                                <td>{articulo.id}</td>
                                <td>{articulo.nombre}</td>
                                <td>{articulo.precioCompra}</td>
                                <td>{articulo.stockActual}</td>
                                <td>{articulo.stockDeSeguridad}</td>
                                <td>{articulo.loteOptimo}</td>
                                <td>{articulo.cgiArticulo}</td>
                                <td>
                                    <EditButton onClick={() => handleClick("Editar articulo", articulo, ModalType.UPDATE)} />
                                </td>
                                <td>
                                    <DeleteButton onClick={() => handleClick("Eliminar articulo", articulo, ModalType.DELETE)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {showModal && (
                <ArticuloModal
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

export default ArticuloTable;

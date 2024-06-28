import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Articulo } from '../../types/Articulo';
import { ArticuloService } from '../../services/ArticuloService';
import { ModalType } from '../../types/ModalType';
import ArticuloModal from '../Modals/ArticuloModal';


function ArticuloFaltanteTable() {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Articulo; direction: string } | null>(null);
    

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const articulos = await ArticuloService.getArticuloFaltante();
                setArticulos(Array.isArray(articulos) ? articulos : []);
            } catch (error) {
                console.error("Error fetching articulos: ", error);
                setArticulos([]);
            }
        };
        fetchArticulos();
    }, [refreshData]);

    const sortedArticulos = [...articulos];
    if (sortConfig !== null) {
        sortedArticulos.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    const requestSort = (key: keyof Articulo) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const initializableNewArticulo = (): Articulo => ({
        id: 0,
        nombre: "",
        precioCompra: 0,
        stockActual: 0,
        stockDeSeguridad: 0,
        loteOptimo: 0,
        cgiArticulo: 0,
        puntoPedido: 0,
        costoAlmacenamiento: 0,
        cantMax: 0,
        cantAPedir: 0,
        tiempoEntrePedidos: 0,
        modeloInventario: "",
        proveedorArticulo: "",
        seleccionado: false, // Atributo para manejar la selección

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

    const actualizar = () =>  {
        ArticuloService.actualizar();
        setRefreshData(prev => !prev);
    }

    const getSortIndicator = (key: keyof Articulo) => {
        if (!sortConfig) {
            return null;
        }
        return sortConfig.key === key ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null;
    }

    return (
        <>
        
            
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <Table striped bordered hover style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th onClick={() => requestSort('id')}>Id {getSortIndicator('id')}</th>
                            <th onClick={() => requestSort('nombre')}>Nombre {getSortIndicator('nombre')}</th>
                            <th onClick={() => requestSort('precioCompra')}>Precio {getSortIndicator('precioCompra')}</th>
                            <th onClick={() => requestSort('stockActual')}>Stock Actual {getSortIndicator('stockActual')}</th>
                            <th onClick={() => requestSort('stockDeSeguridad')}>Stock De Seguridad {getSortIndicator('stockDeSeguridad')}</th>
                            <th onClick={() => requestSort('loteOptimo')}>Lote Óptimo {getSortIndicator('loteOptimo')}</th>
                            <th onClick={() => requestSort('cgiArticulo')}>CGI {getSortIndicator('cgiArticulo')}</th>
                            <th onClick={() => requestSort('puntoPedido')}>Punto de pedido {getSortIndicator('puntoPedido')}</th>
                            <th onClick={() => requestSort('costoAlmacenamiento')}>Costo de almacenamiento {getSortIndicator('costoAlmacenamiento')}</th>
                            <th onClick={() => requestSort('cantMax')}>Cantidad Maxima {getSortIndicator('cantMax')}</th>
                            <th onClick={() => requestSort('cantAPedir')}>Cantidad a pedir {getSortIndicator('cantAPedir')}</th>
                            <th onClick={() => requestSort('tiempoEntrePedidos')}>Tiempo entre pedidos {getSortIndicator('tiempoEntrePedidos')}</th>
                            <th onClick={() => requestSort('modeloInventario')}>Modelo de Inventario {getSortIndicator('modeloInventario')}</th>
                            <th onClick={() => requestSort('proveedorArticulo')}>Proveedor {getSortIndicator('proveedorArticulo')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedArticulos.map(articulo => (
                            <tr key={articulo.id} style={{ textAlign: 'center' }}>
                                <td>{articulo.id}</td>
                                <td>{articulo.nombre}</td>
                                <td>{articulo.precioCompra}</td>
                                <td>{articulo.stockActual}</td>
                                <td>{articulo.stockDeSeguridad}</td>
                                <td>{articulo.modeloInventario=="LOTEFIJO" ? articulo.loteOptimo: "--"}</td>
                                <td>{articulo.cgiArticulo.toFixed(2)}</td> {/* Aquí se asegura que se muestre con dos decimales */}
                                <td>{articulo.modeloInventario=="LOTEFIJO" ? articulo.puntoPedido: "--"}</td>
                                <td>{articulo.costoAlmacenamiento}</td>
                                <td>{articulo.modeloInventario=="INTERVALOFIJO" ? articulo.cantMax: "--"}</td>
                                <td>{articulo.modeloInventario=="INTERVALOFIJO" ? articulo.cantAPedir: "--"}</td>
                                <td>{articulo.modeloInventario=="INTERVALOFIJO" ? articulo.tiempoEntrePedidos:"--"}</td>
                                <td>{articulo.modeloInventario}</td>
                                <td>{articulo.proveedorArticulo}</td>
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

export default ArticuloFaltanteTable;

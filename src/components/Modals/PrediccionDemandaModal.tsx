import { Button, Form, Modal, ModalDialog, Table } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import { Venta } from '../../types/Venta';
import { useState, useEffect } from 'react';
import { ArticuloService } from '../../services/ArticuloService';
import { Articulo } from '../../types/Articulo';
import 'react-toastify/dist/ReactToastify.css';
import { VentaService } from '../../services/VentaService';
import { toast } from 'react-toastify';
import VentaArticuloTable from '../Tables/VentaArticuloTable';
import { PrediccionDemanda } from '../../pages/PrediccionDemanda';
import { PrediccionDemandaService } from '../../services/PrediccionDemandaService';

type PrediccionDemandaModalProps = {
    show: boolean;
    onHide: () => void;
    nombre: string;
    modalType: ModalType;
    venta: PrediccionDemanda;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const PrediccionDemandaModal = ({
    show,
    onHide,
    nombre,
    modalType,
    venta,
    refreshData,
}: PrediccionDemandaModalProps) => {
    const [articulos, setArticulos] = useState<PrediccionDemanda[]>([]);
    const [articulosSeleccionados, setArticulosSeleccionados] = useState<{ articulo: Articulo, cantidad: number, invalid: boolean }[]>([]);

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const articulos = await PrediccionDemandaService.getVentas();
                setArticulos(Array.isArray(articulos) ? articulos : []);
            } catch (error) {
                console.error("Error fetching articulos: ", error);
                setArticulos([]);
            }
        };

        fetchArticulos();
    }, []);

    const handleGuardar = async () => {
        try {
            // Validar que todas las cantidades sean válidas (mayores que cero y dentro del stock)
            const cantidadesValidas = articulosSeleccionados.every(as => as.cantidad > 0 && as.cantidad <= as.articulo.stockActual);
            if (!cantidadesValidas) {
                alert('Por favor, ingrese una cantidad válida para cada artículo seleccionado.');
                return;
            }

            // Aquí puedes procesar los artículos seleccionados con sus cantidades
            // Por ejemplo, guardar en la base de datos, enviar a un servicio, etc.

            // Limpia la selección y oculta el modal
            
            VentaService.createVenta(articulosSeleccionados);
            setArticulosSeleccionados([]);
            onHide();
            setTimeout(() => {
                refreshData(prevState => !prevState);
            }, 500);
            toast.success('Venta creada con éxito', { position: 'top-center' });
        } catch (error) {
            console.error('Error al crear la venta:', error);
            toast.error('Error al crear la venta', { position: 'top-center' });

        }
    };

    const handleCancelar = () => {
        // Limpia la selección y oculta el modal
        setArticulosSeleccionados([]);
        onHide();
    };

    const handleCantidadChange = (articuloId: number, nuevaCantidad: number) => {
        setArticulosSeleccionados(prevArticulos =>
            prevArticulos.map(as =>
                as.articulo.id === articuloId ? { ...as, cantidad: nuevaCantidad, invalid: nuevaCantidad < 0 || nuevaCantidad > as.articulo.stockActual } : as
            )
        );
    };

    const handleArticuloSelect = (articulo: Articulo) => {
        // Verificar si el artículo ya está seleccionado
        const articuloExistente = articulosSeleccionados.find(as => as.articulo.id === articulo.id);

        if (articuloExistente) {
            // Si ya está seleccionado, deseleccionar
            setArticulosSeleccionados(prevArticulos =>
                prevArticulos.filter(as => as.articulo.id !== articulo.id)
            );
        } else {
            // Si no está seleccionado, agregarlo con una cantidad inicial (puedes ajustar esto según tus necesidades)
            setArticulosSeleccionados(prevArticulos => [
                ...prevArticulos,
                { articulo: articulo, cantidad: 1, invalid: false } // Cantidad inicial y estado de validez inicial
            ]);
        }
    };




    return (
        <>
        {modalType === ModalType.DETAIL ?  (
            <>  
            <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <VentaArticuloTable ventaID={venta.id} />
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>

            </Modal>
            </>
        ) :(
        <div >
        <Modal show={show} onHide={handleCancelar} centered className="l" style={{paddingTop:'400px'}}>
            <Modal.Header closeButton >
                <Modal.Title>{nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form>
                    <Form.Group controlId="formProveedorArticulo">
                                    <Form.Label>Artículo</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="proveedorArticulo"
                                        value={formik.values.proveedorArticulo}
                                        onChange={(e) => {
                                            handleArticuloChange(e);
                                            handleProveedorChange(e.target.value);
                                            
                                        }}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.proveedorArticulo && !!formik.errors.proveedorArticulo}
                                    >
                                        <option value="">Selecciona un artículo</option>
                                        {articulos.map(articulo => (
                                            <option key={articulo.id} value={articulo.id.toString()}>
                                                {articulo.nombre}
                                            </option>
                                        )
                                        )}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.proveedorArticulo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {proveedores.map(proveedor => (
                                    <div key={proveedor.id} style={{ marginBottom: '20px' }}>
                                        <h5>Detalles del artículo para {proveedor.nombreProveedor}</h5>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Modelo de Inventario</th>
                                                    <th>Costo proveedor</th>
                                                    <th>Costo Total</th>
                                                    {selectedArticulo && selectedArticulo.modeloInventario === 'LOTEFIJO' && (
                                                        <>
                                                            <th>Lote Óptimo</th>
                                                            <th>CGI Artículo</th>
                                                            <th>Costo de Almacenamiento</th>
                                                        </>
                                                    )}
                                                    {selectedArticulo && selectedArticulo.modeloInventario === 'INTERVALOFIJO' && (
                                                        <>
                                                            <th>CGI Artículo</th>
                                                            <th>Costo de Almacenamiento</th>
                                                            <th>Cantidad Máxima</th>
                                                            <th>Cantidad a Pedir</th>
                                                            <th>Tiempo entre Pedidos</th>
                                                            
                                                        </>
                                                    )}
                                                    <th>Cantidad personalizada</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {selectedArticulo && (
                                                        <>
                                                            <td>{selectedArticulo.modeloInventario}</td>
                                                            <td>{proveedor.costoPedido}</td>
                                                            {selectedArticulo.modeloInventario === 'LOTEFIJO' && (
                                                                <>
                                                                    <td>{(selectedArticulo.precioCompra ) * (cantPerso>0 ? cantPerso : selectedArticulo.loteOptimo) + proveedor.costoPedido}</td>
                                                                    <td>{selectedArticulo.loteOptimo}</td>
                                                                    <td>{selectedArticulo.cgiArticulo}</td>
                                                                    <td>{((mca.valor/2 )* (cantPerso>0 ? cantPerso : selectedArticulo.loteOptimo)).toFixed(2)}</td>
                                                                    <td>
                                                                        <Form.Group controlId="formNombre">
                                                                            <Form.Control
                                                                            min={0}
                                                                            max={100000}
                                                                            type="number"
                                                                            name="cantPerso"
                                                                            value={cantPerso}
                                                                            onChange={handleChange}
                                                                            placeholder="---"
                                                                            />
                                                                        </Form.Group>
                                                                        </td>
                                                                </>
                                                            )}
                                                            {selectedArticulo.modeloInventario === 'INTERVALOFIJO' && (
                                                                <>
                                                                    <td>{(selectedArticulo.precioCompra ) * (cantPerso>0 ? cantPerso : selectedArticulo.cantAPedir) + proveedor.costoPedido}</td>
                                                                    <td>{selectedArticulo.cgiArticulo}</td>
                                                                    <td>{((mca.valor/2 ) * (cantPerso>0 ? cantPerso : selectedArticulo.cantAPedir)).toFixed(2)}</td>
                                                                    <td>{selectedArticulo.cantMax}</td>
                                                                    <td>
                                                                        {selectedArticulo.cantAPedir}
                                                                    </td>
                                                                    <td>{selectedArticulo.tiempoEntrePedidos}</td>
                                                                    <td>
                                                                    <Form.Group controlId="formNombre">
                                                                        <Form.Control
                                                                        min={0}
                                                                        max={selectedArticulo.modeloInventario==='INTERVALOFIJO' ? selectedArticulo.cantMax : 100000}
                                                                        type="number"
                                                                        name="cantPerso"
                                                                        value={cantPerso}
                                                                        onChange=
                                                                        {(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            handleChange(e); // Llama a handleCantidadChange con el valor
                                                                        }}
                                                                        isInvalid={(selectedArticulo.cantMax<cantPerso)? true : false} // Usa el estado de validez
                                                                        placeholder="---"
                                                                        />
                                                                    </Form.Group>
                                                                    </td>
                                                                </>
                                                            )}
                                                           
                                                            <td>
                                                                <Button
                                                                    variant="success"
                                                        
                                                                    onClick={() => {
                                                                        const newCantidad = cantPerso > 0 ? cantPerso :
                                                                                                        selectedArticulo.modeloInventario === 'INTERVALOFIJO'
                                                                                                        ? selectedArticulo.cantAPedir
                                                                                                        : selectedArticulo.loteOptimo;
                                                                        handleSaveUpdate(selectedArticulo?.id || 0, newCantidad, proveedor.id);
                                                                    }}
                                                                >
                                                                    Guardar
                                                                </Button>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                ))}

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={onHide}>
                                        Cancelar
                                    </Button>
                                </Modal.Footer>
                    </Form>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelar}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleGuardar}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
        )
    }
        </>
    );
};

export default PrediccionDemandaModal;

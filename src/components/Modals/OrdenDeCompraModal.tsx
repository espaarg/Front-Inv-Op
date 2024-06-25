import { Button, Form, Modal, Table } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { OrdenDeCompraService } from '../../services/OrdenDeCompraService';
import { OrdenDeCompra } from '../../types/OrdenDeCompra';
import { Articulo } from '../../types/Articulo';
import { Proveedor } from '../../types/Proveedor';
import { useState, useEffect } from 'react';
import { ArticuloService } from '../../services/ArticuloService';
import { ProveedorService } from '../../services/ProveedorService';
import 'react-toastify/dist/ReactToastify.css';
import { MCAService } from '../../services/MCAService';
import { MCA } from '../../types/MCA';
import '../../styles/ModalOrden.css'

type OrdenDeCompraModalProps = {
    show: boolean;
    onHide: () => void;
    nombre: string;
    modalType: ModalType;
    ventaArticulo: OrdenDeCompra;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrdenDeCompraModal = ({
    show,
    onHide,
    nombre,
    modalType,
    ventaArticulo: ordenDeCompra,
    refreshData,
}: OrdenDeCompraModalProps) => {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [selectedArticulo, setSelectedArticulo] = useState<Articulo | null>(null);
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState<Proveedor | null>(null);
    const [ventasPorProveedor, setVentasPorProveedor] = useState<{ [key: string]: OrdenDeCompra }>({});
    const [cantPerso, setCantPerso] = useState<number>(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCantPerso(Number(e.target.value));
    };

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const articulos = await ArticuloService.getVentas();
                setArticulos(Array.isArray(articulos) ? articulos : []);
            } catch (error) {
                console.error("Error fetching articulos: ", error);
                setArticulos([]);
            }
        };

        const fetchProveedores = async () => {
            try {
                const proveedores = await ProveedorService.getVentas();
                setProveedores(Array.isArray(proveedores) ? proveedores : []);
            } catch (error) {
                console.error("Error fetching proveedores: ", error);
                setProveedores([]);
            }
        };

        fetchArticulos();
        fetchProveedores();
    }, [refreshData]);

    const handleSaveUpdate = async (articuloID: number, cantidad: number, proveedorId: number) => {
        try {
            if (articuloID <= 0) {
                throw new Error('Por favor, seleccione un artículo válido.');
            }
            if (cantidad <= 0) {
                throw new Error('La cantidad debe ser mayor que cero.');
            }
            if (proveedorId <= 0) {
                throw new Error('Por favor, seleccione un proveedor válido.');
            }

            await OrdenDeCompraService.createOC(articuloID, cantidad, proveedorId);

            onHide();
            refreshData((prevState) => !prevState);
            setTimeout(() => {
                toast.success('Orden creada', { position: 'top-center' });
            }, 500);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            console.error(errorMessage);
            toast.error(errorMessage, { position: 'top-center' });
        }
    };

    const handleDelete = async () => {
        try {
            await OrdenDeCompraService.deleteVenta(ordenDeCompra.id);
            onHide();
            refreshData((prevState) => !prevState);
            toast.success('Artículo eliminado', { position: 'top-center' });

        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        }
    };

    const validationSchema = () => {
        return Yup.object().shape({
            proveedorArticulo: Yup.string().required('Articulo'),
        });
    };

    const formik = useFormik({
        initialValues: {
            cantidad: selectedArticulo?.cantAPedir || 0, // Establece el valor inicial de cantidad
            id: 0,
            nombreArticulo: "",
            precioIndividual: 0,
            totalCompra: 0,
            fechaPedido: "",
            fechaLlegada: "",
            estadoOrdenDeCompra: "",
            proveedorArticulo: "",
        },
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: OrdenDeCompra) => {
            const articuloID = Number(obj.nombreArticulo);
            const cantidad = Number(obj.cantidad);
            const proveedorId = Number(obj.proveedorArticulo);

        },
    });

    const handleArticuloChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const articuloId = event.target.value as string;
        const selected = articulos.find(articulo => articulo.id === Number(articuloId)) || null;
        setSelectedArticulo(selected);
        formik.setFieldValue('proveedorArticulo', articuloId);
    };

    const handleProveedorChange = (proveedorId: string) => {
        const selectedProveedor = proveedores.find(proveedor => proveedor.id === Number(proveedorId)) || null;
        setProveedorSeleccionado(selectedProveedor);

        // Crear una nueva venta para este proveedor si no existe una ya
        if (!ventasPorProveedor[proveedorId]) {
            setVentasPorProveedor({
                ...ventasPorProveedor,
                [proveedorId]: {
                    ...ordenDeCompra,
                    proveedorArticulo: proveedorId,
                },
            });
        }
    };

    //Traigo MCA

    const mcaF= {
        id:1,
        valor:0.54
    }

    const [mca, setMca] = useState<MCA>(mcaF);

    


    useEffect(() => {
        const fetchMCA = async () => {
            try {
                const mcas = await MCAService.getVentas();
                    setMca(mcas[0]);
                
            } catch (error) {
                console.error("Error fetching MCAs: ", error);
            }
        };

        fetchMCA();
    }, []);

    //Personalizacion modal
    const customModalStyles = {
        modalDialog: {
             // Ajusta este valor según tus necesidades
             minWidth: '1000px', // O cualquier tamaño máximo deseado
             widht:'auto' 

        },

        modalGeneral: {
            minWidth: "1000px",
        },

        modalContainer: {
            backgroundColor: 'transparent', /* Remove white background */
          }
          

    };

    return (
        <>
            {modalType === ModalType.DELETE ? (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" >
                        <Modal.Header closeButton>
                            <Modal.Title>{nombre}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                ¿Está seguro de eliminar el artículo <strong>{ordenDeCompra.id}</strong>? <br />
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <>
                    <Modal show={show} onHide={onHide}  centered backdrop="static" style={customModalStyles.modalContainer}>
                    <Modal.Dialog size= "auto" style={customModalStyles.modalDialog}>
                        <Modal.Header closeButton>
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
                        </Modal.Dialog>
                    </Modal>
                    <ToastContainer />
                </>
            )}
        </>
    );
};

export default OrdenDeCompraModal;

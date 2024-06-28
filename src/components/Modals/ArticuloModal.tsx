import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Articulo } from '../../types/Articulo';
import { ModalType } from '../../types/ModalType';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ArticuloService } from '../../services/ArticuloService';
import { toast } from 'react-toastify';
import { Proveedor } from '../../types/Proveedor';
import { ProveedorService } from '../../services/ProveedorService';
import { Enum } from '../Enums/Enum';
import { EnumService } from '../../services/EnumService';

type ArticuloModalProps = {
    show: boolean;
    onHide: () => void;
    nombre: string;
    modalType: ModalType;
    ventaArticulo: Articulo;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArticuloModal = ({
    show,
    onHide,
    nombre,
    modalType,
    ventaArticulo: articulo,
    refreshData,
}: ArticuloModalProps) => {

    const [proveedores, setProveedores] = useState<Proveedor[]>([]);

    const [modelosInventario, setModelosInventario] = useState<Enum[]>([]);


     // Valores iniciales con valores predeterminados
     const initialValues = {
        id:articulo?.id || 0,
        nombre: articulo?.nombre || '',
        precioCompra: articulo?.precioCompra || 0,
        stockActual: articulo?.stockActual || 0,
        stockDeSeguridad: articulo?.stockDeSeguridad || 0,
        loteOptimo: articulo?.loteOptimo || 0,
        cgiArticulo: articulo?.cgiArticulo || 0,
        puntoPedido: articulo?.puntoPedido || 0,
        costoAlmacenamiento: articulo?.costoAlmacenamiento || 0,
        tiempoEntrePedidos: articulo?.tiempoEntrePedidos || 0,
        cantMax: articulo?.cantMax || 0,
        cantAPedir: articulo?.cantAPedir || 0,
        modeloInventario: articulo?.modeloInventario || '',
        proveedorArticulo: articulo?.proveedorArticulo || '',
        seleccionado: false
    };

    const handleSaveUpdate = async (values: Articulo) => {
        try {
            if (values.id === 0) {
                await ArticuloService.createVenta(
                    values.nombre,
                    values.precioCompra,
                    values.stockActual,
                    values.stockDeSeguridad,
                    values.loteOptimo,
                    values.cgiArticulo,
                    values.puntoPedido,
                    values.costoAlmacenamiento,
                    values.tiempoEntrePedidos,
                    values.cantMax,
                    values.cantAPedir,
                    values.modeloInventario,
                    values.proveedorArticulo
                );
            } else {
                await ArticuloService.updateVenta(
                    values.id,
                    values.nombre,
                    values.precioCompra,
                    values.stockActual,
                    values.stockDeSeguridad,
                    values.loteOptimo,
                    values.cgiArticulo,
                    values.puntoPedido,
                    values.costoAlmacenamiento,
                    values.tiempoEntrePedidos,
                    values.cantMax,
                    values.cantAPedir,
                    values.modeloInventario,
                    values.proveedorArticulo
                );
            }    
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        } 
        onHide();
            refreshData(prevState => !prevState);
    };

    const handleDelete = async () => {
        try {
            await ArticuloService.deleteVenta(articulo.id);
            toast.success("Proveedor eliminado" , {position:"top-center"})
            onHide();
            setTimeout(() => {
                refreshData(prevState => !prevState);
            }, 500);
        }catch (error){
            console.error(error);
            toast.success("Ha ocurrido un error")
        }

    }

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const proveedores = await ProveedorService.getVentas();
                setProveedores(Array.isArray(proveedores) ? proveedores : []);
            } catch (error) {
                console.error("Error fetching articulos: ", error);
                setProveedores([]);
            }
        };
        fetchArticulos();
    }, [refreshData]);

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const modelosInventario = await EnumService.getVentas();
                setModelosInventario(Array.isArray(modelosInventario) ? modelosInventario : []);
            } catch (error) {
                console.error("Error fetching articulos: ", error);
                setModelosInventario([]);
            }
        };
        fetchArticulos();
    }, [refreshData]);


    // Esquema de validación Yup
    const validationSchema = () =>{ 
        return Yup.object().shape({
        id: Yup.number().min(0),
        nombre: Yup.string().required('Nombre requerido'),
        precioCompra: Yup.number().min(0, 'El precio debe ser mayor o igual a cero').required('Precio requerido'),
        stockActual: Yup.number().min(0, 'El stock actual debe ser mayor o igual a cero').required('Stock actual requerido'),
        stockDeSeguridad: Yup.number().min(0, 'El stock de seguridad debe ser mayor o igual a cero').required('Stock de seguridad requerido'),
        loteOptimo: Yup.number().min(0, 'El lote óptimo debe ser mayor o igual a cero').required('Lote óptimo requerido'),
        cgiArticulo: Yup.number().min(0, 'El CGI de Articulo debe ser mayor o igual a cero').required('CGI de Articulo requerido'),
        puntoPedido: Yup.number().min(0, 'El punto de pedido debe ser mayor o igual a cero').required('Punto de pedido requerido'),
        costoAlmacenamiento: Yup.number().min(0, 'El costo de almacenamiento debe ser mayor o igual a cero').required('Costo de almacenamiento requerido'),
        tiempoEntrePedidos: Yup.number().min(0, 'El tiempo entre pedidos debe ser mayor o igual a cero').required('Tiempo entre pedidos requerido'),
        cantMax: Yup.number().min(0, 'La cantidad máxima debe ser mayor o igual a cero').required('Cantidad máxima requerida'),
        cantAPedir: Yup.number().min(0, 'La cantidad a pedir debe ser mayor o igual a cero').required('Cantidad a pedir requerida'),
        modeloInventario: Yup.string().required('Modelo de inventario requerido'),
        proveedorArticulo: Yup.string().required('Proveedor'),
        
    });

    }


    // Manejo del formulario con Formik
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,        
        onSubmit: async (values: Articulo) => handleSaveUpdate(values)
    });

    return (
        <>
         {modalType === ModalType.DELETE ?  (
            <>  
            <Modal  show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton >
                    <Modal.Title>{nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Está seguro de eliminar el Articulo  
                    <strong>{articulo.nombre}</strong>? <br />
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                </Modal.Footer>

            </Modal>
            </>
        ) :(
        <Modal show={show} onHide={onHide} centered backdrop="static" style={{paddingTop:'400px'}} className="l">
            <Modal.Header closeButton>
                <Modal.Title>{nombre}</Modal.Title>
                <p style={{color:'red'}}>***Completar todos los campos o no se creará***</p>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            type="text"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.nombre && !!formik.errors.nombre}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.nombre}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPrecio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            name="precioCompra"
                            type="text"
                            value={formik.values.precioCompra}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.precioCompra && !!formik.errors.precioCompra}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.precioCompra}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formStockActual">
                        <Form.Label>Stock Actual</Form.Label>
                        <Form.Control
                            name="stockActual"
                            type="text"
                            value={formik.values.stockActual}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.stockActual && !!formik.errors.stockActual}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.stockActual}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formStockDeSeguridad">
                        <Form.Label>Stock De Seguridad</Form.Label>
                        <Form.Control
                            name="stockDeSeguridad"
                            type="text"
                            value={formik.values.stockDeSeguridad}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.stockDeSeguridad && !!formik.errors.stockDeSeguridad}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.stockDeSeguridad}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formLoteOptimo">
                        <Form.Label>Lote Óptimo</Form.Label>
                        <Form.Control
                            name="loteOptimo"
                            type="text"
                            value={formik.values.loteOptimo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.loteOptimo && !!formik.errors.loteOptimo}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.loteOptimo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCGIArticulo">
                        <Form.Label>CGI Articulo</Form.Label>
                        <Form.Control
                            name="cgiArticulo"
                            type="text"
                            value={formik.values.cgiArticulo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.cgiArticulo && !!formik.errors.cgiArticulo}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.cgiArticulo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPuntoPedido">
                        <Form.Label>Punto de Pedido</Form.Label>
                        <Form.Control
                            name="puntoPedido"
                            type="text"
                            value={formik.values.puntoPedido}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.puntoPedido && !!formik.errors.puntoPedido}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.puntoPedido}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formTiempoEntrePedidos">
                        <Form.Label>Tiempo entre Pedidos</Form.Label>
                        <Form.Control
                            name="tiempoEntrePedidos"
                            type="text"
                            value={formik.values.tiempoEntrePedidos}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.tiempoEntrePedidos && !!formik.errors.tiempoEntrePedidos}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.tiempoEntrePedidos}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCostoAlmacenamiento">
                        <Form.Label>Costo de Almacenamiento</Form.Label>
                        <Form.Control
                            name="costoAlmacenamiento"
                            type="text"
                            value={formik.values.costoAlmacenamiento}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.costoAlmacenamiento && !!formik.errors.costoAlmacenamiento}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.costoAlmacenamiento}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCantMax">
                        <Form.Label>Cantidad Máxima</Form.Label>
                        <Form.Control
                            name="cantMax"
                            type="text"
                            value={formik.values.cantMax}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.cantMax && !!formik.errors.cantMax}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.cantMax}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCantAPedir">
                        <Form.Label>Cantidad a Pedir</Form.Label>
                        <Form.Control
                            name="cantAPedir"
                            type="text"
                            value={formik.values.cantAPedir}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.cantAPedir && !!formik.errors.cantAPedir}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.cantAPedir}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formmodeloInventario">
                        <Form.Label>Modelo de Inventario</Form.Label>
                        <Form.Control
                            as="select"
                            name="modeloInventario"
                            value={formik.values.modeloInventario}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.modeloInventario && !!formik.errors.modeloInventario}
                        >
                            <option value="">Selecciona un Modelo de Inventario</option>
                            {modelosInventario.map((modelo: Enum) => (
                                <option key={modelo.nombre=="LOTEFIJO" ? "LOTEFIJO" : "INTERVALOFIJO"} value={modelo.nombre=="LOTEFIJO" ? "LOTEFIJO" : "INTERVALOFIJO"}>
                                    {modelo.nombre}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.proveedorArticulo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formProveedorArticulo">
                        <Form.Label>Proveedor Artículo</Form.Label>
                        <Form.Control
                            as="select"
                            name="proveedorArticulo"
                            value={formik.values.proveedorArticulo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.proveedorArticulo && !!formik.errors.proveedorArticulo}
                        >
                            <option value="">Selecciona un proveedor</option>
                            {proveedores.map(proveedor => (
                                <option key={proveedor.id} value={proveedor.nombreProveedor}>
                                    {proveedor.nombreProveedor} {/* Ajusta según la estructura de tu proveedor */}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.proveedorArticulo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                            <Button variant="succes" type="submit" disabled={!formik.isValid}> Guardar </Button>
                                
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
        )
    }
    </>
    );
};

export default ArticuloModal;
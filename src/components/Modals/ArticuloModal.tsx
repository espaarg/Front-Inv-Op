import { Button, Form, Modal } from "react-bootstrap";
import { Articulo } from "../../types/Articulo";
import { ModalType } from "../../types/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ArticuloService } from "../../services/ArticuloService";
//Notificaciones al usuario
import { toast } from "react-toastify";

type ArticuloModalProps = {
    show:boolean;
    onHide: ()=> void;
    nombre: string;
    modalType: ModalType;
    ventaArticulo: Articulo;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticuloModal = ({show, onHide, nombre, modalType,ventaArticulo: articulo, refreshData}: ArticuloModalProps) => {

    //CREATE-ACTUALIZAR
    const handleSaveUpdate = async (articulo:Articulo) => {
        try {
            const isNew = articulo.id ===0;
            if(isNew){
                await ArticuloService.createVenta(articulo);
            } else {
                await ArticuloService.updateVenta(articulo.id,articulo);
            }
            toast.success(isNew ? "Articulo creado" : "Articulo modificado", {position: "top-center"})
            onHide();
            refreshData(prevState=>!prevState)
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error")
        }
    };

    const handleDelete = async () => {
        try {
            await ArticuloService.deleteVenta(articulo.id);
            toast.success("Articulo eliminado" , {position:"top-center"})
            onHide();
            refreshData(prevState=>!prevState)
        }catch (error){
            console.error(error);
            toast.success("Ha ocurrido un error")
        }
    }


    //Esquema de validacion yup
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            nombre: Yup.string().required('Nombre requerido'),
            precioCompra: Yup.number().min(0).required('Se requiere un precio'),
            stockActual: Yup.number().min(0).required('Se requiere ingresar el stock actual de ese producto'),
            stockDeSeguridad: Yup.number().min(0).required('stockDeSeguridad requerido'),
            loteOptimo: Yup.number().min(0).required('loteOptimo requerido'),
            cgiArticulo: Yup.number().min(0).required('cgiArticulo requerido'),
        })
    }

    //FORMULARIO formik, esquema de validacion dinamico para evaluar errores

    const formik = useFormik ({
        initialValues: articulo,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit:(obj: Articulo) =>   handleSaveUpdate(obj)
            
    });

    return (
        <>
        {modalType === ModalType.DELETE ?  (
            <>  
            <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Está seguro de eliminar el articulo?
                    <strong>{articulo.nombre}</strong>? <br />
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                </Modal.Footer>

            </Modal>
            </>
        ) : (
            <>
            
            <Modal show= { show} onHide={onHide} centered backdrop= "static" className="modal- xl">
                <Modal.Header style={{display:'flex', flexDirection:'column'}}>
                    <Modal.Title> {nombre} </Modal.Title>
                    <p style={{color:'red'}}>***Completar todos los campos o no se creará***</p>
                       <Modal.Body>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name="nombre"
                                        type="text"
                                        value={formik.values.nombre ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.nombre&&formik.touched.nombre)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.nombre}
                                    </Form.Control.Feedback >
                                </Form.Group>
                                <Form.Group controlId="formPrecio">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        name="precioCompra"
                                        type="text"
                                        value={formik.values.precioCompra ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean( formik.errors.precioCompra&&formik.touched.precioCompra)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.precioCompra}
                                    </Form.Control.Feedback >
                                </Form.Group>
                                <Form.Group controlId="formStockActual">
                                    <Form.Label>Stock Actual</Form.Label>
                                    <Form.Control
                                        name="stockActual"
                                        type="text"
                                        value={formik.values.stockActual ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockActual&&formik.touched.stockActual)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockActual}
                                    </Form.Control.Feedback >
                                </Form.Group>
                                <Form.Group controlId="formStockDeSeguridad">
                                    <Form.Label>Stock De Seguridad</Form.Label>
                                    <Form.Control
                                        name="stockDeSeguridad"
                                        type="text"
                                        value={formik.values.stockDeSeguridad ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockDeSeguridad&&formik.touched.stockDeSeguridad)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockDeSeguridad}
                                    </Form.Control.Feedback >
                                </Form.Group>
                                <Form.Group controlId="formLoteOptimo">
                                    <Form.Label>Lote Optimo</Form.Label>
                                    <Form.Control
                                        name="loteOptimo"
                                        type="text"
                                        value={formik.values.loteOptimo ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.loteOptimo && formik.touched.loteOptimo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.loteOptimo}
                                    </Form.Control.Feedback >
                                </Form.Group>
                                <Form.Group controlId="formCGIArticulo">
                                    <Form.Label>CGI Articulo</Form.Label>
                                    <Form.Control
                                        name="cgiArticulo"
                                        type="text"
                                        value={formik.values.cgiArticulo ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.cgiArticulo&&formik.touched.cgiArticulo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.cgiArticulo}
                                    </Form.Control.Feedback >
                                </Form.Group>

                                <Modal.Footer className="mt-4">
                                    <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                                    <Button variant="succes" type="submit" disabled={!formik.isValid}> Guardar </Button>
                                </Modal.Footer>

                            </Form>                    
                        </Modal.Body>
                </Modal.Header>
            </Modal>
            </>
        )}
        </>
    )



}

export default ArticuloModal
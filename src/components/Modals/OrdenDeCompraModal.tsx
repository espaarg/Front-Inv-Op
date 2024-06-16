import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
//Notificaciones al usuario
import { toast } from "react-toastify";
import { OrdenDeCompraService } from "../../services/OrdenDeCompraService";
import { OrdenDeCompra } from "../../types/OrdenDeCompra";

type OrdenDeCompraModalProps = {
    show:boolean;
    onHide: ()=> void;
    nombre: string;
    modalType: ModalType;
    ventaArticulo: OrdenDeCompra;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrdenDeCompraModal = ({show, onHide, nombre, modalType,ventaArticulo: articulo, refreshData}: OrdenDeCompraModalProps) => {

    //CREATE-ACTUALIZAR
    const handleSaveUpdate = async (articulo:OrdenDeCompra) => {
        try {
            const isNew = articulo.id ===0;
            if(isNew){
                await OrdenDeCompraService.createVenta(articulo);
            } else {
                await OrdenDeCompraService.updateVenta(articulo.id,articulo);
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
            await OrdenDeCompraService.deleteVenta(articulo.id);
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
        onSubmit:(obj: OrdenDeCompra) =>   handleSaveUpdate(obj)
            
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
                    <p>¿Está seguro de eliminar el articulo 
                    <strong>{articulo.id}</strong>? <br />
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
                                    <Form.Label>estadoOrdenDeCompra</Form.Label>
                                    <Form.Control
                                        name="estadoOrdenDeCompra"
                                        type="text"
                                        value={formik.values.totalCompra ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.estadoOrdenDeCompra&&formik.touched.estadoOrdenDeCompra)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.estadoOrdenDeCompra}
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

export default OrdenDeCompraModal
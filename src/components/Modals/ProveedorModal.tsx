import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
//Notificaciones al usuario
import { toast } from "react-toastify";
import { Proveedor } from "../../types/Proveedor";
import { ProveedorService } from "../../services/ProveedorService";

type ProveedorModalProps = {
    show:boolean;
    onHide: ()=> void;
    nombre: string;
    modalType: ModalType;
    ventaArticulo: Proveedor;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProveedorModal = ({show, onHide, nombre, modalType,ventaArticulo: proveedor, refreshData}: ProveedorModalProps) => {

    //CREATE-ACTUALIZAR
    const handleSaveUpdate = async (proveedor:Proveedor) => {
        try {
            const isNew = proveedor.id ===0;
            if(isNew){
                await ProveedorService.createVenta(proveedor);
            } else {
                await ProveedorService.updateVenta(proveedor.id,proveedor);
            }
            toast.success(isNew ? "Proveedor creado" : "Proveedor modificado", {position: "top-center"})
            onHide();
            refreshData(prevState=>!prevState)
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error")
        }
    };

    const handleDelete = async () => {
        try {
            await ProveedorService.deleteVenta(proveedor.id);
            toast.success("Proveedor eliminado" , {position:"top-center"})
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
            nombreProveedor: Yup.string().required('Nombre requerido'),
            diasDemora: Yup.number().min(0).required('Se requiere un precio'),
            
        })
    }

    //FORMULARIO formik, esquema de validacion dinamico para evaluar errores

    const formik = useFormik ({
        initialValues: proveedor,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit:(obj: Proveedor) =>   handleSaveUpdate(obj)
            
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
                    <p>¿Está seguro de eliminar el Proveedor 
                    <strong>{proveedor.nombreProveedor}</strong>? <br />
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
                                        name="nombreProveedor"
                                        type="text"
                                        value={formik.values.nombreProveedor ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.nombreProveedor&&formik.touched.nombreProveedor)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.nombreProveedor}
                                    </Form.Control.Feedback >
                                </Form.Group>
                                <Form.Group controlId="formPrecio">
                                    <Form.Label>Dias de demora</Form.Label>
                                    <Form.Control
                                        name="diasDemora"
                                        type="text"
                                        value={formik.values.diasDemora ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean( formik.errors.diasDemora&&formik.touched.diasDemora)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.diasDemora}
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

export default ProveedorModal
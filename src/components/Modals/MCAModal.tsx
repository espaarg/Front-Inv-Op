import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
//Notificaciones al usuario
import { toast } from "react-toastify";
import { ProveedorService } from "../../services/ProveedorService";
import { MCA } from "../../types/MCA";
import { MCAService } from "../../services/MCAService";

type MCAModalProps = {
    show:boolean;
    onHide: ()=> void;
    nombre: string;
    modalType: ModalType;
    ventaArticulo: MCA;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const MCAModal = ({show, onHide, nombre, modalType,ventaArticulo: mca, refreshData}: MCAModalProps) => {

    //CREATE-ACTUALIZAR
    const handleSaveUpdate = async (mca:MCA) => {
        try {
            const isNew = mca.id ===0;
            if(isNew){
            } else {
                await MCAService.updateVenta(mca.id,mca);
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
            await ProveedorService.deleteVenta(mca.id);
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
            valor: Yup.number().min(0).max(0.99),            
        })
    }

    //FORMULARIO formik, esquema de validacion dinamico para evaluar errores

    const formik = useFormik ({
        initialValues: mca,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit:(obj: MCA) =>   handleSaveUpdate(obj)
            
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
                    <strong>{mca.valor}</strong>? <br />
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
                       <Modal.Body>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Valor</Form.Label>
                                    <Form.Control
                                        name="valor"
                                        type="text"
                                        value={formik.values.valor ||''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.valor&&formik.touched.valor)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.valor}
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

export default MCAModal
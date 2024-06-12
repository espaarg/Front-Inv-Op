import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";

import { Venta } from "../../types/Venta";
import { VentaService } from "../../services/VentaService";
import { toast } from "react-toastify";
import VentaArticuloTable from "../Tables/VentaArticuloTable";

type VentaModalProps = {
    show:boolean;
    onHide: ()=> void;
    nombre: string;
    modalType: ModalType;
    venta: Venta;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const VentaModal = ({show, onHide, nombre, modalType,venta: venta, refreshData}: VentaModalProps) => {

    //CREATE-ACTUALIZAR
    const handleSaveUpdate = async (venta:Venta) => {
        try {
            const isNew = venta.id ===0;
            if(isNew){
                await VentaService.createVenta(venta);
            } else {
                await VentaService.updateVenta(venta.id,venta);
            }
            toast.success(isNew ? "Venta creada" : "Venta modificada", {position: "top-center"})
            onHide();
            refreshData(prevState=>!prevState)
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error")
        }
    };

    const handleDelete = async () => {
        try {
            await VentaService.deleteVenta(venta.id);
            toast.success("Venta eliminada" , {position:"top-center"})
            onHide();
            refreshData(prevState=>!prevState)
        }catch (error){
            console.error(error);
            toast.success("Ha ocurrido un error")
        }
    }


    /* //Esquema de validacion yup
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            nombre: Yup.string().required('Nombre requerido'),
            precioCompra: Yup.number().min(0).required('Se requiere un precio'),
            stockActual: Yup.number().min(0).required('Se requiere ingresar el stock actual de ese producto'),
            stockDeSeguridad: Yup.number().min(0),
            loteOptimo: Yup.number().min(0),
            cgiArticulo: Yup.number().min(0),
        })
    }

    //FORMULARIO formik, esquema de validacion dinamico para evaluar errores

    const formik = useFormik ({
        initialValues: venta,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit:(obj: Venta) => handleSaveUpdate(obj),
    }); */

    return (
        <>
        {modalType === ModalType.DELETE ?  (
            <>  
            <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Está seguro de eliminar la venta?
                    <strong>{venta.id}</strong>? <br />
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
                                
                                <VentaArticuloTable ventaID={venta.id} />
                                <Modal.Footer className="mt-4">
                                    <Button variant="secondary" onClick={onHide}> Volver </Button>
                                </Modal.Footer>
                        </Modal.Body>
                </Modal.Header>
            </Modal>
            </>
        )}
        </>
    )



}

export default VentaModal
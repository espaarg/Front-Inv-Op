import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
//Notificaciones al usuario
import { toast } from "react-toastify";
import { DemandaHistoricaService } from "../../services/DemandaHistoricaService";
import { DemandaHistorica } from "../../types/DemandaHistorica";
import { useState, useEffect } from "react";
import { ArticuloService } from "../../services/ArticuloService";
import { Articulo } from "../../types/Articulo";
import '../../styles/Modal.css'

type ArticuloModalProps = {
    show:boolean;
    onHide: ()=> void;
    nombre: string;
    modalType: ModalType;
    venta: DemandaHistorica;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const DemandaHistoricaModal = ({show, onHide, nombre, modalType,venta: articulo, refreshData}: ArticuloModalProps) => {

    //CREATE-ACTUALIZAR
    const handleSaveUpdate = async (articulo:DemandaHistorica) => {
        try {
            const isNew = articulo.id ===0;
            if(isNew){
                await DemandaHistoricaService.createVenta(articulo);
            } else {
                await DemandaHistoricaService.updateVenta(articulo.id,articulo);
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
            await DemandaHistoricaService.deleteVenta(articulo.id);
            toast.success("Articulo eliminado" , {position:"top-center"})
            onHide();
            refreshData(prevState=>!prevState)
        }catch (error){
            console.error(error);
            toast.success("Ha ocurrido un error")
        }
    }

    const[articulos, setArticulos] = useState<Articulo[]>([]);
    const [selectedArticuloId, setSelectedArticuloId] = useState<number | null>(null);


    //Actualiza la tabla cada vez que se produce un cambio
//Se ejecuta cada vez que se renderiza el componente o refreshData cambia de estado
    useEffect(()=> {
      const fetchArticulos = async ()=> {
        const articulos = await ArticuloService.getVentas();
        setArticulos(articulos);
  
      };
      fetchArticulos();
    }, [refreshData]
  );


    //Esquema de validacion yup
    // const validationSchema = () => {
    //     return Yup.object().shape({
    //         id: Yup.number().integer().min(0),
    //         nombre: Yup.string().required('Nombre requerido'),
    //         precioCompra: Yup.number().min(0).required('Se requiere un precio'),
    //         stockActual: Yup.number().min(0).required('Se requiere ingresar el stock actual de ese producto'),
    //         stockDeSeguridad: Yup.number().min(0),
    //         loteOptimo: Yup.number().min(0),
    //         cgiArticulo: Yup.number().min(0),
    //     })
    // }

    //FORMULARIO formik, esquema de validacion dinamico para evaluar errores

    // const formik = useFormik ({
    //     initialValues: articulo,
    //     validationSchema: validationSchema(),
    //     validateOnChange: true,
    //     validateOnBlur: true,
    //     onSubmit:(obj: DemandaHistorica) => handleSaveUpdate(obj),
    // });

    return (
        <>
        {modalType === ModalType.DELETE ?  (
            <>  
            <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Está seguro de eliminar la demanda con id: 
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
            
            <Modal show= { show} onHide={onHide} centered backdrop= "static" >
                <Modal.Header style={{display:'flex', flexDirection:'column'}}>
                    <Modal.Title> Crear demanda </Modal.Title>
                       <Modal.Body>
                            <Form >
                                <label >
                                    Selecciona un artículo:
                                    <select
                                        style={{borderRadius:'5px', borderWidth:'2px', padding:'5px'}}
                                        value={selectedArticuloId || ''}
                                        onChange={(e) => setSelectedArticuloId(Number(e.target.value))}
                                    >
                                        <option value="" disabled>Selecciona un artículo</option>
                                        {articulos.map((articulo) => (
                                            <option key={articulo.id} value={articulo.id}>
                                                {articulo.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                

                                <Modal.Footer className="mt-4">
                                    <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                                    <Button variant="succes" type="submit" > Guardar </Button>
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

export default DemandaHistoricaModal
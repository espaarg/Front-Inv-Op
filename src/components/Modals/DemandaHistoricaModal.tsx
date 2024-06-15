import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { toast } from "react-toastify";
import { DemandaHistoricaService } from "../../services/DemandaHistoricaService";
import { DemandaHistorica } from "../../types/DemandaHistorica";
import { useState, useEffect } from "react";
import { ArticuloService } from "../../services/ArticuloService";
import { Articulo } from "../../types/Articulo";
import '../../styles/Modal.css'
import DatePickerComponent from "../DatePicker/DatePickerComponent";

type ArticuloModalProps = {
    show: boolean;
    onHide: () => void;
    nombre: string;
    modalType: ModalType;
    venta: DemandaHistorica;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const DemandaHistoricaModal = ({ show, onHide, nombre, modalType, venta: articulo, refreshData }: ArticuloModalProps) => {

    const handleSaveUpdate = async () => {
        try {
            DemandaHistoricaService.createVenta(selectedArticuloId,dateStrIni,dateStrFin)
            
            onHide();
            setTimeout(() => {
                refreshData(prevState => !prevState);
            }, 1000);
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error")
        }
    };

    const handleDelete = async () => {
        try {
            await DemandaHistoricaService.deleteVenta(articulo.id);
            toast.success("Articulo eliminado", { position: "top-center" })
            onHide();
            refreshData(prevState => !prevState)
        } catch (error) {
            console.error(error);
            toast.success("Ha ocurrido un error")
        }
    }

    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [selectedArticuloId, setSelectedArticuloId] = useState<number>(1);

    useEffect(() => {
        const fetchArticulos = async () => {
            const articulos = await ArticuloService.getVentas();
            setArticulos(articulos);
        };
        fetchArticulos();
    }, [refreshData]);

    const [selectedDateInicio, setSelectedDateInicio] = useState<Date | null>(null);
    const [dateStrIni, setDateStringIni] = useState<string>("");

    const handleDateChangeInicio = (dateIni: Date | null) => {
        setSelectedDateInicio(dateIni);
        if (dateIni) {
            const dateStrFin = dateIni.toISOString().split('T')[0]; // Extraer la parte de la fecha
            setDateStringIni(dateStrFin);
        } else {
            setDateStringIni("null");
        }
    };

    const [selectedDateFin, setSelectedDateFin] = useState<Date | null>(null);
    const [dateStrFin, setDateStringFin] = useState<string >("");

    const handleDateChangeFin = (dateFin: Date | null) => {
        setSelectedDateFin(dateFin);
        if (dateFin) {
            const dateStrFin = dateFin.toISOString().split('T')[0]; // Extraer la parte de la fecha
            setDateStringFin(dateStrFin);
        } else {
            setDateStringFin("null");
        }
    };

    const isFormValid = selectedArticuloId !== null && selectedDateInicio !== null && selectedDateFin !== null && selectedDateInicio <= selectedDateFin;

    return (
        <>
            {modalType === ModalType.DELETE ? (
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
                    <Modal show={show} onHide={onHide} centered backdrop="static">
                        <Modal.Header>
                            <Modal.Title> Crear demanda </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <label>
                                    Selecciona un artículo:
                                    <select
                                        style={{ borderRadius: '5px', borderWidth: '2px', padding: '5px' }}
                                        value={selectedArticuloId}
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
                                <div>
                                <label style={{ marginTop: '20px', marginRight: '80px' }}>
                                    Selecciona la fecha de inicio:
                                    <DatePickerComponent selectedDate={selectedDateInicio} onDateChange={handleDateChangeInicio} />
                                </label>
                                <label style={{ marginTop: '20px' }}>
                                    Selecciona la fecha de fin:
                                    <DatePickerComponent selectedDate={selectedDateFin} onDateChange={handleDateChangeFin} />
                                </label>
                                </div>
                                
                                <Modal.Footer className="mt-4">
                                    <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                                    <Button variant="success" type="submit" onClick={() => handleSaveUpdate()} disabled={!isFormValid}> Guardar </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    );
};

export default DemandaHistoricaModal;

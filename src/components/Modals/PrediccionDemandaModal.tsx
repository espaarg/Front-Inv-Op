import { Button, Form, Modal } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import { useState, useEffect } from 'react';
import { ArticuloService } from '../../services/ArticuloService';
import { Articulo } from '../../types/Articulo';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import VentaArticuloTable from '../Tables/VentaArticuloTable';
import { PrediccionDemanda } from '../../types/PrediccionDemanda';
import { PrediccionDemandaService } from '../../services/PrediccionDemandaService';
import { Enum } from '../Enums/Enum';
import { EnumService } from '../../services/EnumService';
import DatePickerComponent2 from '../DatePicker/DatePickerComponent2';
import DatePickerComponent3 from '../DatePicker/DatePickerComponent3';

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

    //ARTICULO
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [articulosSeleccionados, setArticulosSeleccionados] = useState<{ articulo: Articulo}[]>([]);

const [selectedArticulo, setSelectedArticulo] = useState<Articulo | null>(null);

const handleArticuloChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const articuloId = event.target.value as string;
    const selected = articulos.find(articulo => articulo.id === Number(articuloId)) || null;
    setSelectedArticulo(selected);
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

    fetchArticulos();
}, [refreshData]);


//ENUMS

const [cantidadPeriodo, setCantidadPeriodo] = useState<string>('');
const [fijacionErrorAceptable, setFijacionErrorAceptable] = useState<string>('');
const [metodoCalculoError, setMetodoCalculoError] = useState<string>('');
const [metodoPrediccion, setMetodoPrediccion] = useState<string>('');

const [cantPer, setCantPer] = useState<Enum[]>([]);
const [fijError, setFijError] = useState<Enum[]>([]);
const [metCalc, setMetCalc] = useState<Enum[]>([]);
const [metPred, setMetPred] = useState<Enum[]>([]);

useEffect(() => {
    const fetchEnums = async () => {
        try {
            const cantPer = await EnumService.getCantPer();
            setCantPer(Array.isArray(cantPer) ? cantPer : []);

            const fijError = await EnumService.getFijError();
            setFijError(Array.isArray(fijError) ? fijError : []);

            const metCalc = await EnumService.getMetCalc();
            setMetCalc(Array.isArray(metCalc) ? metCalc : []);

            const metPred = await EnumService.getMetPred();
            setMetPred(Array.isArray(metPred) ? metPred : []);
        } catch (error) {
            console.error("Error fetching Enums: ", error);
        }
    };

    fetchEnums();
}, [refreshData]);

const handleCantidadPeriodoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const articuloId = event.target.value as string;
    setCantidadPeriodo(articuloId);
};

const handleFijErrorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const articuloId = event.target.value as string;
    setFijacionErrorAceptable(articuloId);
};

const handleMetodoPrediccionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const articuloId = event.target.value as string;
    setMetodoPrediccion(articuloId);
};

const handleMetCalcErrorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const articuloId = event.target.value as string;
    setMetodoCalculoError(articuloId);
};


const handleSaveUpdate = async () => {
    try {
        const prediccionDemanda = {
            articuloID: selectedArticulo?.id || 0,
            cantidadPeriodo: cantidadPeriodo,
            fijacionErrorAceptable: fijacionErrorAceptable,
            metodoPrediccion: metodoPrediccion,
            fechaInicio: "",
            fechaFin: "",
            metodoCalculoError:"",
            fechaPedido:"",
            articulo: "",
            id: 0,
            porcentajeDeError: 0,
            valorPrediccion: 0,
            error: 0,
            mesAPredecir: Number(selectedMonthFin),
            anioAPredecir: Number(selectedYearFin),

        };

        await PrediccionDemandaService.createPrediccion(prediccionDemanda);
        onHide();
        refreshData(prevState => !prevState);
        toast.success('Predicción creada con éxito', { position: 'top-center' });
    } catch (error) {
        console.error('Error al crear la predicción:', error);
        toast.error('Error al crear la predicción', { position: 'top-center' });
    }
};

    const handleGuardar = async () => {
        try {


            // Aquí puedes procesar los artículos seleccionados con sus cantidades
            // Por ejemplo, guardar en la base de datos, enviar a un servicio, etc.

            // Limpia la selección y oculta el modal
            
            // PrediccionDemandaService.createVenta(articulosSeleccionados);

            handleSaveUpdate();
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


    //SELECCION DE FECHAS
    const [selectedDateMonth, setSelectedDateMonth] = useState<Date | null>(null);
    const [dateStrIni, setDateStringIni] = useState<string>("");

    const handleDateChangeMonth = (dateIni: Date | null) => {
        setSelectedDateMonth(dateIni);
        if (dateIni) {
            const dateStrFin = dateIni.toISOString().split('T')[0]; // Extraer la parte de la fecha
            setDateStringIni(dateStrFin);
            const monthFin = (dateIni.getMonth() + 1).toString().padStart(2, '0'); // Extraer el mes y agregar un 0 si es necesario
            setSelectedMonthFin(monthFin);


        } else {
            setDateStringIni("null");
            setSelectedMonthFin("");

        }
    };

    const [selectedDateFin, setSelectedDateYear] = useState<Date | null>(null);
    const [dateStrFin, setDateStringYear] = useState<string >("");
    const [selectedYearFin, setSelectedYearFin] = useState<string>("");
    const [selectedMonthFin, setSelectedMonthFin] = useState<string>("");

    const handleDateChangeYear = (dateFin: Date | null) => {
        setSelectedDateYear(dateFin);
        if (dateFin) {
            const dateStrFin = dateFin.toISOString().split('T')[0]; // Extraer la parte de la fecha
            setDateStringYear(dateStrFin);
    
            const yearFin = dateFin.getFullYear().toString(); // Extraer el año
            
    
            setSelectedYearFin(yearFin);
        } else {
            setDateStringYear("null");
            setSelectedYearFin("");
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
        <Modal show={show} onHide={handleCancelar} centered className="l">
            <Modal.Header closeButton >
                <Modal.Title>{nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form>
                    <Form.Group controlId="formProveedorArticulo"
                    style={{marginBottom:'15px'}}>
                    <Form.Label>Artículo</Form.Label>
                    <Form.Control
                        as="select"
                        name="proveedorArticulo"
                        value={"a"}
                        onChange={(e) => {
                            handleArticuloChange(e);
                            
                        }}                            
                    >
                        <option value="">Selecciona un artículo</option>
                        {articulos.map(articulo => (
                            <option key={articulo.id} value={articulo.id.toString()}>
                                {articulo.nombre}
                            </option>
                        )
                        )}
                    </Form.Control>
                                
                    </Form.Group>
                    <div  style={{marginBottom:'15px'}}>
                        <label style={{ marginTop: '20px', marginRight: '80px' }}>
                            Selecciona el mes:
                            <DatePickerComponent3 selectedDate={selectedDateMonth} onDateChange={handleDateChangeMonth} />
                        </label>
                        <label style={{ marginTop: '20px' }}>
                            Selecciona el año:
                            <DatePickerComponent2 selectedDate={selectedDateFin} onDateChange={handleDateChangeYear} />
                        </label>
                    </div>

                    <Form.Group controlId="porcentajeDeError"  style={{marginBottom:'15px'}}>
                    <Form.Label>Cantidad de periodo</Form.Label>
                    <Form.Control
                        as="select"
                        name="cantidadPeriodo"
                        value={"a"}
                        onChange={(e) => {
                            handleCantidadPeriodoChange(e);
                            
                        }}                            
                    >
                        <option value="">Selecciona una Cantidad de Periodo</option>
                        {cantPer.map(articulo => (
                            <option key={articulo.nombre.toString()} value={articulo.nombre.toString()}>
                                {articulo.nombre}
                            </option>
                        )
                        )}
                    </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="porcentajeDeError"  style={{marginBottom:'15px'}}>
                    <Form.Label>Metodo de Prediccion</Form.Label>
                    <Form.Control
                        as="select"
                        name="metodoPrediccion"
                        value={"a"}
                        onChange={(e) => {
                            handleMetodoPrediccionChange(e);
                            
                        }}                            
                    >
                        <option value="">Selecciona un Metodo de Prediccion</option>
                        {metPred.map(articulo => (
                            <option key={articulo.nombre.toString()} value={articulo.nombre.toString()}>
                                {articulo.nombre}
                            </option>
                        )
                        )}
                    </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="porcentajeDeError"  style={{marginBottom:'15px'}}>
                    <Form.Label>Fijacion de Error Aceptable</Form.Label>
                    <Form.Control
                        as="select"
                        name="fijacionErrorAceptable"
                        value={"a"}
                        onChange={(e) => {
                            handleFijErrorChange(e);
                            
                        }}                            
                    >
                        <option value="">Selecciona una Fijacion de Error Aceptable</option>
                        {fijError.map(articulo => (
                            <option key={articulo.nombre.toString()} value={articulo.nombre.toString()}>
                                {articulo.nombre}
                            </option>
                        )
                        )}
                    </Form.Control>
                    </Form.Group>

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

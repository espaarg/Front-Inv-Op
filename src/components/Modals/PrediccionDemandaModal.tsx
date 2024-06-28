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

const [selectedArticulo, setSelectedArticulo] = useState<Articulo>();
const [selectedArticuloId, setSelectedArticuloId] = useState<string>('');


const [art, setArt] = useState<string>("");


const handleArticuloChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const articuloId = event.target.value as string;
    setSelectedArticuloId(event.target.value as string);
    const selected = articulos.find(articulo => articulo.id === Number(articuloId));
    const nombre = selected?.nombre||"Aber";
    setArt(nombre);
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

const [metodoPrediccion, setMetodoPrediccion] = useState<string>('');

const [cantPer, setCantPer] = useState<Enum[]>([]);
const [metPred, setMetPred] = useState<Enum[]>([]);

useEffect(() => {
    const fetchEnums = async () => {
        try {
            const cantPer = await EnumService.getCantPer();
            setCantPer(Array.isArray(cantPer) ? cantPer : []);
        
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



const handleMetodoPrediccionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const articuloId = event.target.value as string;
    setMetodoPrediccion(articuloId);
};



const handleSaveUpdate = async () => {
    try {
        const prediccionDemanda = {
            articuloID: selectedArticulo?.id || 0,
            cantidadPeriodo: cantidadPeriodo,
            fijacionErrorAceptable: 0,
            metodoPrediccion: metodoPrediccion,
            fechaInicio: "",
            fechaFin: "",
            fechaPedido:"",
            articulo: "",
            id: 0,
            porcentajeDeError: 0,
            valorPrediccion: 0,
            error: 0,
            mesAPredecir: Number(selectedMonthFin),
            anioAPredecir: Number(selectedYearFin),
            //PMP
            cantidadPeriodosAtrasPMP: cantidadPeriodosAtrasPMP,

            coeficientesPonderacion: coeficientesPonderacion,

            //PMSE
            alfa: alfa,

            //cantidadDePeriodosEST
            cantidadDePeriodosEST: cantidadDePeriodosEST,

            cantidadDeaniosAtrasEST: cantidadDeaniosAtrasEST,

            cantUnidadesEsperadasEST: cantUnidadesEsperadasEST,

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
            setDateStringYear(dateStrFin);
            const yearFin = dateIni.getFullYear().toString(); // Extraer el año
            setSelectedYearFin(yearFin);

            const monthFin = (dateIni.getMonth() + 1).toString().padStart(2, '0'); // Extraer el mes y agregar un 0 si es necesario
            setSelectedMonthFin(monthFin);
            


        } else {
            setDateStringIni("null");
            setSelectedMonthFin("");

        }
    };

    const [dateStrFin, setDateStringYear] = useState<string >("");
    const [selectedYearFin, setSelectedYearFin] = useState<string>("");
    const [selectedMonthFin, setSelectedMonthFin] = useState<string>("");

    //PARA EL RESTO DE ATRIBUTOS DE PREDICCIONES

    const [cantidadPeriodosAtrasPMP, setCantidadPeriodosAtrasPMP] = useState<number>(0);
    const [coeficientesPonderacion, setCoeficientesPonderacion] = useState<Array<number>>([]);
    const [alfa, setAlfa] = useState<number>(0);
    const [cantidadDePeriodosEST, setCantidadDePeriodosEST] = useState<number>(0);
    const [cantidadDeaniosAtrasEST, setCantidadDeaniosAtrasEST] = useState<number>(0);
    const [cantUnidadesEsperadasEST, setCantUnidadesEsperadasEST] = useState<number>(0);

    const [cantidadPeriodosAtrasPMPError, setCantidadPeriodosAtrasPMPError] = useState<string>('');
    const [coeficientesPonderacionError, setCoeficientesPonderacionError] = useState<string>('');
    const [alfaError, setAlfaError] = useState<string>('');
    const [cantidadDePeriodosESTError, setCantidadDePeriodosESTError] = useState<string>('');
    const [cantidadDeaniosAtrasESTError, setCantidadDeaniosAtrasESTError] = useState<string>('');
    const [cantUnidadesEsperadasESTError, setCantUnidadesEsperadasESTError] = useState<string>('');

    
    const handleCantidadPeriodosAtrasPMPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setCantidadPeriodosAtrasPMP(value);
            setCantidadPeriodosAtrasPMPError('');
        } else {
            setCantidadPeriodosAtrasPMPError('El valor debe ser 0 o mayor.');
        }
    };
    
    const handleCoeficientesPonderacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = e.target.value.split(',').map(Number);
        const allValid = values.every(val => val >= 0);
        if (allValid) {
            setCoeficientesPonderacion(values);
            setCoeficientesPonderacionError('');
        } else {
            setCoeficientesPonderacionError('Todos los valores deben ser 0 o mayores.');
        }
    };
    
    const handleAlfaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setAlfa(value);
            setAlfaError('');
        } else {
            setAlfaError('El valor debe ser 0 o mayor.');
        }
    };
    
    const handleCantidadDePeriodosESTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setCantidadDePeriodosEST(value);
            setCantidadDePeriodosESTError('');
        } else {
            setCantidadDePeriodosESTError('El valor debe ser 0 o mayor.');
        }
    };
    
    const handleCantidadDeaniosAtrasESTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setCantidadDeaniosAtrasEST(value);
            setCantidadDeaniosAtrasESTError('');
        } else {
            setCantidadDeaniosAtrasESTError('El valor debe ser 0 o mayor.');
        }
    };
    
    const handleCantUnidadesEsperadasESTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setCantUnidadesEsperadasEST(value);
            setCantUnidadesEsperadasESTError('');
        } else {
            setCantUnidadesEsperadasESTError('El valor debe ser 0 o mayor.');
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
        <Modal show={show} onHide={handleCancelar} centered className="l" style={{paddingTop:'200px'}} >
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
                        value={selectedArticuloId}
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
                    
                    <Form.Group controlId="porcentajeDeError"  style={{marginBottom:'15px'}}>
                    <Form.Label>Cantidad de periodo</Form.Label>
                    <Form.Control
                        as="select"
                        name="cantidadPeriodo"
                        value={cantidadPeriodo}
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

                    <div  style={{marginBottom:'15px'}}>
                        <label style={{ marginTop: '20px', marginRight: '80px' }}>
                            Selecciona el mes de inicio:
                            <DatePickerComponent3 selectedDate={selectedDateMonth} onDateChange={handleDateChangeMonth} />
                        </label>
                        
                    </div>

                    <Form.Group controlId="porcentajeDeError"  style={{marginBottom:'15px'}}>
                    <Form.Label>Metodo de Prediccion</Form.Label>
                    <Form.Control
                        as="select"
                        name="metodoPrediccion"
                        value={metodoPrediccion}
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

                    <Form.Group controlId="cantidadPeriodosAtrasPMP" style={{ marginBottom: '15px' }}>
                        <Form.Label>Cantidad de Periodos Atras PMP</Form.Label>
                        <Form.Control
                            type="number"
                            value={cantidadPeriodosAtrasPMP}
                            onChange={handleCantidadPeriodosAtrasPMPChange}
                            min="0"
                        />
                        {cantidadPeriodosAtrasPMPError && <Form.Text className="text-danger">{cantidadPeriodosAtrasPMPError}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="coeficientesPonderacion" style={{ marginBottom: '15px' }}>
                        <Form.Label>Coeficientes de Ponderación</Form.Label>
                        <Form.Control
                            type="text"
                            value={coeficientesPonderacion.join(',')}
                            onChange={handleCoeficientesPonderacionChange}
                            placeholder="Introduce valores separados por comas"
                        />
                        {coeficientesPonderacionError && <Form.Text className="text-danger">{coeficientesPonderacionError}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="alfa" style={{ marginBottom: '15px' }}>
                        <Form.Label>Alfa</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={alfa}
                            onChange={handleAlfaChange}
                            min="0"
                        />
                        {alfaError && <Form.Text className="text-danger">{alfaError}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="cantidadDePeriodosEST" style={{ marginBottom: '15px' }}>
                        <Form.Label>Cantidad de Periodos EST</Form.Label>
                        <Form.Control
                            type="number"
                            value={cantidadDePeriodosEST}
                            onChange={handleCantidadDePeriodosESTChange}
                            min="0"
                        />
                        {cantidadDePeriodosESTError && <Form.Text className="text-danger">{cantidadDePeriodosESTError}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="cantidadDeaniosAtrasEST" style={{ marginBottom: '15px' }}>
                        <Form.Label>Cantidad de Años Atras EST</Form.Label>
                        <Form.Control
                            type="number"
                            value={cantidadDeaniosAtrasEST}
                            onChange={handleCantidadDeaniosAtrasESTChange}
                            min="0"
                        />
                        {cantidadDeaniosAtrasESTError && <Form.Text className="text-danger">{cantidadDeaniosAtrasESTError}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="cantUnidadesEsperadasEST" style={{ marginBottom: '15px' }}>
                        <Form.Label>Cantidad de Unidades Esperadas EST</Form.Label>
                        <Form.Control
                            type="number"
                            value={cantUnidadesEsperadasEST}
                            onChange={handleCantUnidadesEsperadasESTChange}
                            min="0"
                        />
                        {cantUnidadesEsperadasESTError && <Form.Text className="text-danger">{cantUnidadesEsperadasESTError}</Form.Text>}
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

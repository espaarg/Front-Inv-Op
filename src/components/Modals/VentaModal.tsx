import { Button, Form, Modal, ModalDialog, Table } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import { Venta } from '../../types/Venta';
import { useState, useEffect } from 'react';
import { ArticuloService } from '../../services/ArticuloService';
import { Articulo } from '../../types/Articulo';
import 'react-toastify/dist/ReactToastify.css';
import { VentaService } from '../../services/VentaService';
import { toast } from 'react-toastify';
import VentaArticuloTable from '../Tables/VentaArticuloTable';

type VentaModalProps = {
    show: boolean;
    onHide: () => void;
    nombre: string;
    modalType: ModalType;
    venta: Venta;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const VentaModal = ({
    show,
    onHide,
    nombre,
    modalType,
    venta,
    refreshData,
}: VentaModalProps) => {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [articulosSeleccionados, setArticulosSeleccionados] = useState<{ articulo: Articulo, cantidad: number, invalid: boolean }[]>([]);

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
    }, []);

    const handleGuardar = async () => {
        try {
            // Validar que todas las cantidades sean válidas (mayores que cero y dentro del stock)
            const cantidadesValidas = articulosSeleccionados.every(as => as.cantidad > 0 && as.cantidad <= as.articulo.stockActual);
            if (!cantidadesValidas) {
                alert('Por favor, ingrese una cantidad válida para cada artículo seleccionado.');
                return;
            }

            // Aquí puedes procesar los artículos seleccionados con sus cantidades
            // Por ejemplo, guardar en la base de datos, enviar a un servicio, etc.

            // Limpia la selección y oculta el modal
            
            VentaService.createVenta(articulosSeleccionados);
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

    const handleCantidadChange = (articuloId: number, nuevaCantidad: number) => {
        setArticulosSeleccionados(prevArticulos =>
            prevArticulos.map(as =>
                as.articulo.id === articuloId ? { ...as, cantidad: nuevaCantidad, invalid: nuevaCantidad < 0 || nuevaCantidad > as.articulo.stockActual } : as
            )
        );
    };

    const handleArticuloSelect = (articulo: Articulo) => {
        // Verificar si el artículo ya está seleccionado
        const articuloExistente = articulosSeleccionados.find(as => as.articulo.id === articulo.id);

        if (articuloExistente) {
            // Si ya está seleccionado, deseleccionar
            setArticulosSeleccionados(prevArticulos =>
                prevArticulos.filter(as => as.articulo.id !== articulo.id)
            );
        } else {
            // Si no está seleccionado, agregarlo con una cantidad inicial (puedes ajustar esto según tus necesidades)
            setArticulosSeleccionados(prevArticulos => [
                ...prevArticulos,
                { articulo: articulo, cantidad: 1, invalid: false } // Cantidad inicial y estado de validez inicial
            ]);
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
        <Modal show={show} onHide={handleCancelar} centered className="l" style={{paddingTop:'400px'}}>
            <Modal.Header closeButton >
                <Modal.Title>{nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Seleccionar</th>
                                    <th>Nombre Artículo</th>
                                    <th>Stock Actual</th>
                                    <th>Cantidad a Vender</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articulos.map(articulo => (
                                    <tr key={articulo.id}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                onChange={() => handleArticuloSelect(articulo)}
                                                checked={!!articulosSeleccionados.find(as => as.articulo.id === articulo.id)}
                                            />
                                        </td>
                                        <td>{articulo.nombre}</td>
                                        <td>{articulo.stockActual}</td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                min={0}
                                                max={articulo.stockActual}
                                                value={articulosSeleccionados.find(as => as.articulo.id === articulo.id)?.cantidad || ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const cantidad = Number(e.target.value);
                                                    handleCantidadChange(articulo.id, cantidad); // Llama a handleCantidadChange con el valor
                                                }}
                                                isInvalid={!!articulosSeleccionados.find(as => as.articulo.id === articulo.id)?.invalid} // Usa el estado de validez
                                                disabled={!articulosSeleccionados.find(as => as.articulo.id === articulo.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
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

export default VentaModal;

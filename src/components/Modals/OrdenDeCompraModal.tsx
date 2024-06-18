import { Button, Form, Modal } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { OrdenDeCompraService } from '../../services/OrdenDeCompraService';
import { OrdenDeCompra } from '../../types/OrdenDeCompra';

type OrdenDeCompraModalProps = {
    show: boolean;
    onHide: () => void;
    nombre: string;
    modalType: ModalType;
    ventaArticulo: OrdenDeCompra;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrdenDeCompraModal = ({
    show,
    onHide,
    nombre,
    modalType,
    ventaArticulo: articulo,
    refreshData,
}: OrdenDeCompraModalProps) => {
    const handleSaveUpdate = async (articulo: OrdenDeCompra) => {
        try {
            const isNew = articulo.id === 0;
            if (isNew) {
                await OrdenDeCompraService.createVenta(articulo);
            } else {
                await OrdenDeCompraService.updateVenta(articulo.id, articulo);
            }
            toast.success(isNew ? 'Articulo creado' : 'Articulo modificado', { position: 'top-center' });
            onHide();
            refreshData((prevState) => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        }
    };

    const handleDelete = async () => {
        try {
            await OrdenDeCompraService.deleteVenta(articulo.id);
            toast.success('Articulo eliminado', { position: 'top-center' });
            onHide();
            refreshData((prevState) => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        }
    };

    const validationSchema = () => {
        return Yup.object().shape({
            estadoOrdenDeCompra: Yup.string().required('Estado de orden de compra requerido'),
        });
    };

    const formik = useFormik({
        initialValues: articulo,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: OrdenDeCompra) => handleSaveUpdate(obj),
    });

    return (
        <>
            {modalType === ModalType.DELETE ? (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title>{nombre}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                ¿Está seguro de eliminar el articulo <strong>{articulo.id}</strong>? <br />
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title>{nombre}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group controlId="formEstadoOrdenDeCompra">
                                    <Form.Label>Estado de orden de compra</Form.Label>
                                    <Form.Control
                                        name="estadoOrdenDeCompra"
                                        type="text"
                                        value={formik.values.estadoOrdenDeCompra || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(
                                            formik.errors.estadoOrdenDeCompra && formik.touched.estadoOrdenDeCompra
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.estadoOrdenDeCompra}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={onHide}>
                                        Cancelar
                                    </Button>
                                    <Button variant="success" type="submit" disabled={!formik.isValid}>
                                        Guardar
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    );
};

export default OrdenDeCompraModal;

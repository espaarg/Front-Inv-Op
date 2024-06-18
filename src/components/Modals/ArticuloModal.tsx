import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Articulo } from '../../types/Articulo';
import { ModalType } from '../../types/ModalType';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ArticuloService } from '../../services/ArticuloService';
import { toast } from 'react-toastify';

type ArticuloModalProps = {
    show: boolean;
    onHide: () => void;
    nombre: string;
    modalType: ModalType;
    ventaArticulo: Articulo;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArticuloModal = ({
    show,
    onHide,
    nombre,
    modalType,
    ventaArticulo: articulo,
    refreshData,
}: ArticuloModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Esquema de validación Yup
    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('Nombre requerido'),
        precioCompra: Yup.number().min(0, 'El precio debe ser mayor o igual a cero').required('Precio requerido'),
        stockActual: Yup.number().min(0, 'El stock actual debe ser mayor o igual a cero').required('Stock actual requerido'),
        stockDeSeguridad: Yup.number().min(0, 'El stock de seguridad debe ser mayor o igual a cero').required('Stock de seguridad requerido'),
        loteOptimo: Yup.number().min(0, 'El lote óptimo debe ser mayor o igual a cero').required('Lote óptimo requerido'),
        cgiArticulo: Yup.number().min(0, 'El CGI de Articulo debe ser mayor o igual a cero').required('CGI de Articulo requerido'),
    });

    // Manejo del formulario con Formik
    const formik = useFormik({
        initialValues: articulo,
        validationSchema: validationSchema,
        onSubmit: async (values: Articulo) => {
            try {
                setIsSubmitting(true);

                const isNew = values.id === 0;
                if (isNew) {
                    await ArticuloService.createVenta(values);
                } else {
                    await ArticuloService.updateVenta(values.id, values);
                }

                toast.success(isNew ? 'Articulo creado' : 'Articulo modificado', { position: 'top-center' });
                onHide();
                refreshData(prevState => !prevState);
            } catch (error) {
                console.error(error);
                toast.error('Ha ocurrido un error');
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            type="text"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.nombre && !!formik.errors.nombre}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.nombre}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPrecio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            name="precioCompra"
                            type="text"
                            value={formik.values.precioCompra}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.precioCompra && !!formik.errors.precioCompra}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.precioCompra}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formStockActual">
                        <Form.Label>Stock Actual</Form.Label>
                        <Form.Control
                            name="stockActual"
                            type="text"
                            value={formik.values.stockActual}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.stockActual && !!formik.errors.stockActual}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.stockActual}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formStockDeSeguridad">
                        <Form.Label>Stock De Seguridad</Form.Label>
                        <Form.Control
                            name="stockDeSeguridad"
                            type="text"
                            value={formik.values.stockDeSeguridad}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.stockDeSeguridad && !!formik.errors.stockDeSeguridad}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.stockDeSeguridad}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formLoteOptimo">
                        <Form.Label>Lote Optimo</Form.Label>
                        <Form.Control
                            name="loteOptimo"
                            type="text"
                            value={formik.values.loteOptimo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.loteOptimo && !!formik.errors.loteOptimo}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.loteOptimo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCGIArticulo">
                        <Form.Label>CGI Articulo</Form.Label>
                        <Form.Control
                            name="cgiArticulo"
                            type="text"
                            value={formik.values.cgiArticulo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.cgiArticulo && !!formik.errors.cgiArticulo}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.cgiArticulo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Cancelar
                        </Button>
                        <Button
                            variant="success"
                            type="submit"
                            disabled={!formik.isValid || isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ArticuloModal;

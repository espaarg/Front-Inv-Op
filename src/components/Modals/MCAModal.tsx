import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { ProveedorService } from '../../services/ProveedorService';
import { MCA } from '../../types/MCA';
import { MCAService } from '../../services/MCAService';
import { ModalType } from '../../types/ModalType';

type MCAModalProps = {
    show: boolean;
    onHide: () => void;
    nombre: string;
    modalType: ModalType;
    ventaArticulo: MCA;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const MCAModal = ({ show, onHide, nombre, modalType, ventaArticulo: mca, refreshData }: MCAModalProps) => {
    // Función para guardar o actualizar
    const handleSaveUpdate = async (mca: MCA) => {
        try {
            const isNew = mca.id === 0;
            if (isNew) {
                // Lógica para crear nuevo
            } else {
                await MCAService.updateVenta(mca.id, mca);
                refreshData(prevState => !prevState);
            }
            toast.success(isNew ? 'Proveedor creado' : 'Proveedor modificado', { position: 'top-center' });
            onHide();
            refreshData(prevState => !prevState); // Actualizar componente
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        }
    };

    // Función para eliminar
    const handleDelete = async () => {
        try {
            await ProveedorService.deleteVenta(mca.id);
            toast.success('Proveedor eliminado', { position: 'top-center' });
            onHide();
            refreshData(prevState => !prevState); // Actualizar componente
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        }
    };

    // Esquema de validación Yup
    const validationSchema = () => {
        return Yup.object().shape({
            valor: Yup.number().min(0).max(0.99).required('El valor es requerido'),
        });
    };

    // Configuración de Formik para el formulario
    const formik = useFormik({
        initialValues: mca,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values: MCA) => {
            handleSaveUpdate(values);
        },
    });

    return (
        <>
            {modalType === ModalType.DELETE ? (
                <Modal show={show} onHide={onHide} centered backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>{nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            ¿Está seguro de eliminar el Proveedor <strong>{mca.valor}</strong>? <br />
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
            ) : (
                <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                    <Modal.Header>
                        <Modal.Title>{nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control
                                    name="valor"
                                    type="text"
                                    value={formik.values.valor || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.valor && formik.touched.valor)}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.valor}</Form.Control.Feedback>
                            </Form.Group>

                            <Modal.Footer className="mt-4">
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
            )}
        </>
    );
};

export default MCAModal;

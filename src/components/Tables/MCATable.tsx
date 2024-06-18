import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import { MCA } from '../../types/MCA';
import { MCAService } from '../../services/MCAService';
import MCAModal from '../Modals/MCAModal';

const MCATable = () => {
    const [mcas, setMCAs] = useState<MCA[]>([]);
    const [refreshData, setRefreshData] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [selectedMCA, setSelectedMCA] = useState<MCA | null>(null);

    useEffect(() => {
        const fetchMCAs = async () => {
            try {
                const mcasData = await MCAService.getVentas();
                setMCAs(mcasData);
            } catch (error) {
                console.error('Error fetching MCAs:', error);
            }
        };
        fetchMCAs();
    }, [refreshData]);

    const handleEditClick = (mca: MCA) => {
        setSelectedMCA(mca);
        setModalType(ModalType.UPDATE);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMCA(null);
        setRefreshData(prev => !prev); // Refresh data after modal closes
    };

    return (
        <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-12 g-12">
                {mcas.map(mca => (
                    <div key={mca.id} className="col mb-4 d-flex justify-content-center">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body className="text-center">
                                <Card.Title style={{ fontSize: '1.5rem' }}>Valor: {mca.valor}</Card.Title>
                                <Button
                                    variant="primary"
                                    style={{ width: '100%' }}
                                    onClick={() => handleEditClick(mca)}
                                >
                                    Editar
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {showModal && selectedMCA && (
                <MCAModal
                    show={showModal}
                    onHide={handleCloseModal}
                    modalType={modalType}
                    ventaArticulo={selectedMCA}
                    refreshData={setRefreshData}
                    nombre=""
                />
            )}
        </div>
    );
};

export default MCATable;

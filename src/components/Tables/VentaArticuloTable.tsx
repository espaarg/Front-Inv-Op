import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { VentaArticulo } from '../../types/VentaArticulo';
import { VentaArticuloService } from '../../services/VentaArticuloService';
import { Button } from 'react-bootstrap';

function VentaArticuloTable({ ventaID }: { ventaID: number }) {
    const [ventaArticulos, setVentaArticulos] = useState<VentaArticulo[]>([]);

    useEffect(() => {
        const fetchVentaArticulos = async () => {
            const ventaArticulos = await VentaArticuloService.getVentaArticulo(ventaID);
            setVentaArticulos(ventaArticulos);
        };
        fetchVentaArticulos();
    }, [ventaID]);

    console.log(JSON.stringify(ventaArticulos, null, 2));






    return (
        <>
            
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px', backgroundColor:'gainsboro', borderRadius:'10px', padding:'10px' }}>
                <Table striped bordered hover style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderCollapse: 'separate', borderSpacing: '0 15px' }}>
                    <thead style={{ backgroundColor: '#343a40', color: '#fff' }}>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>SubTotal</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventaArticulos.map(ventaArticulo => (
                            <tr key={ventaArticulo.id} style={{ backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.01)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
                                <td style={{ padding: '15px', borderTop: 'none', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>{ventaArticulo.id}</td>
                                <td style={{ padding: '15px', borderTop: 'none' }}>{ventaArticulo.nombreArticulo}</td>
                                <td style={{ padding: '15px', borderTop: 'none' }}>{ventaArticulo.subTotal}</td>
                                <td style={{ padding: '15px', borderTop: 'none', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>{ventaArticulo.cantidadArticulo}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default VentaArticuloTable;

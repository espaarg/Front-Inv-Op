import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import DeleteButton from '../DeleteButton.tsx/DeleteButton';
import VentaModal from '../Modals/VentaModal';
import { VentaService } from '../../services/VentaService';
import { Venta } from '../../types/Venta';
import DetalleButton from '../DetalleButton.tsx/DetalleButton';




function VentaTable() {

    const[ventas, setVentas] = useState<Venta[]>([]);

        //Actualiza la tabla cada vez que se produce un cambio
const[refreshData, setRefreshData] = useState (false);

//Se ejecuta cada vez que se renderiza el componente o refreshData cambia de estado
    useEffect(()=> {
      const fetchVentas = async ()=> {
        const ventas = await VentaService.getVentas();
        setVentas(ventas);
  
      };
      fetchVentas();
    }, [refreshData]
  );

  console.log(JSON.stringify(ventas,null,2));

  const initializableNewVenta = (): Venta => {

    return {
      id:0,
      detalle:"",
      montoTotal:0,
      fechaVenta: ""
    };
  
  };
  
  //articulo seleccionado que se va a pasar como prop al Modal
  const [venta, setVenta] = useState<Venta>(initializableNewVenta);
  
  //const para manejar el estado del modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [nombre, setNombre] = useState("");
  
  //Logica del modal
  const handleClick = (newNombre: string, venta: Venta, modal: ModalType ) => {
    setNombre(newNombre);
    setModalType(modal);
    setVenta(venta);
    setShowModal(true);
  }
  

  return (
    <>
    <div style={{display:'flex', justifyContent:'end'}}>      
      <Button onClick={() => handleClick("Nuevo articulo", initializableNewVenta(),ModalType.CREATE)} style={{width:'150px', margin:'20px'}}>Añadir venta</Button>
    </div>
      <div style={{display:'flex',justifyContent:'center', margin:'20px'}}>
      <Table style={{ width:'100%'}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock Actual</th>
          <th>Ver Detalle</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map(venta=> (
          <tr key = {venta.id}>
              <td>{venta.id}</td>
              <td>{venta.detalle}</td>
              <td>{venta.montoTotal}</td>
              <td>{venta.fechaVenta}</td>
              <td><DetalleButton onClick={()=> handleClick("Editar venta", venta, ModalType.UPDATE)}></DetalleButton></td>
              <td><DeleteButton onClick={()=> handleClick("Eliminar venta", venta, ModalType.DELETE)}></DeleteButton></td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

        {showModal&&(
          <VentaModal
          show={showModal}
          onHide={()=>setShowModal(false)}
          nombre={nombre}
          modalType={modalType}
          venta={venta}
          refreshData={setRefreshData}
          />
        )}

    </>
  );
}

export default VentaTable;
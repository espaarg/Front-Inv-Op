import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import DeleteButton from '../DeleteButton/DeleteButton';
import { DemandaHistoricaService } from '../../services/DemandaHistoricaService';
import { DemandaHistorica } from '../../types/DemandaHistorica';
import DemandaHistoricaModal from '../Modals/DemandaHistoricaModal';




function DemandaHistoricaTable() {

  const[ventaID, setVentaID] = useState<Number>(0);

    const[ventas, setVentas] = useState<DemandaHistorica[]>([]);

        //Actualiza la tabla cada vez que se produce un cambio
const[refreshData, setRefreshData] = useState (false);

//Se ejecuta cada vez que se renderiza el componente o refreshData cambia de estado
    useEffect(()=> {
      const fetchVentas = async ()=> {
        const ventas = await DemandaHistoricaService.getDemandaHistorica();
        setVentas(ventas);
  
      };
      fetchVentas();
    }, [refreshData]
  );

  console.log(JSON.stringify(ventas,null,2));

  const initializableNewVenta = (): DemandaHistorica => {

    return {
        id:0,
        nombreArticulo:"",
        fechaInicio:"",
        fechaFin: "",
        cantidadVendida:0,
        id_articulo:0,
    };
  
  };
  
  //articulo seleccionado que se va a pasar como prop al Modal
  const [venta, setVenta] = useState<DemandaHistorica>(initializableNewVenta);
  
  //const para manejar el estado del modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [nombre, setNombre] = useState("");
  
  //Logica del modal
  const handleClick = (newNombre: string, venta: DemandaHistorica, modal: ModalType, ventaID: Number) => {
    setNombre(newNombre);
    setModalType(modal);
    setVenta(venta);
    setShowModal(true);
    setVentaID(ventaID);
  }
  

  return (
    <>
    <div style={{display:'flex', justifyContent:'end'}}>      
      <Button onClick={() => handleClick("Nuevo articulo", initializableNewVenta(),ModalType.CREATE, ventaID)} style={{width:'auto', margin:'20px'}}>Generar demanda historica</Button>
    </div>
      <div style={{display:'flex',justifyContent:'center', margin:'20px'}}>
      <Table style={{ width:'100%'}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Articulo</th>
          <th>Fecha Inicio Periodo</th>
          <th>Fecha Fin Periodo</th>
          <th>Cantidad demandada</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map(venta=> (
          <tr key = {venta.id}>
              <td>{venta.id}</td>
              <td>{venta.nombreArticulo}</td>
              <td>{venta.fechaInicio}</td>
              <td>{venta.fechaFin}</td>
              <td>{venta.cantidadVendida}</td>
              <td><DeleteButton onClick={()=> handleClick("Eliminar venta", venta, ModalType.DELETE, ventaID)}></DeleteButton></td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

    {showModal&&(
          <DemandaHistoricaModal
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

export default DemandaHistoricaTable;
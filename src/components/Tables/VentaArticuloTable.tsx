import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { VentaArticulo } from '../../types/VentaArticulo';
import { VentaArticuloService } from '../../services/VentaArticuloService';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';



function VentaArticuloTable({ ventaID}: {ventaID: number}) {

    const[ventaArticulos, setVentaArticulos] = useState<VentaArticulo[]>([]);

    //Actualiza la tabla cada vez que se produce un cambio
const[refreshData, setRefreshData] = useState (false);

//Se ejecuta cada vez que se renderiza el componente o refreshData cambia de estado
    useEffect(()=> {
      const fetchVentaArticulos = async ()=> {
        const ventaArticulos = await VentaArticuloService.getVentaArticulo(ventaID);
        setVentaArticulos(ventaArticulos);
  
      };
      fetchVentaArticulos();
    }, [ventaID]
  );

  console.log(JSON.stringify(ventaArticulos,null,2));

  const initializableNewVentaArticulo = (): VentaArticulo => {

    return {
      id:0,
      nombreArticulo:"",
      subTotal:0,
      cantidadArticulo:0,
    };
  
  };
  
  //articulo seleccionado que se va a pasar como prop al Modal
  const [VentaArticulo, setVentaArticulo] = useState<VentaArticulo>(initializableNewVentaArticulo);
  
  //const para manejar el estado del modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [nombre, setNombre] = useState("");
  
  //Logica del modal
  const handleClick = (newNombre: string, VentaArticulo: VentaArticulo, modal: ModalType ) => {
    setNombre(newNombre);
    setModalType(modal);
    setVentaArticulo(VentaArticulo);
    setShowModal(true);
  }
  

  return (
    <>
    <div style={{display:'flex', justifyContent:'end'}}>      
    </div>
      <div style={{display:'flex',justifyContent:'center', margin:'20px'}}>
      <Table style={{ width:'100%'}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>SubTotal</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {ventaArticulos.map(ventaArticulo=> (
          <tr key = {ventaArticulo.id}>
              <td>{ventaArticulo.id}</td>
              <td>{ventaArticulo.nombreArticulo}</td>
              <td>{ventaArticulo.subTotal}</td>
              <td>{ventaArticulo.cantidadArticulo}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

    </>
  );
}

export default VentaArticuloTable;
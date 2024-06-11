import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { VentaArticulo } from '../../types/VentaArticulo';
import { VentaArticuloService } from '../../services/VentaArticuloService';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';





function VentaArticuloTable() {

    const[ventaArticulos, setVentaArticulos] = useState<VentaArticulo[]>([]);

    //Actualiza la tabla cada vez que se produce un cambio
const[refreshData, setRefreshData] = useState (false);

//Se ejecuta cada vez que se renderiza el componente o refreshData cambia de estado
    useEffect(()=> {
      const fetchVentaArticulos = async ()=> {
        const ventaArticulos = await VentaArticuloService.getVentas();
        setVentaArticulos(ventaArticulos);
  
      };
      fetchVentaArticulos();
    }, [refreshData]
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
      <Button onClick={() => handleClick("Nuevo articulo", initializableNewVentaArticulo(),ModalType.CREATE)} style={{width:'150px', margin:'20px'}}>Añadir articulo</Button>
    </div>
      <div style={{display:'flex',justifyContent:'center', margin:'20px'}}>
      <Table style={{ width:'100%'}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock Actual</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {ventaArticulos.map(VentaArticulo=> (
          <tr key = {VentaArticulo.id}>
              <td>{VentaArticulo.id}</td>
              <td>{VentaArticulo.nombreArticulo}</td>
              <td>{VentaArticulo.subTotal}</td>
              <td>{VentaArticulo.cantidadArticulo}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

    </>
  );
}

export default VentaArticuloTable;
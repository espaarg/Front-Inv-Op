import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { OrdenDeCompra } from '../../types/OrdenDeCompra';
import { OrdenDeCompraService } from '../../services/OrdenDeCompraService';
import OrdenDeCompraModal from '../Modals/OrdenDeCompraModal';




function OrdenDeCompraTable() {

    const[articulos, setArticulos] = useState<OrdenDeCompra[]>([]);

    //Actualiza la tabla cada vez que se produce un cambio
const[refreshData, setRefreshData] = useState (false);

//Se ejecuta cada vez que se renderiza el componente o refreshData cambia de estado
    useEffect(()=> {
      const fetchArticulos = async ()=> {
        const articulos = await OrdenDeCompraService.getVentas();
        setArticulos(articulos);
  
      };
      fetchArticulos();
    }, [refreshData]
  );

  console.log(JSON.stringify(articulos,null,2));

  const initializableNewArticulo = (): OrdenDeCompra => {

    return {
      id:0,
      totalCompra:0,
      totalArticulos:0,
      fechaPedido:"",
      estadoOrdenDeCompra:"",
      proveedorArticulo:"",
    };
  
  };
  
  //articulo seleccionado que se va a pasar como prop al Modal
  const [articulo, setArticulo] = useState<OrdenDeCompra>(initializableNewArticulo);
  
  //const para manejar el estado del modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [nombre, setNombre] = useState("");
  
  //Logica del modal
  const handleClick = (newNombre: string, articulo: OrdenDeCompra, modal: ModalType ) => {
    setNombre(newNombre);
    setModalType(modal);
    setArticulo(articulo);
    setShowModal(true);
  }
  

  return (
    <>
    <div style={{display:'flex', justifyContent:'end'}}>      
      <Button onClick={() => handleClick("Nuevo articulo", initializableNewArticulo(),ModalType.CREATE)} style={{width:'150px', margin:'20px'}}>Añadir articulo</Button>
    </div>
      <div style={{display:'flex',justifyContent:'center', margin:'20px'}}>
      <Table style={{ width:'100%'}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Monto Total</th>
          <th>Cantidad de articulos</th>
          <th>Fecha de pedido</th>
          <th>Estado</th>
          <th>Proveedor</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map(articulo=> (
          <tr key = {articulo.id}>
              <td>{articulo.id}</td>
              <td>{articulo.totalCompra}</td>
              <td>{articulo.totalArticulos}</td>
              <td>{articulo.fechaPedido}</td>
              <td>{articulo.estadoOrdenDeCompra}</td>
              <td>{articulo.proveedorArticulo}</td>

              <td><EditButton onClick={()=> handleClick("Editar articulo", articulo, ModalType.UPDATE)}></EditButton></td>
              <td><DeleteButton onClick={()=> handleClick("Eliminar articulo", articulo, ModalType.DELETE)}></DeleteButton></td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

        {showModal&&(
          <OrdenDeCompraModal
          show={showModal}
          onHide={()=>setShowModal(false)}
          nombre={nombre}
          modalType={modalType}
          ventaArticulo={articulo}
          refreshData={setRefreshData}
          />
        )}

    </>
  );
}

export default OrdenDeCompraTable;
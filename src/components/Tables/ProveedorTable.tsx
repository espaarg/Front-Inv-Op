import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { Proveedor } from '../../types/Proveedor';
import { ProveedorService } from '../../services/ProveedorService';
import ProveedorModal from '../Modals/ProveedorModal';


function ProveedorTable() {

    const[proveedores, setArticulos] = useState<Proveedor[]>([]);

    //Actualiza la tabla cada vez que se produce un cambio
const[refreshData, setRefreshData] = useState (false);

//Se ejecuta cada vez que se renderiza el componente o refreshData cambia de estado
    useEffect(()=> {
      const fetchArticulos = async ()=> {
        const articulos = await ProveedorService.getVentas();
        setArticulos(articulos);
  
      };
      fetchArticulos();
    }, [refreshData]
  );

  console.log(JSON.stringify(proveedores,null,2));

  const initializableNewArticulo = (): Proveedor => {

    return {
      id:0,
      nombreProveedor:"",
      diasDemora:0,
    };
  
  };
  
  //articulo seleccionado que se va a pasar como prop al Modal
  const [articulo, setArticulo] = useState<Proveedor>(initializableNewArticulo);
  
  //const para manejar el estado del modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [nombre, setNombre] = useState("");
  
  //Logica del modal
  const handleClick = (newNombre: string, articulo: Proveedor, modal: ModalType ) => {
    setNombre(newNombre);
    setModalType(modal);
    setArticulo(articulo);
    setShowModal(true);
  }
  

  return (
    <>
    <div style={{display:'flex', justifyContent:'end'}}>      
      <Button onClick={() => handleClick("Nuevo articulo", initializableNewArticulo(),ModalType.CREATE)} style={{width:'150px', margin:'20px'}}>Añadir proveedor</Button>
    </div>
      <div style={{display:'flex',justifyContent:'center', margin:'20px'}}>
      <Table style={{ width:'100%'}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Dias de demora</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.map(articulo=> (
          <tr key = {articulo.id}>
              <td>{articulo.id}</td>
              <td>{articulo.nombreProveedor}</td>
              <td>{articulo.diasDemora}</td>

              <td><EditButton onClick={()=> handleClick("Editar articulo", articulo, ModalType.UPDATE)}></EditButton></td>
              <td><DeleteButton onClick={()=> handleClick("Eliminar articulo", articulo, ModalType.DELETE)}></DeleteButton></td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

        {showModal&&(
          <ProveedorModal
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

export default ProveedorTable;
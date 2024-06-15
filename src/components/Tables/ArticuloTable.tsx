import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Articulo } from '../../types/Articulo';
import { ArticuloService } from '../../services/ArticuloService';
import { ModalType } from '../../types/ModalType';
import { Button } from 'react-bootstrap';
import ArticuloModal from '../Modals/ArticuloModal';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';




function ArticuloTable() {

    const[articulos, setArticulos] = useState<Articulo[]>([]);

    //Actualiza la tabla cada vez que se produce un cambio
const[refreshData, setRefreshData] = useState (false);

//Se ejecuta cada vez que se renderiza el componente o refreshData cambia de estado
    useEffect(()=> {
      const fetchArticulos = async ()=> {
        const articulos = await ArticuloService.getVentas();
        setArticulos(articulos);
  
      };
      fetchArticulos();
    }, [refreshData]
  );

  console.log(JSON.stringify(articulos,null,2));

  const initializableNewArticulo = (): Articulo => {

    return {
      id:0,
      nombre:"",
      precioCompra:0,
      stockActual:0,
      stockDeSeguridad:0,
      loteOptimo:0,
      cgiArticulo:0,
      fechaAlta: new Date('2024-06-07')
    };
  
  };
  
  //articulo seleccionado que se va a pasar como prop al Modal
  const [articulo, setArticulo] = useState<Articulo>(initializableNewArticulo);
  
  //const para manejar el estado del modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [nombre, setNombre] = useState("");
  
  //Logica del modal
  const handleClick = (newNombre: string, articulo: Articulo, modal: ModalType ) => {
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
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock Actual</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map(articulo=> (
          <tr key = {articulo.id}>
              <td>{articulo.id}</td>
              <td>{articulo.nombre}</td>
              <td>{articulo.precioCompra}</td>
              <td>{articulo.stockActual}</td>
              <td><EditButton onClick={()=> handleClick("Editar articulo", articulo, ModalType.UPDATE)}></EditButton></td>
              <td><DeleteButton onClick={()=> handleClick("Eliminar articulo", articulo, ModalType.DELETE)}></DeleteButton></td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

        {showModal&&(
          <ArticuloModal
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

export default ArticuloTable;
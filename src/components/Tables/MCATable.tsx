import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ModalType } from '../../types/ModalType';
import EditButton from '../EditButton/EditButton';
import { MCA } from '../../types/MCA';
import { MCAService } from '../../services/MCAService';
import MCAModal from '../Modals/MCAModal';


function MCATable() {

    const[mcas, setArticulos] = useState<MCA[]>([]);

    //Actualiza la tabla cada vez que se produce un cambio
const[refreshData, setRefreshData] = useState (false);

//Se ejecuta cada vez que se renderiza el componente o refreshData cambia de estado
    useEffect(()=> {
      const fetchArticulos = async ()=> {
        const mcas = await MCAService.getVentas();
        setArticulos(mcas);
  
      };
      fetchArticulos();
    }, [refreshData]
  );

  console.log(JSON.stringify(mcas,null,2));

  const initializableNewArticulo = (): MCA => {

    return {
      id:0,
      valor:0,
    };
  
  };
  
  //articulo seleccionado que se va a pasar como prop al Modal
  const [mca, setArticulo] = useState<MCA>(initializableNewArticulo);
  
  //const para manejar el estado del modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [nombre, setNombre] = useState("");
  
  //Logica del modal
  const handleClick = (newNombre: string, mca: MCA, modal: ModalType ) => {
    setNombre(newNombre);
    setModalType(modal);
    setArticulo(mca);
    setShowModal(true);
  }
  

  return (
    <>
        <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{margin:'20px', maxWidth:'700px', minWidth:'100px'}}>
      <Table style={{ minWidth:'100px',width:'100%', }}>
      <thead>
        <tr>
          <th>Valor</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        {mcas.map(mca=> (
          <tr key = {mca.id}>
              <td>{mca.valor}</td>
              <td><EditButton onClick={()=> handleClick("Editar articulo", mca, ModalType.UPDATE)}></EditButton></td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
        </div>
      
        {showModal&&(
          <MCAModal
          show={showModal}
          onHide={()=>setShowModal(false)}
          nombre={nombre}
          modalType={modalType}
          ventaArticulo={mca}
          refreshData={setRefreshData}
          />
        )}


    </>
  );
}

export default MCATable;
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Articulo } from '../../types/Articulo';
import { ArticuloService } from '../../services/ArticuloService';

function StripedColumnsExample() {

    const[articulos, setArticulos] = useState<Articulo[]>([]);

    useEffect(()=> {
      const fetchArticulos = async ()=> {
        const articulos = await ArticuloService.getArticulos();
        setArticulos(articulos);
  
      };
      fetchArticulos();
    }, []
  );

  console.log(JSON.stringify(articulos,null,2));

  return (
    <>
      <div style={{display:'flex',justifyContent:'center', margin:'20px'}}>
      <Table style={{ width:'100%'}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock Actual</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map(articulo=> (
          <tr key = {articulo.id}>
              <td>{articulo.id}</td>
              <td>{articulo.nombre}</td>
              <td>{articulo.precioCompra}</td>
              <td>{articulo.stockActual}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
    </>
  );
}

export default StripedColumnsExample;
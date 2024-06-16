import {Route, Routes} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Articulos from '../pages/Articulos';
import React from 'react';
import Ventas from '../pages/Ventas';
import DemandasHistoricas from '../pages/DemandasHistoricas';
import Proveedores from '../pages/Proveedores';
import OrdenesDeCompra from '../pages/OrdenesDeCompra';



const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
          {<Route path="/articulos" element={<Articulos/>}/>}
          {<Route path="/ventas" element={<Ventas/>}/>}
          {<Route path="/demandasHistoricas" element={<DemandasHistoricas/>}/>}
          {<Route path="/proveedores" element={<Proveedores/>}/>}
          {<Route path="/ordenesDeCompra" element={<OrdenesDeCompra/>}/>}

    </Routes>
  )
}

export default AppRoutes

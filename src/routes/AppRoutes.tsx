import {Route, Routes} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Articulos from '../pages/Articulos';
import React from 'react';
import Ventas from '../pages/Ventas';



const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
          {<Route path="/articulos" element={<Articulos/>}/>}
          {<Route path="/ventas" element={<Ventas/>}/>}
    
    </Routes>
  )
}

export default AppRoutes

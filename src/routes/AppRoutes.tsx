import {Route, Routes} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Articulos from '../pages/Articulos';
import React from 'react';



const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
          {<Route path="/articulos" element={<Articulos/>}/>}
       
    </Routes>
  )
}

export default AppRoutes

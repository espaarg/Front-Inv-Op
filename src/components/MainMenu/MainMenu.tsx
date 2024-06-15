import { Button } from "react-bootstrap"
import '../../styles/MainMenu.css'
import { useNavigate } from "react-router-dom";

const MainMenu = ( ) => {

    const navigate = useNavigate();

return(
    <div className="papa">
        <div className="cuadroGris">
          <h1>Menú</h1> 
            <div className="primerDiv">
                <div>
                    <div > <Button className="btnP" variant="primary" onClick={() => navigate('/ventas')}>      Ventas        </Button></div>
                    <div > <Button className="btnP"variant="primary" onClick={() => navigate('/articulos')}>     Artículos      </Button></div>
                    <div > <Button className="btnP" variant="primary" >  Predecir Demanda  </Button></div>
                </div>
                <div>
                    <div > <Button className="btnP" variant="primary" onClick={() => navigate('/demandasHistoricas')}> Demanda Historica  </Button></div>
                    <div > <Button className="btnP" variant="primary"> Ordenes de compra  </Button></div>
                    <div > <Button className="btnP" variant="primary">Configurar Parámtros</Button></div>
                </div>
            </div>
        </div>
    </div>
    
)

}

export default MainMenu
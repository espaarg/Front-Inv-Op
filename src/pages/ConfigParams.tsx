import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const ConfigParams = ( ) => {

    const navigate = useNavigate();

return(
    <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', flexDirection:'row'}}>
                    <Button variant="dark" style={{margin:'10px', width:'170px', height:'50px', padding:'5px'}} onClick={() => navigate('/')}>Volver al menú</Button>
                    <h1 style={{paddingLeft:'100px',marginTop:'30px'}}>Configuracion de parametros</h1>
        </div>
        <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <div style={{width:'auto', backgroundColor:'#ced4da', maxWidth:'800px', marginTop:'80px', borderRadius:'5px', padding:'20px'}}>
            <div className="primerDiv">
                <div>
                    <div > <Button className="btnP" variant="primary" onClick={() => navigate('/mCA')}>Multiplicador de Ca</Button></div>
                    <div > <Button className="btnP" variant="primary" >  X  </Button></div>
                </div>
                <div>
                    
                </div>
                <div > </div>
            </div>
        </div>
        </div>
        
    </div>
    
)

}

export default ConfigParams
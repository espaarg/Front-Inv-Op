import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import MCATable from "../components/Tables/MCATable"

const MCA = () => {

    const navigate = useNavigate()

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', flexDirection:'row'}}>
                <Button variant="dark" style={{margin:'10px', width:'170px', height:'50px', padding:'5px'}} onClick={() => navigate('/configParams')}>Volver atrás</Button>
                <h1 style={{paddingLeft:'100px',marginTop:'30px'}}>Multiplicador de Costo de Almacenamiento</h1>
            </div>
           
            <MCATable/>
        </div>
            
   
    )

}

export default MCA
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import VentaTable from "../components/Tables/VentaTable"

const Ventas = () => {

    const navigate = useNavigate()

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', flexDirection:'row'}}>
                <Button variant="dark" style={{margin:'10px', width:'170px', height:'50px', padding:'5px'}} onClick={() => navigate('/')}>Volver al menú</Button>
                <h1 style={{paddingLeft:'100px',marginTop:'30px'}}>Ventas</h1>
            </div>
            <VentaTable/>
        </div>
            
   
    )

}

export default Ventas
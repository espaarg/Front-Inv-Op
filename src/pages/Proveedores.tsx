import { Button } from "react-bootstrap"
import ProveedorTable from "../components/Tables/ProveedorTable"
import { useNavigate } from "react-router-dom"

const Proveedores = () => {

    const navigate = useNavigate()

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', flexDirection:'row'}}>
                <Button variant="dark" style={{margin:'10px', width:'170px', height:'50px', padding:'5px'}} onClick={() => navigate('/')}>Volver al menú</Button>
                <h1 style={{paddingLeft:'100px',marginTop:'30px'}}>Proveedores</h1>
            </div>
            <ProveedorTable/>
        </div>
            
   
    )

}

export default Proveedores
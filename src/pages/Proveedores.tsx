import { Button } from "react-bootstrap"
import ProveedorTable from "../components/Tables/ProveedorTable"
import { useNavigate } from "react-router-dom"

const Proveedores = () => {

    const navigate = useNavigate()

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <Button variant="dark" style={{margin:'10px', width:'170px', padding:'5px'}} onClick={() => navigate('/')}>Volver al menú</Button>
            <ProveedorTable/>
        </div>
            
   
    )

}

export default Proveedores
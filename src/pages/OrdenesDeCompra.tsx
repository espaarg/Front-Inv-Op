import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import OrdenDeCompraTable from "../components/Tables/OrdenDeCompraTable"

const OrdenesDeCompra = () => {

    const navigate = useNavigate()

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <Button variant="dark" style={{margin:'10px', width:'170px', padding:'5px'}} onClick={() => navigate('/')}>Volver al menú</Button>
            <OrdenDeCompraTable/>
        </div>
            
   
    )

}

export default OrdenesDeCompra
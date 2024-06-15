import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import DemandaHistoricaTable from "../components/Tables/DemandaHistoricaTable"

const DemandasHistoricas = () => {

    const navigate = useNavigate()

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <Button variant="dark" style={{margin:'10px', width:'170px', padding:'5px'}} onClick={() => navigate('/')}>Volver al menú</Button>
            <DemandaHistoricaTable/>
        </div>
            
   
    )

}

export default DemandasHistoricas
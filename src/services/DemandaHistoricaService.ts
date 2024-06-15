import { DemandaHistorica } from "../types/DemandaHistorica";

const BASE_URL = 'http://localhost:8080';


export const DemandaHistoricaService = {

    getDemandaHistorica:async (): Promise<DemandaHistorica[]>=>{
        const response = await fetch(`${BASE_URL}/DemandaHistorica/all`);
        const data = await response.json();
        return data;
    },

    getVenta: async (id: number): Promise<DemandaHistorica> => {

        const response = await fetch(`${BASE_URL}/DemandaHistorica/${id}`, {
            method: "GET",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data;
    },

    createVenta:async (demandaHistorica: DemandaHistorica): Promise<DemandaHistorica> => {
        const response = await fetch(`${BASE_URL}/DemandaHistorica`, {
            method: "POST", 
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(demandaHistorica)
        });

        const data = await response.json();
        return data;

    },

    updateVenta: async (id: number, venta: DemandaHistorica): Promise<DemandaHistorica> => {
        const response = await fetch(`${BASE_URL}/DemandaHistorica/${id}`, {
            method: "PUT",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });

        const data = await response.json();
        return data;
    }, 

    deleteVenta:async (id:number): Promise<void> => {
        await fetch (`${BASE_URL}/DemandaHistorica/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
            },
        });
    }
}
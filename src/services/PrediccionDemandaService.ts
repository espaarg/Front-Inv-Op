import { Articulo } from "../types/Articulo";
import { PrediccionDemanda } from "../types/PrediccionDemanda";
import { Venta } from "../types/Venta";

const BASE_URL = 'http://localhost:8080/PrediccionDemanda';


export const PrediccionDemandaService = {

    getVentas:async (): Promise<PrediccionDemanda[]>=>{
        const response = await fetch(`${BASE_URL}/all`);
        const data = await response.json();
        return data;
    },

    getVenta: async (id: number): Promise<PrediccionDemanda> => {

        const response = await fetch(`${BASE_URL}/${id}`, {
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

    createPrediccion: async (prediccion: PrediccionDemanda): Promise<any> => {
        const response = await fetch(`${BASE_URL}/predecirDemanda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prediccion)
        });

        if (!response.ok) {
            throw new Error('Error al crear la predicción');
        }

        return await response.json();
    },


    updateVenta: async (id: number, venta: Venta): Promise<Venta> => {
        const response = await fetch(`${BASE_URL}/Venta/${id}`, {
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
        await fetch (`${BASE_URL}/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
            },
        });
    }
}
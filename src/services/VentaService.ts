import { Venta } from "../types/Venta";

const BASE_URL = 'http://localhost:8080';


export const VentaService = {

    getVentas:async (): Promise<Venta[]>=>{
        const response = await fetch(`${BASE_URL}/Venta/all`);
        const data = await response.json();
        return data;
    },

    getVenta: async (id: number): Promise<Venta> => {

        const response = await fetch(`${BASE_URL}/Venta/${id}`, {
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

    createVenta:async (venta: Venta): Promise<Venta> => {
        const response = await fetch(`${BASE_URL}/Venta`, {
            method: "POST", 
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
        await fetch (`${BASE_URL}/Venta/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
            },
        });
    }
}
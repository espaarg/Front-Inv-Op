import { VentaArticulo } from "../types/VentaArticulo";

const BASE_URL = 'http://localhost:8080';


export const VentaArticuloService = {

    getVentas:async (): Promise<VentaArticulo[]>=>{
        const response = await fetch(`${BASE_URL}/VentaArticulo/all`);
        const data = await response.json();
        return data;
    },

    getVenta: async (id: number): Promise<VentaArticulo> => {

        const response = await fetch(`${BASE_URL}/VentaArticulo/${id}`, {
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

    createVenta:async (venta: VentaArticulo): Promise<VentaArticulo> => {
        const response = await fetch(`${BASE_URL}/VentaArticulo`, {
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

    updateVenta: async (id: number, venta: VentaArticulo): Promise<VentaArticulo> => {
        const response = await fetch(`${BASE_URL}/VentaArticulo/${id}`, {
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
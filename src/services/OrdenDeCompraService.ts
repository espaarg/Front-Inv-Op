import {OrdenDeCompra} from "../types/OrdenDeCompra"


const BASE_URL = 'http://localhost:8080/OrdenDeCompra';


export const OrdenDeCompraService = {

    getVentas:async (): Promise<OrdenDeCompra[]>=>{
        const response = await fetch(`${BASE_URL}/all`);
        const data = await response.json();
        return data;
    },

    getArticulo: async (id: number): Promise<OrdenDeCompra> => {

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

    createVenta:async (articulo: OrdenDeCompra): Promise<OrdenDeCompra> => {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST", 
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articulo)
        });

        const data = await response.json();
        return data;

    },

    updateVenta: async (id: number, articulo: OrdenDeCompra): Promise<OrdenDeCompra> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articulo)
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
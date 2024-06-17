import {Articulo} from "../types/Articulo"


const BASE_URL = 'http://localhost:8080';


export const ArticuloService = {

    getVentas:async (): Promise<Articulo[]>=>{
        const response = await fetch(`${BASE_URL}/Articulo/all`);
        const data = await response.json();
        return data;
    },

    getArticulo: async (id: number): Promise<Articulo> => {

        const response = await fetch(`${BASE_URL}/Articulo/${id}`, {
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

    createVenta:async (articulo: Articulo): Promise<Articulo> => {
        const response = await fetch(`${BASE_URL}/Articulo/create`, {
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

    updateVenta: async (id: number, articulo: Articulo): Promise<Articulo> => {
        const response = await fetch(`${BASE_URL}/Articulo/${id}`, {
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
        await fetch (`${BASE_URL}/Articulo/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
            },
        });
    }
}
import {Proveedor} from "../types/Proveedor"


const BASE_URL = 'http://localhost:8080/Proveedor';


export const ProveedorService = {

    getVentas:async (): Promise<Proveedor[]>=>{
        const response = await fetch(`${BASE_URL}/all`);
        const data = await response.json();
        return data;
    },

    getArticulo: async (id: number): Promise<Proveedor> => {

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

    createVenta:async (proveedor: Proveedor): Promise<Proveedor> => {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST", 
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proveedor)
        });

        const data = await response.json();
        return data;

    },

    updateVenta: async (id: number, articulo: Proveedor): Promise<Proveedor> => {
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
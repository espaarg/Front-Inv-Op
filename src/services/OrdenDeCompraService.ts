import {OrdenDeCompra} from "../types/OrdenDeCompra"


const BASE_URL = 'http://localhost:8080/OrdenDeCompra';


export const OrdenDeCompraService = {

    getVentas:async (): Promise<OrdenDeCompra[]>=>{
        const response = await fetch(`${BASE_URL}/all`);
        const data = await response.json();
        return data;
    },

    confirmarOrdenDeCompra : async (id: number) => {
        const url = `${BASE_URL}/confirmar?id=${id}`;
    
        const response = await fetch(url, {
            method: "POST", 
            
        });
    
        const responseData = await response.text();
        return responseData;
    },

    getArticulo: async (id2: number): Promise<OrdenDeCompra> => {

        const response = await fetch(`${BASE_URL}/${id2}`, {
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

    createOC: async (
        articulo: number,
        cantidad: number,
        proveedorArticulo: number
    ): Promise<string> => {
    
        if (!articulo || cantidad <= 0 || !proveedorArticulo) {
            throw new Error('Valores inválidos proporcionados');
        }
    
        const url = `${BASE_URL}/create?idArticulo=${articulo}&cantidad=${encodeURIComponent(cantidad)}&idProveedor=${proveedorArticulo}`;
    
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            const errorText = await response.text();
            try {
                const errorObj = JSON.parse(errorText);
                throw new Error(errorObj.error || `Error: ${response.status}`);
            } catch {
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
        }
    
        const responseData = await response.text();
        return responseData;
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
import {Articulo} from "../types/Articulo"


const BASE_URL = 'http://localhost:8080';


export const ArticuloService = {

    actualizar: async () =>{
        const response = await fetch(`${BASE_URL}/Articulo/actualizarValores`);
    },

    getArticuloReponer:async() : Promise<Articulo[]>=>{
        const response = await fetch(`${BASE_URL}/Articulo/articulosAReponer`);
        const data = await response.json();
        return data;
    },

    getArticuloFaltante:async() : Promise<Articulo[]>=>{
        const response = await fetch(`${BASE_URL}/Articulo/articulosFaltantes`);
        const data = await response.json();
        return data;
    },

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

    createVenta: async (
            nombre: string,
            precioCompra: number,
            stockActual: number,
            stockDeSeguridad: number,
            loteOptimo: number,
            cgiArticulo: number,
            puntoPedido: number,
            costoAlmacenamiento: number,
            tiempoEntrePedidos: number,
            cantMax: number,
            cantAPedir: number,
            modeloInventario: string,
            proveedorArticulo: string
    ): Promise<Articulo> => {
        const params = new URLSearchParams();
        params.append("nombre", nombre);
        params.append("precioCompra", precioCompra.toString());
        params.append("stockActual", stockActual.toString());
        params.append("stockDeSeguridad", stockDeSeguridad.toString());
        params.append("loteOptimo", loteOptimo.toString());
        params.append("cgiArticulo", cgiArticulo.toString());
        params.append("puntoPedido", puntoPedido.toString());
        params.append("costoAlmacenamiento", costoAlmacenamiento.toString());
        params.append("tiempoEntrePedidos", tiempoEntrePedidos.toString());
        params.append("cantMax", cantMax.toString());
        params.append("cantAPedir", cantAPedir.toString());
        params.append("modeloInventario", modeloInventario.toString());
        params.append("proveedorArticulo", proveedorArticulo.toString());
    
        const response = await fetch(`${BASE_URL}/Articulo/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params.toString()
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
    },

    updateVenta: async (
        id: number, 
        nombre: string,
        precioCompra: number,
        stockActual: number,
        stockDeSeguridad: number,
        loteOptimo: number,
        cgiArticulo: number,
        puntoPedido: number,
        costoAlmacenamiento: number,
        tiempoEntrePedidos: number,
        cantMax: number,
        cantAPedir: number,
        modeloInventario: string,
        proveedorArticulo: string
    ) => {
        try {
            const response = await fetch(
                `${BASE_URL}/Articulo/actualizar?id=${id}&nombre=${encodeURIComponent(nombre)}&precioCompra=${precioCompra}&stockActual=${stockActual}&stockDeSeguridad=${stockDeSeguridad}&loteOptimo=${loteOptimo}&cgiArticulo=${cgiArticulo}&puntoPedido=${puntoPedido}&costoAlmacenamiento=${costoAlmacenamiento}&tiempoEntrePedidos=${tiempoEntrePedidos}&cantMax=${cantMax}&cantAPedir=${cantAPedir}&modeloInventario=${encodeURIComponent(modeloInventario)}&proveedorArticulo=${encodeURIComponent(proveedorArticulo)}`, 
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during update:', error);
            throw error; // rethrow the error to be caught in handleSaveUpdate
        }
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

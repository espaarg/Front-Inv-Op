import { MCA } from "../types/MCA";


const BASE_URL = 'http://localhost:8080/MCA';


export const MCAService = {

    getVentas:async (): Promise<MCA[]>=>{
        const response = await fetch(`${BASE_URL}/all`);
        const data = await response.json();
        return data;
    },

    getArticulo: async (id: number): Promise<MCA> => {

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


    updateVenta: async (id: number, articulo: MCA): Promise<MCA> => {
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


}
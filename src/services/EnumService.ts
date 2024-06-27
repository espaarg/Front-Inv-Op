
import { Enum } from '../components/Enums/Enum';

const BASE_URL = 'http://localhost:8080/enum'; // Ajusta la URL según tu configuración

export const EnumService = {

    getVentas:async (): Promise<Enum[]>=>{
        const response = await fetch(`${BASE_URL}/ModInv`);
        const data = await response.json();
        const modelosInventario: Enum[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },

    getCantPer:async (): Promise<Enum[]>=>{
        const response = await fetch(`${BASE_URL}/CantPer`);
        const data = await response.json();
        const modelosInventario: Enum[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },

    getFijError:async (): Promise<Enum[]>=>{
        const response = await fetch(`${BASE_URL}/FijError`);
        const data = await response.json();
        const modelosInventario: Enum[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },
    
    getMetCalc:async (): Promise<Enum[]>=>{
        const response = await fetch(`${BASE_URL}/MetCalc`);
        const data = await response.json();
        const modelosInventario: Enum[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },

    getMetPred:async (): Promise<Enum[]>=>{
        const response = await fetch(`${BASE_URL}/MetPred`);
        const data = await response.json();
        const modelosInventario: Enum[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },

}


import { ModeloInventario } from '../components/Enums/Enum';

const BASE_URL = 'http://localhost:8080/enum'; // Ajusta la URL según tu configuración

export const ModeloInventarioService = {

    getVentas:async (): Promise<ModeloInventario[]>=>{
        const response = await fetch(`${BASE_URL}/ModInv`);
        const data = await response.json();
        const modelosInventario: ModeloInventario[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },

    getCantPer:async (): Promise<ModeloInventario[]>=>{
        const response = await fetch(`${BASE_URL}/ModInv`);
        const data = await response.json();
        const modelosInventario: ModeloInventario[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },

    getFijError:async (): Promise<ModeloInventario[]>=>{
        const response = await fetch(`${BASE_URL}/ModInv`);
        const data = await response.json();
        const modelosInventario: ModeloInventario[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },
    
    getMetCalc:async (): Promise<ModeloInventario[]>=>{
        const response = await fetch(`${BASE_URL}/ModInv`);
        const data = await response.json();
        const modelosInventario: ModeloInventario[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },

    getMetPred:async (): Promise<ModeloInventario[]>=>{
        const response = await fetch(`${BASE_URL}/ModInv`);
        const data = await response.json();
        const modelosInventario: ModeloInventario[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },

}

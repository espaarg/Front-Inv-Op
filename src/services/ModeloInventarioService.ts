
import { ModeloInventario } from '../types/ModeloInventario';

const BASE_URL = 'http://localhost:8080/ModInv'; // Ajusta la URL según tu configuración

export const ModeloInventarioService = {

    getVentas:async (): Promise<ModeloInventario[]>=>{
        const response = await fetch(`${BASE_URL}/all`);
        const data = await response.json();
        const modelosInventario: ModeloInventario[] = data.map((nombre: string) => ({ nombre }));
        return modelosInventario;    },

}

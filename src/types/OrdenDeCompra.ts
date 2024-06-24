export interface OrdenDeCompra{
    id: number;
    nombreArticulo: string;
    precioIndividual: number
    totalCompra: number;
    cantidad: number;    
    fechaPedido: string;
    fechaLlegada: string;
    estadoOrdenDeCompra: string;
    proveedorArticulo: string;
}
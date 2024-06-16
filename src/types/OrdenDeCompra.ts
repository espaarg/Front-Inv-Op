export interface OrdenDeCompra{
    id: number;
    totalCompra: number;
    totalArticulos: number;    
    fechaPedido: string;
    estadoOrdenDeCompra: string;
    proveedorArticulo: string;
}
export interface Articulo{
    id: number;
    nombre: string;
    precioCompra: number;    
    stockActual: number;
    stockDeSeguridad: number;
    loteOptimo: number;
    cgiArticulo:number;
    fechaAlta: Date;
}
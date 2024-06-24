export interface Articulo{
    id: number;
    nombre: string;
    precioCompra: number;    
    stockActual: number;
    stockDeSeguridad: number;
    loteOptimo: number;
    cgiArticulo:number;
    puntoPedido:number;
    costoAlmacenamiento: number;
    tiempoEntrePedidos: number;
    cantMax: number;
    cantAPedir: number;
    modeloInventario: string;
    proveedorArticulo: string;
    seleccionado: boolean; // Atributo para manejar la selección

}
export interface PrediccionDemanda {

id: number,

porcentajeDeError: number,

fechaPedido: string,

fechaInicio: string,

fechaFin: string,

cantidadPeriodo: string,


metodoPrediccion: string,


articulo: string,

articuloID: number,

valorPrediccion: number,

error: number,

mesAPredecir: number,

anioAPredecir: number,

//PMP
cantidadPeriodosAtrasPMP: number,

coeficientesPonderacion: Array<number>,

//PMSE
alfa: number,

//cantidadDePeriodosEST
cantidadDePeriodosEST: number,

cantidadDeaniosAtrasEST: number,

cantUnidadesEsperadasEST: number

}

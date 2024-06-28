export interface PrediccionDTO {

    
    porcentajeDeError: number,

    cantidadDePredicciones: string,
    
    prediccion: number,
    
    idArticulo: number,
        
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
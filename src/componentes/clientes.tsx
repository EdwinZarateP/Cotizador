// Definición del tipo para el array de claves
interface Cliente {
    nombre: string;
    clave: string;
    nombreComercial: string;
    tipo:string;
    nitCliente:string;
    minimoKgUrbano: number;
    promedioKgUrbano: number;
    promedioKgNacional: number;
    minimoKgNacional:number;
    descuento:number;
    anoVigencia:number;
    descuentoNacional:number;
    cobroMinDespachoUrbano:number;
    cobroMinCajaUrbano:number;
    tarifaIntegralUrbano:number;
    cobroMinDespachoNacional:number;
    cobroMinCajaNacional:number;
    tarifaIntegralNacional:number;
    addValorem:number;
    diasCartera:number;
  }
  
  const Clientes: Cliente[] = [
    {nombre:'Edwin Zarate', clave:'eeee',nombreComercial:'Carlos Cardona',tipo:'cliente',
    nitCliente:'800',minimoKgUrbano:20, promedioKgNacional:0, minimoKgNacional:15,
    promedioKgUrbano:0, descuento:5, anoVigencia:2024, descuentoNacional:10,
    cobroMinDespachoUrbano:0,cobroMinCajaUrbano:0, tarifaIntegralUrbano:0,
    cobroMinDespachoNacional:0, cobroMinCajaNacional:0,tarifaIntegralNacional:0,
    addValorem:23,diasCartera:13},

    {nombre:'Nestor Vela', clave:'nv2024',nombreComercial:'Carlos Cardona',tipo:'gerente',
    nitCliente:'800', minimoKgUrbano:0, promedioKgNacional:0, minimoKgNacional:0,
    promedioKgUrbano:0, descuento:0, anoVigencia:2024, descuentoNacional:0,
    cobroMinDespachoUrbano:0,cobroMinCajaUrbano:0, tarifaIntegralUrbano:0,
    cobroMinDespachoNacional:0, cobroMinCajaNacional:0,tarifaIntegralNacional:0,
    addValorem:0,diasCartera:60},

    {nombre:'Jairo Henao', clave:'jh2024',nombreComercial:'Carlos Cardona',tipo:'gerente',
    nitCliente:'800', minimoKgUrbano:0, promedioKgNacional:0, minimoKgNacional:0,
    promedioKgUrbano:0, descuento:0, anoVigencia:2024, descuentoNacional:0,
    cobroMinDespachoUrbano:0,cobroMinCajaUrbano:0, tarifaIntegralUrbano:0,
    cobroMinDespachoNacional:0, cobroMinCajaNacional:0,tarifaIntegralNacional:0,
    addValorem:0,diasCartera:60},

    {nombre:'Juan Suarez', clave:'js2024',nombreComercial:'Carlos Cardona',tipo:'gerente',
    nitCliente:'800', minimoKgUrbano:0, promedioKgNacional:0, minimoKgNacional:0,
    promedioKgUrbano:0, descuento:0, anoVigencia:2024, descuentoNacional:0,
    cobroMinDespachoUrbano:0,cobroMinCajaUrbano:0, tarifaIntegralUrbano:0,
    cobroMinDespachoNacional:0, cobroMinCajaNacional:0,tarifaIntegralNacional:0,
    addValorem:0,diasCartera:60},

    {nombre:'Helberth Paez', clave:'hp2024',nombreComercial:'Carlos Cardona',tipo:'gerente',
    nitCliente:'800', minimoKgUrbano:0, promedioKgNacional:0, minimoKgNacional:0,
    promedioKgUrbano:0, descuento:0, anoVigencia:2024, descuentoNacional:0,
    cobroMinDespachoUrbano:0,cobroMinCajaUrbano:0, tarifaIntegralUrbano:0,
    cobroMinDespachoNacional:0, cobroMinCajaNacional:0,tarifaIntegralNacional:0,
    addValorem:0,diasCartera:60},

    {nombre:'Carlos Cardona', clave:'carlos',nombreComercial:'Carlos Cardona',
    tipo:'gerente', nitCliente:'800', minimoKgUrbano:0, promedioKgNacional:0, minimoKgNacional:0,
    promedioKgUrbano:0, descuento:0, anoVigencia:2024, descuentoNacional:0,
    cobroMinDespachoUrbano:0,cobroMinCajaUrbano:0, tarifaIntegralUrbano:0,
    cobroMinDespachoNacional:0, cobroMinCajaNacional:0,tarifaIntegralNacional:0,
    addValorem:0,diasCartera:60},

    {nombre:'Marcela Guerra', clave:'mg2024',nombreComercial:'Marcela Guerra',
    tipo:'comercial', nitCliente:'800', minimoKgUrbano:0, promedioKgNacional:0, minimoKgNacional:0,
    promedioKgUrbano:0, descuento:0, anoVigencia:2024, descuentoNacional:0,
    cobroMinDespachoUrbano:0,cobroMinCajaUrbano:0, tarifaIntegralUrbano:0,
    cobroMinDespachoNacional:0, cobroMinCajaNacional:0,tarifaIntegralNacional:0,
    addValorem:0,diasCartera:60},
    
    {nombre:'Jorge Castañeda', clave:'jc2024',nombreComercial:'Jorge Castañeda',
    tipo:'comercial', nitCliente:'800', minimoKgUrbano:0, promedioKgNacional:0, minimoKgNacional:0,
    promedioKgUrbano:0, descuento:0, anoVigencia:2024, descuentoNacional:0,
    cobroMinDespachoUrbano:0,cobroMinCajaUrbano:0, tarifaIntegralUrbano:0,
    cobroMinDespachoNacional:0, cobroMinCajaNacional:0,tarifaIntegralNacional:0,
    addValorem:0,diasCartera:60},

    {nombre:'Joseph Valero', clave:'jv2024',nombreComercial:'Joseph Valero',
    tipo:'gerente', nitCliente:'800', minimoKgUrbano:0, promedioKgNacional:0, minimoKgNacional:0,
    promedioKgUrbano:0, descuento:0, anoVigencia:2024, descuentoNacional:0,
    cobroMinDespachoUrbano:0,cobroMinCajaUrbano:0, tarifaIntegralUrbano:0,
    cobroMinDespachoNacional:0, cobroMinCajaNacional:0,tarifaIntegralNacional:0,
    addValorem:0,diasCartera:60}

  ];
  
  export { Clientes};
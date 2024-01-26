import '../estilos/formulario.css';
import { useFormularioContext } from '../contexto/Contexto';
import ExportarCotizacion from './exportarPDF.tsx';
import Swal from 'sweetalert2';
import { useState } from 'react';


const Formulario: React.FC = () => {
  
  const [mostrarExportar, setMostrarExportar] = useState(false);

  // Usar el hook personalizado para acceder al contexto
  const {
    nombreComercial,
    setNombreComercial,
    cliente,
    setCliente,
    nitCliente,
    setNitCliente,
    minimoKgUrbano,
    setMinimoKgUrbano,
    minimoKgNacional,
    setMinimoKgNacional,
    promedioKgUrbano, 
    setPromedioKgUrbano,
    promedioKgNacional, 
    setPromedioKgNacional,
    anoVigencia,
    setAnoVigencia,
    descuento,
    setdescuento,
    descuentoNacional,
    setdescuentoNacional,
    cobroMinDespachoUrbano,
    setCobroMinDespachoUrbano,
    cobroMinCajaUrbano,
    setCobroMinCajaUrbano,
    tarifaIntegralUrbano,
    setTarifaIntegralUrbano,
    cobroMinDespachoNacional,
    setCobroMinDespachoNacional,
    cobroMinCajaNacional,
    setCobroMinCajaNacional,
    tarifaIntegralNacional,
    setTarifaIntegralNacional,
    addValorem,
    setAddValorem,
    diasCartera,
    setDiasCartera

  } = useFormularioContext();

  const mostrarMensaje = ( titulo: string, contexto: string ) => {
    Swal.fire({
      icon: 'warning',
      title: titulo,
      text:contexto,
      allowOutsideClick: true,
      allowEscapeKey: true,
    });
  };

  const botonCotizar = () => {
  
    if (!cliente) {
      mostrarMensaje('Información incompleta del cliente','Por favor ingrese el nombre del cliente');
      return;
    }

    if (!nitCliente) {
      mostrarMensaje('Información incompleta del NIT cliente','Por favor ingrese el NIT del cliente');
      return;
    }
    
    // Validar que el año de vigenia no sea menor a 2024
    if (anoVigencia < 2024 || anoVigencia > 2034) {
      mostrarMensaje('Error del año vigencia','No puede indicar un año de vigencia inferior a 2024 o superior a 2034');
      return;
    }

    //ver que al menos se haya puesto informacion en una variable
    if (minimoKgUrbano ===0 &&  minimoKgNacional ===0 &&
      promedioKgUrbano ===0 && promedioKgNacional===0 &&
      descuento ===0 && descuentoNacional ===0 &&  
      cobroMinDespachoUrbano ===0 && cobroMinCajaUrbano ===0 &&
      tarifaIntegralUrbano ===0 && cobroMinDespachoNacional ===0 &&
      cobroMinCajaNacional ===0 && tarifaIntegralNacional ===0 &&
      addValorem ===0 ) {
        mostrarMensaje('Debe ingresar al menos un tipo de negociación','No puede hacer una cotización sin condiciones');
      return;
    }
  //-----------------------------------------------------------------
  //-------------------1. VALIDACIONES DE POR MIN KG-----------------
  //-----------------------------------------------------------------

    // Validar que minimoKgUrbano no sea menor a 15
    if (minimoKgUrbano < 15 && minimoKgUrbano > 0) {
      mostrarMensaje('Error en Mín kg (más de 2 cajas) urbano','No puede ofrecer un peso inferior a 15 Kg');
      return;
    }
    //validar que nacional tenga información
    if (minimoKgUrbano > 0 && minimoKgNacional === 0) {
      mostrarMensaje('Falta información Nacional','Por favor ingrese el Mín kg (más de 2 cajas) para nacional');
      return;
    }
    //validar que el descuento no sea superior a 30%
    if (minimoKgUrbano > 0 && descuento > 30) {
      mostrarMensaje('Exceso en descuento Urbano','No puede pasar el tope de 30% en descuentos');
      return;
    }

  //-----------------------------------------------------------------
    // Validar que minimoKgNacional no sea menor a 15
    if (minimoKgNacional < 15 && minimoKgNacional > 0) {
      mostrarMensaje('Error en Mín kg (más de 2 cajas) nacional','No puede ofrecer un peso inferior a 15 Kg');
      return;
    }
    //validar que urbano tenga información
    if (minimoKgNacional > 0 && minimoKgUrbano === 0) {
      mostrarMensaje('Falta información Urbana','Por favor ingrese el Mín kg (más de 2 cajas) para Urbano');
      return;

    }
    //validar que el descuento no sea superior a 30%
    if (minimoKgNacional > 0 && descuentoNacional > 30) {
      mostrarMensaje('Exceso en descuento Nacional','No puede pasar el tope de 30% en descuentos');
      return;
    }

    //-----------------------------------------------------------------
    //-------------------2. VALIDACIONES DE POR COBRO------------------
    //-----------------------------------------------------------------

    //2.1 VALIDACIONES POR cobroMinCajaUrbano--------------------------

    // Validar que el cobroMinCajaUrbano de 1 caja no puede ser menor a
    if (cobroMinCajaUrbano < 12000 && cobroMinCajaUrbano > 0) {
      mostrarMensaje('Error del cobro minimo una Caja Urbano','No puede ser inferior a $12.000');
      return;
    }
    //validar que cobroMinDespachoUrbano tenga información
    if (cobroMinCajaUrbano > 0 && cobroMinDespachoUrbano === 0) {
      mostrarMensaje('Falta información Urbana','Por favor ingrese el cobro minimo mas de 2 cajas $ para urbano');
      return;
    }
    //validar que cobroMinCajaNacional tenga información
    if (cobroMinCajaUrbano > 0 && cobroMinCajaNacional === 0) {
      mostrarMensaje('Falta información nacional','Por favor ingrese el cobro minimo una caja $ para nacional');
      return;
    }
    //validar que cobroMinDespachoNacional tenga información
    if (cobroMinCajaUrbano > 0 && cobroMinDespachoNacional === 0) {
      mostrarMensaje('Falta información nacional','Por favor ingrese el cobro mín mas de 2 cajas $ para nacional');
      return;
    }

    //2.2 VALIDACIONES POR cobroMinCajaNacional--------------------------

    // Validar que el cobroMinCajaNacional de 1 caja no puede ser menor a
    if (cobroMinCajaNacional < 10000 && cobroMinCajaNacional > 0) {
      mostrarMensaje('Error del cobro minimo una Caja Nacional','No puede ser inferior a $10.000');
      return;
    }
    //validar que cobroMinCajaUrbano tenga información
    if (cobroMinCajaNacional > 0 && cobroMinCajaUrbano === 0) {
      mostrarMensaje('Falta información Urbana','Por favor ingrese el cobro minimo una caja $ para urbano');
      return;
    }
    //validar que cobroMinDespachoUrbano tenga información
    if (cobroMinCajaNacional > 0 && cobroMinDespachoUrbano === 0) {
      mostrarMensaje('Falta información nacional','Por favor ingrese el cobro mín mas de 2 cajas $ para urbano');
      return;
    }
    //validar que cobroMinDespachoNacional tenga información
    if (cobroMinCajaNacional > 0 && cobroMinDespachoNacional === 0) {
      mostrarMensaje('Falta información nacional','Por favor ingrese el cobro mín mas de 2 cajas $ para nacional');
      return;
    }

    //2.3 VALIDACIONES POR cobroMinDespachoUrbano--------------------------

    // Validar que el cobroMinDespachoUrbano de 1 caja no puede ser menor a
    if (cobroMinDespachoUrbano < 10000 && cobroMinDespachoUrbano > 0) {
      mostrarMensaje('Error del cobro minimo más de dos Cajas urbano','No puede ser inferior a $10.000');
      return;
    }
    //validar que cobroMinCajaUrbano tenga información
    if (cobroMinDespachoUrbano > 0 && cobroMinCajaUrbano === 0) {
      mostrarMensaje('Falta información Urbana','Por favor ingrese el cobro minimo una caja $ para urbano');
      return;
    }
    //validar que cobroMinCajaNacional tenga información
    if (cobroMinDespachoUrbano > 0 && cobroMinCajaNacional === 0) {
      mostrarMensaje('Falta información nacional','Por favor ingrese el cobro minimo una caja $ para nacional');
      return;
    }
    //validar que cobroMinDespachoNacional tenga información
    if (cobroMinDespachoUrbano > 0 && cobroMinDespachoNacional === 0) {
      mostrarMensaje('Falta información nacional','Por favor ingrese el cobro mín mas de 2 cajas $ para nacional');
      return;
    }

    //2.4 VALIDACIONES POR cobroMinDespachoNacional--------------------------

    // Validar que el cobroMinDespachoUrbano de 1 caja no puede ser menor a
    if (cobroMinDespachoNacional < 10000 && cobroMinDespachoNacional > 0) {
      mostrarMensaje('Error del cobro minimo más de dos Cajas Nacional','No puede ser inferior a $10.000');
      return;
    }
    //validar que cobroMinCajaUrbano tenga información
    if (cobroMinDespachoNacional > 0 && cobroMinCajaUrbano === 0) {
      mostrarMensaje('Falta información Urbana','Por favor ingrese el cobro minimo una caja $ para urbano');
      return;
    }
    //validar que cobroMinCajaNacional tenga información
    if (cobroMinDespachoNacional > 0 && cobroMinCajaNacional === 0) {
      mostrarMensaje('Falta información nacional','Por favor ingrese el cobro minimo una caja $ para nacional');
      return;
    }
    //validar que cobroMinDespachoUrbano tenga información
    if (cobroMinDespachoNacional > 0 && cobroMinDespachoUrbano === 0) {
      mostrarMensaje('Falta información nacional','Por favor ingrese el cobro mín mas de 2 cajas $ para urbano ');
      return;
    }


    //-----------------------------------------------------------------
    //-------------------3. VALIDACIONES DE POR TARIFA-----------------
    //-----------------------------------------------------------------

    //3.1 VALIDACIONES POR tarifaIntegralUrbano--------------------------

    // Validar que el tarifaIntegralUrbano de 1 caja no puede ser menor a
    if (tarifaIntegralUrbano < 12000 && tarifaIntegralUrbano > 0) {
      mostrarMensaje('Error del la Tarifa integral por caja Urbano','No puede ser inferior a $12.000');
      return;
    }
    //validar que cobroMinDespachoUrbano tenga información
    if (tarifaIntegralUrbano > 0 && tarifaIntegralNacional === 0) {
      mostrarMensaje('Falta información Nacional','Por favor ingrese la Tarifa integral $ para nacional');
      return;
    }

     //3.2 VALIDACIONES POR tarifaIntegralNacional--------------------------

    // Validar que el tarifaIntegralUrbano de 1 caja no puede ser menor a
    if (tarifaIntegralNacional < 12000 && tarifaIntegralNacional > 0) {
      mostrarMensaje('Error del la Tarifa integral por caja Nacional','No puede ser inferior a $12.000');
      return;
    }
    //validar que cobroMinDespachoUrbano tenga información
    if (tarifaIntegralNacional > 0 && tarifaIntegralUrbano === 0) {
      mostrarMensaje('Falta información urbana','Por favor ingrese la Tarifa integral $ para urbano');
      return;
    }

    setMostrarExportar(true);

  };

  return (
    <div className="contenedor-formulario">
      <form>
        <h3>Realice la cotización de su cliente</h3>

        {/* Input para Nombre Comercial */}
        <div className='infoClientes'>

        <h4>Información cliente:</h4>

          <div className="cajas_informacionCliente">
            <label htmlFor="nombreComercial">Nombre comercial:</label>
            <input
              type="text"
              value={nombreComercial}
              onChange={(e) => setNombreComercial(e.target.value)}
              required
            />
          </div>

          {/* Input para Cliente */}
          <div className="cajas_informacionCliente">
            <label htmlFor="cliente">Cliente:</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </div>

          {/* Input para NIT Cliente */}
          <div className="cajas_informacionCliente">
            <label htmlFor="nitCliente">NIT Cliente:</label>
            <input
              type="number"
              value={nitCliente}
              onChange={(e) => setNitCliente(e.target.value)}
              required
            />
          </div>
        </div>
        
        <h4>Información urbanos:</h4>

        <div className='informacionMacro'>
        
          {/* Input para Minimo kg por caja Urbano */}
          <div className={`cajas_informacion ${promedioKgUrbano > 0 || promedioKgNacional > 0 
            || cobroMinDespachoUrbano > 0 || cobroMinCajaUrbano > 0 || tarifaIntegralUrbano > 0
            || cobroMinDespachoNacional > 0 || cobroMinCajaNacional > 0 || tarifaIntegralNacional > 0
            || addValorem > 0 ? 'rojo' : ''}`}>
            <label htmlFor="minimoKgUrbano">Mín kg (más de 2 cajas):</label>
            <input
              type="number"
              value={minimoKgUrbano}
              onChange={(e) => setMinimoKgUrbano(Number(e.target.value))}
              disabled={promedioKgUrbano > 0 || promedioKgNacional > 0 
                || cobroMinDespachoUrbano > 0 || cobroMinCajaUrbano > 0 || tarifaIntegralUrbano > 0
                || cobroMinDespachoNacional > 0 || cobroMinCajaNacional > 0 || tarifaIntegralNacional > 0
                || addValorem > 0}
              required
            />
          </div>

          {/* Input para descuento urbano */}
          <div className={`cajas_informacion ${promedioKgUrbano > 0 || promedioKgNacional > 0 
            || cobroMinDespachoUrbano > 0 || cobroMinCajaUrbano > 0 || tarifaIntegralUrbano > 0
            || cobroMinDespachoNacional > 0 || cobroMinCajaNacional > 0 || tarifaIntegralNacional > 0
            || addValorem > 0 ? 'rojo' : ''}`}>
            <label htmlFor="descuento">% de descuento flete por kg:</label>
            <input
              type="number"
              value={descuento}
              onChange={(e) => setdescuento(Number(e.target.value))}
              disabled={promedioKgUrbano > 0 || promedioKgNacional > 0 
                || cobroMinDespachoUrbano > 0 || cobroMinCajaUrbano > 0 || tarifaIntegralUrbano > 0
                || cobroMinDespachoNacional > 0 || cobroMinCajaNacional > 0 || tarifaIntegralNacional > 0
                || addValorem > 0}
              required
            />
          </div>

          {/* Input cobro Minimo mas de dos cajas Urbano */}
          <div className={`cajas_informacion ${minimoKgUrbano > 0 || minimoKgNacional > 0
            || descuentoNacional > 0 || descuento > 0  || tarifaIntegralNacional > 0 
            || tarifaIntegralUrbano > 0 ||promedioKgUrbano > 0 || promedioKgNacional > 0
            || addValorem > 0 ? 'rojo' : ''}`}>
            <label htmlFor="cobroMinDespachoUrbano">Cobro mín mas de 2 cajas $:</label>
            <input
              type="number"
              value={cobroMinDespachoUrbano}
              onChange={(e) => setCobroMinDespachoUrbano(Number(e.target.value))}
              disabled={minimoKgUrbano > 0|| minimoKgNacional > 0
                || descuentoNacional > 0 || descuento > 0  || tarifaIntegralNacional > 0 
                || tarifaIntegralUrbano > 0 || promedioKgUrbano > 0 || promedioKgNacional > 0
                || addValorem > 0}
              required
            /> 
          </div>

          {/* Input cobro Minimo caja Urbano */}
          <div className={`cajas_informacion ${minimoKgUrbano > 0 || minimoKgNacional > 0
            || descuentoNacional > 0 || descuento > 0 || tarifaIntegralNacional || tarifaIntegralUrbano
            ||promedioKgUrbano > 0 || promedioKgNacional > 0  || addValorem > 0 ?  'rojo' : ''}`}>
            <label htmlFor="cobroMinCajaUrbano">Cobro minimo una caja $:</label>
            <input
              type="number"
              value={cobroMinCajaUrbano}
              onChange={(e) => setCobroMinCajaUrbano(Number(e.target.value))}
              disabled={minimoKgUrbano > 0|| minimoKgNacional > 0
                || descuentoNacional > 0 || descuento > 0 || tarifaIntegralNacional > 0 
                || tarifaIntegralUrbano > 0 || promedioKgUrbano > 0 || promedioKgNacional > 0 
                || addValorem > 0}
              required
            />
          </div>

          {/* Input Tarifa integral Urbano */}
          <div className={`cajas_informacion ${minimoKgUrbano > 0 || minimoKgNacional > 0
            || descuentoNacional > 0 || descuento > 0  || cobroMinDespachoUrbano > 0 
            || cobroMinCajaUrbano > 0 ||promedioKgUrbano > 0 || promedioKgNacional > 0 
            || cobroMinDespachoNacional > 0 || cobroMinCajaNacional> 0  || addValorem > 0 ? 'rojo' : ''}`}>
            <label htmlFor="tarifaIntegralUrbano">Tarifa integral por caja  $:</label>
            <input
              type="number"
              value={tarifaIntegralUrbano}
              onChange={(e) => setTarifaIntegralUrbano(Number(e.target.value))}
              disabled={minimoKgUrbano > 0|| minimoKgNacional > 0
                || descuentoNacional > 0 || descuento > 0 || cobroMinDespachoUrbano > 0 
                || cobroMinCajaUrbano > 0 || promedioKgUrbano > 0 || promedioKgNacional > 0
                || cobroMinDespachoNacional > 0 || cobroMinCajaNacional> 0  || addValorem > 0}
              required
            />
          </div>

          {/* Input promedio kg Urbano */}
          <div className={`cajas_informacion ${minimoKgUrbano > 0 || minimoKgNacional > 0
            || descuentoNacional > 0 || descuento > 0 || cobroMinDespachoUrbano > 0 
            || cobroMinCajaUrbano > 0 || tarifaIntegralNacional > 0 || tarifaIntegralUrbano > 0 
            || cobroMinDespachoNacional > 0 || cobroMinCajaNacional> 0  || addValorem > 0 ? 'rojo' : ''}`}>
            <label htmlFor="promedioKgUrbano">Promedio Kg estandar:</label>
            <input
              type="number"
              value={promedioKgUrbano}
              onChange={(e) => setPromedioKgUrbano(Number(e.target.value))}
              disabled={minimoKgUrbano > 0|| minimoKgNacional > 0
                || descuentoNacional > 0 || descuento > 0 || cobroMinDespachoUrbano > 0
                || cobroMinCajaUrbano > 0 || tarifaIntegralNacional > 0 || tarifaIntegralUrbano > 0
                || cobroMinDespachoNacional > 0 || cobroMinCajaNacional> 0  || addValorem > 0}
              required
            />
          </div>

        </div>
        
        <h4>Información Nacionales:</h4>

        <div className='informacionMacro'>
        
          {/* Input para Minimo kg por caja Nacional */}
          <div className={`cajas_informacion ${promedioKgUrbano > 0 || promedioKgNacional > 0 
            || cobroMinDespachoUrbano > 0 || cobroMinCajaUrbano > 0 || tarifaIntegralUrbano > 0
            || cobroMinDespachoNacional > 0 || cobroMinCajaNacional > 0 || tarifaIntegralNacional > 0
            || addValorem > 0 ? 'rojo' : ''}`}> 
            <label htmlFor="minimoKgNacional">Mín kg (más de 2 cajas):</label>
            <input
              type="number"
              value={minimoKgNacional}
              onChange={(e) => setMinimoKgNacional(Number(e.target.value))}
              disabled={promedioKgUrbano > 0 || promedioKgNacional > 0 
                || cobroMinDespachoUrbano > 0 || cobroMinCajaUrbano > 0 || tarifaIntegralUrbano > 0
                || cobroMinDespachoNacional > 0 || cobroMinCajaNacional > 0 || tarifaIntegralNacional > 0
                || addValorem > 0}
              required
            />
          </div>

          {/* Input para descuento Nacional */}
          <div className={`cajas_informacion ${promedioKgUrbano > 0 || promedioKgNacional > 0 
            || cobroMinDespachoUrbano > 0 || cobroMinCajaUrbano > 0 || tarifaIntegralUrbano > 0
            || cobroMinDespachoNacional > 0 || cobroMinCajaNacional > 0 || tarifaIntegralNacional > 0
            || addValorem > 0  ? 'rojo' : ''}`}>
            <label htmlFor="descuentoNacional">% de descuento flete por Kg:</label>
            <input
              type="number"
              value={descuentoNacional}
              onChange={(e) => setdescuentoNacional(Number(e.target.value))}
              disabled={promedioKgUrbano > 0 || promedioKgNacional > 0 
                || cobroMinDespachoUrbano > 0 || cobroMinCajaUrbano > 0 || tarifaIntegralUrbano > 0
                || cobroMinDespachoNacional > 0 || cobroMinCajaNacional > 0 
                || tarifaIntegralNacional > 0  || addValorem > 0}
              required
            />
          </div>

          {/* Input cobro Minimo Despacho Nacional */}
          <div className={`cajas_informacion ${minimoKgUrbano > 0 || minimoKgNacional > 0
            || descuentoNacional > 0 || descuento > 0 || tarifaIntegralNacional > 0 
            || tarifaIntegralUrbano > 0 ||promedioKgUrbano > 0 || promedioKgNacional > 0 
            || addValorem > 0 ? 'rojo' : ''}`}>
            <label htmlFor="cobroMinDespachoNacional">Cobro mín mas de 2 cajas $:</label>
            <input
              type="number"
              value={cobroMinDespachoNacional}
              onChange={(e) => setCobroMinDespachoNacional(Number(e.target.value))}
              disabled={minimoKgUrbano > 0|| minimoKgNacional > 0
                || descuentoNacional > 0 || descuento > 0 || tarifaIntegralNacional > 0 
                || tarifaIntegralUrbano > 0 || promedioKgUrbano > 0 || promedioKgNacional > 0
                || addValorem > 0}
              required
            />
          </div>
          
          {/* Input cobro Minimo caja Nacional */}
          <div className={`cajas_informacion ${minimoKgUrbano > 0 || minimoKgNacional > 0
            || descuentoNacional > 0 || descuento > 0 || tarifaIntegralNacional > 0 
            || tarifaIntegralUrbano > 0 ||promedioKgUrbano > 0 || promedioKgNacional > 0 
            || addValorem > 0 ? 'rojo' : ''}`}>
            <label htmlFor="cobroMinCajaNacional">Cobro minimo una caja $:</label>
            <input
              type="number"
              value={cobroMinCajaNacional}
              onChange={(e) => setCobroMinCajaNacional(Number(e.target.value))}
              disabled={minimoKgUrbano > 0|| minimoKgNacional > 0
                || descuentoNacional > 0 || descuento > 0 || tarifaIntegralNacional > 0 
                || tarifaIntegralUrbano > 0 ||promedioKgUrbano > 0 || promedioKgNacional > 0
                || addValorem > 0}
              required
            />
          </div>
          
          {/* Input tarifa integral nacional */}
          <div className={`cajas_informacion ${minimoKgUrbano > 0 || minimoKgNacional > 0
            || descuentoNacional > 0 || descuento > 0  || cobroMinDespachoUrbano > 0 
            || cobroMinCajaUrbano > 0 ||promedioKgUrbano > 0 || promedioKgNacional > 0
            || cobroMinDespachoNacional > 0 || cobroMinCajaNacional> 0
            || addValorem > 0 ? 'rojo' : ''}`}>
            <label htmlFor="tarifaIntegralNacional">Tarifa integral por caja $:</label>
            <input
              type="number"
              value={tarifaIntegralNacional}
              onChange={(e) => setTarifaIntegralNacional(Number(e.target.value))}
              disabled={minimoKgUrbano > 0|| minimoKgNacional > 0
                || descuentoNacional > 0 || descuento > 0 || cobroMinDespachoUrbano > 0 
                || cobroMinCajaUrbano > 0 || promedioKgUrbano > 0 || promedioKgNacional > 0
                || cobroMinDespachoNacional > 0 || cobroMinCajaNacional> 0  || addValorem > 0}
              required
            />
          </div>
          
          {/* Input promedio kg nacional */}
          <div className={`cajas_informacion ${minimoKgUrbano > 0 || minimoKgNacional > 0
            || descuentoNacional > 0 || descuento > 0 || cobroMinDespachoUrbano > 0 
            || cobroMinCajaUrbano > 0 || tarifaIntegralNacional > 0 || tarifaIntegralUrbano > 0
            || cobroMinDespachoNacional > 0 || cobroMinCajaNacional> 0  || addValorem > 0
            ? 'rojo' : ''}`}>
            <label htmlFor="promedioKgNacional">Promedio Kg estandar:</label>
            <input
              type="number"
              value={promedioKgNacional}
              onChange={(e) => setPromedioKgNacional(Number(e.target.value))}
              disabled={minimoKgUrbano > 0|| minimoKgNacional > 0
                || descuentoNacional > 0 || descuento > 0 || cobroMinDespachoUrbano > 0 
                || cobroMinCajaUrbano > 0 || tarifaIntegralNacional > 0 || tarifaIntegralUrbano > 0
                || cobroMinDespachoNacional > 0 || cobroMinCajaNacional> 0  || addValorem > 0}
              required
            />
          </div>
        </div>

        <div className='informacionMacro'>
          
          <div className={`cajas_informacion ${minimoKgUrbano > 0 || minimoKgNacional > 0
            || descuentoNacional > 0 || descuento > 0 || cobroMinDespachoUrbano > 0 
            || cobroMinCajaUrbano > 0 || tarifaIntegralNacional > 0 || tarifaIntegralUrbano > 0
            || promedioKgUrbano > 0 || promedioKgNacional > 0 || cobroMinDespachoNacional > 0 
            || cobroMinCajaNacional> 0 ? 'rojo' : ''}`}>
            <label htmlFor="addValorem">% Negociación AddValorem:</label>
            <input
              type="number"
              value={addValorem}
              onChange={(e) => setAddValorem(Number(e.target.value))}
              disabled={minimoKgUrbano > 0|| minimoKgNacional > 0
                || descuentoNacional > 0 || descuento > 0 || cobroMinDespachoUrbano > 0 
                || cobroMinCajaUrbano > 0 || tarifaIntegralNacional > 0 || tarifaIntegralUrbano > 0
                ||promedioKgUrbano > 0 || promedioKgNacional > 0 || cobroMinDespachoNacional > 0 || cobroMinCajaNacional> 0}
              required
            />
          </div>

          {/* Input para dias cartera */}
          <div className="cajas_informacion">
            <label htmlFor="diasCartera">Dias de cartera:</label>
            <input
              type="number"
              value={diasCartera}
              onChange={(e) => setDiasCartera(Number(e.target.value))}
              required
            />
          </div>

          {/* Input para Año de vigencia */}
          <div className="cajas_informacion">
            <label htmlFor="anoVigencia">Año de vigencia:</label>
            <input
              type="number"
              value={anoVigencia}
              onChange={(e) => setAnoVigencia(Number(e.target.value))}
              required
            />
          </div>

        </div>

        {/* Botón para exportar */}
        <button 
        type="button"
        className='boton-exportar'
        onClick={botonCotizar}>
            Generar Cotizacion
            <span></span>
        </button>

        {mostrarExportar && <ExportarCotizacion />}

      </form>
    </div>
  );
};

export default Formulario;

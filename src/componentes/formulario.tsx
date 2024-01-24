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

  const botonCotizar = () => {

    
    if (!cliente) {
      Swal.fire({
        icon: 'warning',
        title: 'Información incompleta del cliente',
        text:'Por favor ingrese el nombre del cliente',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!nitCliente) {
      Swal.fire({
        icon: 'warning',
        title: 'Información incompleta del NIT cliente',
        text:'Por favor ingrese el NIT del cliente',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }
  
    // Validar que minimoKgUrbano no sea menor a 15
    if (minimoKgUrbano < 15 && minimoKgUrbano > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Error de peso minimo urbano',
        text:'No puede ofrecer un peso inferior a 15 Kg',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    // Validar que minimoKgNacional no sea menor a 15
    if (minimoKgNacional < 15 && minimoKgUrbano > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Error de peso minimo nacional',
        text:'No puede ofrecer un peso inferior a 15 Kg',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    // Validar que el año de vigenia no sea menor a 2024
    if (anoVigencia < 2024 || anoVigencia > 2034) {
      Swal.fire({
        icon: 'warning',
        title: 'Error del año vigencia',
        text:'No puede indicar un año de vigencia inferior a 2024 o superior a 2034',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
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
          <div className="cajas_informacion">
            <label htmlFor="minimoKgUrbano">Minimo kg (más de 2 cajas):</label>
            <input
              type="number"
              value={minimoKgUrbano}
              onChange={(e) => setMinimoKgUrbano(Number(e.target.value))}
              required
            />
          </div>

          {/* Input para descuento urbano */}
          <div className="cajas_informacion">
            <label htmlFor="descuento">% de descuento flete por kg:</label>
            <input
              type="number"
              value={descuento}
              onChange={(e) => setdescuento(Number(e.target.value))}
              required
            />
          </div>

          {/* Input cobro Minimo mas de dos cajas Urbano */}
          <div className="cajas_informacion">
            <label htmlFor="cobroMinDespachoUrbano">Cobro minimo mas de 2 cajas:</label>
            <input
              type="number"
              value={cobroMinDespachoUrbano}
              onChange={(e) => setCobroMinDespachoUrbano(Number(e.target.value))}
              required
            />
          </div>

          {/* Input cobro Minimo caja Urbano */}
          <div className="cajas_informacion">
            <label htmlFor="cobroMinCajaUrbano">Cobro minimo una caja:</label>
            <input
              type="number"
              value={cobroMinCajaUrbano}
              onChange={(e) => setCobroMinCajaUrbano(Number(e.target.value))}
              required
            />
          </div>

          {/* Input Tarifa integral Urbano */}
          <div className="cajas_informacion">
            <label htmlFor="tarifaIntegralUrbano">Tarifa integral por caja:</label>
            <input
              type="number"
              value={tarifaIntegralUrbano}
              onChange={(e) => setTarifaIntegralUrbano(Number(e.target.value))}
              required
            />
          </div>

          {/* Input promedio kg Urbano */}
          <div className="cajas_informacion">
            <label htmlFor="promedioKgUrbano">Promedio Kg estandar:</label>
            <input
              type="number"
              value={promedioKgUrbano}
              onChange={(e) => setPromedioKgUrbano(Number(e.target.value))}
              required
            />
          </div>

        </div>
        
        <h4>Información Nacionales:</h4>

        <div className='informacionMacro'>
        
          {/* Input para Minimo kg por caja Nacional */}
          <div className="cajas_informacion">
            <label htmlFor="minimoKgNacional">Minimo kg (más de 2 cajas):</label>
            <input
              type="number"
              value={minimoKgNacional}
              onChange={(e) => setMinimoKgNacional(Number(e.target.value))}
              required
            />
          </div>

          {/* Input para descuento Nacional */}
          <div className="cajas_informacion">
            <label htmlFor="descuentoNacional">% de descuento flete por Kg:</label>
            <input
              type="number"
              value={descuentoNacional}
              onChange={(e) => setdescuentoNacional(Number(e.target.value))}
              required
            />
          </div>

          {/* Input cobro Minimo Despacho Nacional */}
          <div className="cajas_informacion">
            <label htmlFor="cobroMinDespachoNacional">Cobro minimo mas de 2 cajas:</label>
            <input
              type="number"
              value={cobroMinDespachoNacional}
              onChange={(e) => setCobroMinDespachoNacional(Number(e.target.value))}
              required
            />
          </div>
          
          {/* Input cobro Minimo caja Nacional */}
          <div className="cajas_informacion">
            <label htmlFor="cobroMinCajaNacional">Cobro minimo una caja:</label>
            <input
              type="number"
              value={cobroMinCajaNacional}
              onChange={(e) => setCobroMinCajaNacional(Number(e.target.value))}
              required
            />
          </div>
          
          {/* Input tarifa integral nacional */}
          <div className="cajas_informacion">
            <label htmlFor="tarifaIntegralNacional">Tarifa integral por caja:</label>
            <input
              type="number"
              value={tarifaIntegralNacional}
              onChange={(e) => setTarifaIntegralNacional(Number(e.target.value))}
              required
            />
          </div>
          
          {/* Input promedio kg nacional */}
          <div className="cajas_informacion">
            <label htmlFor="promedioKgNacional">Promedio Kg estandar:</label>
            <input
              type="number"
              value={promedioKgNacional}
              onChange={(e) => setPromedioKgNacional(Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div className='informacionMacro'>
          
          <div className="cajas_informacion">
            <label htmlFor="addValorem">% Negociación AddValorem:</label>
            <input
              type="number"
              value={addValorem}
              onChange={(e) => setAddValorem(Number(e.target.value))}
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

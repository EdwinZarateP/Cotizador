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
    anoVigencia,
    setAnoVigencia,
    descuento,
    setdescuento,

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
    if (minimoKgUrbano < 15) {
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
    if (minimoKgNacional < 15) {
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
        {/* Input para Nombre Comercial */}
        <div className="cajas_informacion">
          <label htmlFor="nombreComercial">Nombre comercial:</label>
          <input
            type="text"
            value={nombreComercial}
            onChange={(e) => setNombreComercial(e.target.value)}
            required
          />
        </div>

        {/* Input para Cliente */}
        <div className="cajas_informacion">
          <label htmlFor="cliente">Cliente:</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>

        {/* Input para NIT Cliente */}
        <div className="cajas_informacion">
          <label htmlFor="nitCliente">NIT Cliente:</label>
          <input
            type="number"
            value={nitCliente}
            onChange={(e) => setNitCliente(e.target.value)}
            required
          />
        </div>

        {/* Input para Minimo kg por caja Urbano */}
        <div className="cajas_informacion">
          <label htmlFor="minimoKgUrbano">Minimo kg por caja Urbano:</label>
          <input
            type="number"
            value={minimoKgUrbano}
            onChange={(e) => setMinimoKgUrbano(Number(e.target.value))}
            required
          />
        </div>

        {/* Input para Minimo kg por caja Nacional */}
        <div className="cajas_informacion">
          <label htmlFor="minimoKgNacional">Minimo kg por caja Nacional:</label>
          <input
            type="number"
            value={minimoKgNacional}
            onChange={(e) => setMinimoKgNacional(Number(e.target.value))}
            required
          />
        </div>

        {/* Input para descuento */}
        <div className="cajas_informacion">
          <label htmlFor="descuento">% de descuento:</label>
          <input
            type="number"
            value={descuento}
            onChange={(e) => setdescuento(Number(e.target.value))}
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

        {/* Botón para exportar */}
        <button 
        type="button"
        className='boton-exportar'
        onClick={botonCotizar}>
            Exportar Cotizacion
            <span></span>
        </button>

        {mostrarExportar && <ExportarCotizacion />}

      </form>
    </div>
  );
};

export default Formulario;

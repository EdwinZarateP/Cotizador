import React, { useState } from 'react';  
import '../estilos/cotizarEnvio.css'

interface GenerarCotizacionProps {
  peso: number;
  declarado: number;
  costo: number;
  alto: number;
  largo: number;
  ancho: number;
  cajas: number;
}

const GenerarCotizacion: React.FC<GenerarCotizacionProps> = ({
  peso,
  declarado,
  costo,
  alto,
  largo,
  ancho,
  cajas,
}) => {
  
  let pesoSeleccionado: number | undefined;
  
  const [mostrarResultado, setmostrarResultado] = useState(false);

  const visualizarResultado = () => {
    if (!peso) {
      alert('Debes ingresar el peso en kg de tu caja');
      return;
    }

    if (!alto) {
      alert('Debes ingresar el alto de tu caja');
      return;
    }

    if (!largo) {
      alert('Debes ingresar el largo de tu caja');
      return;
    }

    if (!ancho) {
      alert('Debes ingresar el ancho de tu caja');
      return;
    }

    if (!declarado) {
      alert('Debes ingresar el valor declarado de tu mercancía');
      return;
    }
    
    if (!cajas) {
      alert('No indicasre el número de cajas del envío');
      return;
    }

    setmostrarResultado(!mostrarResultado);
    mostrarMensaje();
  };

  const mostrarMensaje = () => {
    const factorPeso = 400;
    const pesoVolumetrico = (alto / 100) * (largo / 100) * (ancho / 100) * factorPeso;
    let costoManejo = 1878;

    if (pesoVolumetrico > peso) {
      if (declarado * 0.005 < costoManejo) {
        pesoSeleccionado = pesoVolumetrico * costo + costoManejo;
      } else {
        pesoSeleccionado = pesoVolumetrico * costo + declarado * 0.005;
      }
    } else {
      if (declarado * 0.005 < costoManejo) {
        pesoSeleccionado = peso * costo + costoManejo;
      } else {
        pesoSeleccionado = peso * costo + declarado * 0.005;
      }
    }
  };

  mostrarMensaje(); // Realizar cálculo al inicio

  return (
    <div className='resultadoCotizacion'>

      <button className='botonCotizar' onClick={visualizarResultado}>
      {mostrarResultado ? 'Ocultar Cotización' : 'Cotizar Envío'}
      </button>

      {mostrarResultado && (
      <div className='resultado'>
        <h2>Resultado cotización</h2>

        {pesoSeleccionado !== undefined && (
          <div>
            <p>El costo por caja es de <br/> ${pesoSeleccionado.toFixed(0)}</p>
            <p>El envío de la(s) {cajas} cajas cuesta <br/> ${pesoSeleccionado * cajas}</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default GenerarCotizacion;

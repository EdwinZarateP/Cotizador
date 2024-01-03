import React from 'react';
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

      <button className='botonCotizar' onClick={mostrarMensaje}>
        Cotizar Envío
      </button>

      <div className='resultado'>
        <h2>Resultado cotización</h2>

        {pesoSeleccionado !== undefined && (
          <div>
            <p>El costo por caja es de <br/> ${pesoSeleccionado.toFixed(0)}</p>
            <p>El envío de la(s) {cajas} cajas cuesta <br/> ${pesoSeleccionado * cajas}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerarCotizacion;

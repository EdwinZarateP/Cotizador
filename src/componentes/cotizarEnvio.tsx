import React, { useState } from 'react';  
import '../estilos/cotizarEnvio.css'
import Swal from 'sweetalert2';

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
  
  let calculoCotizacion: number | undefined;
  
  const [mostrarResultado, setmostrarResultado] = useState(false);

  const visualizarResultado = () => {
    
    if (!costo) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor el destino',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!peso) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor ingrese el peso',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (peso < 2) {
      Swal.fire({
        icon: 'warning',
        title: 'El peso debe ser mayor a 2 kg',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }
    
    if (!alto) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor ingrese el alto de la caja',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!largo) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor ingrese el largo de la caja',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!ancho) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor ingrese el ancho de la caja',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!declarado) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor ingrese el valor declarado de la mercancía',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }
    
    if (declarado < 25000) {
      Swal.fire({
        icon: 'warning',
        title: 'El valor declarado debe ser mayor a 25000.',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!cajas) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor ingrese el número de cajas',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    
    setmostrarResultado(!mostrarResultado);
    mostrarMensaje();
  };

  const redondearMultiplo50 = (valor:number) => {
    return Math.round(valor / 50) * 50;
  };

  const mostrarMensaje = () => {
    const factorPeso = 400;
    const pesoVolumetrico = (alto / 100) * (largo / 100) * (ancho / 100) * factorPeso;
    let costoManejo = 1878;

    if (pesoVolumetrico > peso) {
      if (declarado * 0.005 < costoManejo) {
        calculoCotizacion = redondearMultiplo50 (pesoVolumetrico * costo + costoManejo);
      } else {
        calculoCotizacion = redondearMultiplo50(pesoVolumetrico * costo + declarado * 0.005);
      }
    } else {
      if (declarado * 0.005 < costoManejo) {
        calculoCotizacion = redondearMultiplo50(peso * costo + costoManejo);
      } else {
        calculoCotizacion = redondearMultiplo50(peso * costo + declarado * 0.005);
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

        {calculoCotizacion !== undefined && (
          <div>
            <p>El costo por caja es: <br/> ${calculoCotizacion.toLocaleString('es-CO')} </p>
            <p>El envío de la(s) {cajas} cajas cuesta:   <br/> ${(calculoCotizacion * cajas).toLocaleString('es-CO')}</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default GenerarCotizacion;

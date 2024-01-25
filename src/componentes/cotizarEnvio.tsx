import React, { useState } from 'react';
import '../estilos/cotizarEnvio.css';
import Swal from 'sweetalert2';
import { useFormularioContext } from '../contexto/Contexto';
const GenerarCotizacion: React.FC = () => {
  const {
    valorPesoMin,
    valorDeclarado,
    costoCombinacion,
    valorAlto,
    valorLargo,
    valorAncho,
    valorCajas,
    descuento,
    minimoKgUrbano,
    tipoCombinacion,
  } = useFormularioContext();

  let calculoCotizacion: number | undefined;
  let calculoCotizacionDescuento: number | undefined;

  const [mostrarResultado, setMostrarResultado] = useState(false);

  const visualizarResultado = () => {
    if (!costoCombinacion) {
      Swal.fire({
        icon: 'warning',
        title: 'Información incompleta de origen u destino',
        text: 'Por favor ingrese completos los datos de origen y destino',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!valorPesoMin) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta tu peso',
        text: 'Por favor ingrese el peso',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!valorAlto) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta la altura',
        text: 'Por favor ingrese el alto de la caja',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!valorLargo) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta el largo',
        text: 'Por favor ingrese el largo de la caja',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!valorAncho) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta el ancho',
        text: 'Por favor ingrese el ancho de la caja',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!valorDeclarado) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta el valor declarado',
        text: 'Por favor ingrese el valor declarado de la mercancía',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (!valorCajas) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta cantidad de cajas',
        text: 'Por favor ingrese el número de cajas de tu envío',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      return;
    }

    if (costoCombinacion === 3000) {
      Swal.fire({
        icon: 'warning',
        title: 'Ruta es Re-expedición',
        text: 'Lo sentimos, no tenemos disponible esa ruta en este momento, debemos generar una Re expedición para este destino',
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
    }

    setMostrarResultado(!mostrarResultado);
    mostrarMensaje();
  };

  const redondearMultiplo50 = (valor: number) => {
    return Math.ceil(valor / 50) * 50;
  };

  const mostrarMensaje = () => {
    const factorPeso = 400;
    const pesoVolumetrico = (valorAlto! / 100) * (valorLargo! / 100) * (valorAncho! / 100) * factorPeso;
    let costoManejo = 2500;

    const pesoCorregido =
    minimoKgUrbano === 0
      ? 30
      : valorCajas === 1 && Math.max(valorPesoMin || 0, minimoKgUrbano) < 30
      ? 30
      : Math.max(valorPesoMin || 30, minimoKgUrbano);
  
    const declarado = valorDeclarado !== undefined ? valorDeclarado : 500000;
    
    if (pesoVolumetrico > pesoCorregido) {
      if (declarado * 0.005 < costoManejo) {
        calculoCotizacion = redondearMultiplo50(pesoVolumetrico * costoCombinacion + costoManejo);
        calculoCotizacionDescuento = redondearMultiplo50(
          pesoVolumetrico * (costoCombinacion * ((100 - descuento) / 100)) + costoManejo
        );
      } else {
        calculoCotizacion = redondearMultiplo50(pesoVolumetrico * costoCombinacion + declarado * 0.005);
        calculoCotizacionDescuento = redondearMultiplo50(
          pesoVolumetrico * (costoCombinacion * ((100 - descuento) / 100)) + declarado * 0.005
        );
      }
    } else {
      if (declarado * 0.005 < costoManejo) {
        calculoCotizacion = redondearMultiplo50(pesoCorregido * costoCombinacion + costoManejo);
        calculoCotizacionDescuento = redondearMultiplo50(
          pesoCorregido * (costoCombinacion * ((100 - descuento) / 100)) + costoManejo
        );
      } else {
        calculoCotizacion = redondearMultiplo50(pesoCorregido * costoCombinacion + declarado * 0.005);
        calculoCotizacionDescuento = redondearMultiplo50(
          pesoCorregido * (costoCombinacion * ((100 - descuento) / 100)) + declarado * 0.005
        );
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
          <span className='carroEmoji' role='img' aria-label='carro'>
            🚛
          </span>
          <h2>Resultado cotización</h2>

          {calculoCotizacion !== undefined && calculoCotizacionDescuento !== undefined && (
            <div>
              <p>
                El costo por caja es: <br />{' '}
                <span className='negrita'>${calculoCotizacion.toLocaleString('es-CO')}</span>{' '}
              </p>
              <p>
                El envío de la(s) {valorCajas} cajas cuesta: <br />{' '}
                  <span className='negrita'> ${calculoCotizacion && valorCajas ? (calculoCotizacion * valorCajas).toLocaleString('es-CO') : 'N/A'}</span>{' '}

              </p>
              <p>
                El envío de la(s) {valorCajas} cajas cuesta con descuento: <br />{' '}
                <span className='negrita'> ${calculoCotizacionDescuento && valorCajas ? (calculoCotizacionDescuento * valorCajas).toLocaleString('es-CO') : 'N/A'}</span>{' '}
              </p>
              <p>{tipoCombinacion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenerarCotizacion;

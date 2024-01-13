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
  descuento: number;
}

const GenerarCotizacion: React.FC<GenerarCotizacionProps> = ({
  peso,
  declarado,
  costo,
  alto,
  largo,
  ancho,
  cajas,  
  descuento
}) => {
  
  let calculoCotizacion: number | undefined;
  let calculoCotizacionDescuento: number | undefined;
  
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

  const redondearMultiplo50 = (valor: number) => {
    return Math.ceil(valor / 50) * 50;
  };


  const mostrarMensaje = () => {
    const factorPeso = 400;
    const pesoVolumetrico = (alto / 100) * (largo / 100) * (ancho / 100) * factorPeso;
    let costoManejo = 1489;

    // Corregir el peso por 20 si es menor a 20
    const pesoCorregido = Math.max(peso, 20);

    if (pesoVolumetrico > pesoCorregido) {
      if (declarado * 0.005 < costoManejo) {
        calculoCotizacion = redondearMultiplo50 (pesoVolumetrico * costo + costoManejo);
        calculoCotizacionDescuento= redondearMultiplo50 ((pesoVolumetrico * (costo* ((100-descuento)/100)) + costoManejo));

      } else {
        calculoCotizacion = redondearMultiplo50(pesoVolumetrico * costo + declarado * 0.005);
        calculoCotizacionDescuento = redondearMultiplo50((pesoVolumetrico * (costo* ((100-descuento)/100)) + declarado * 0.005));

      }
    } else {
      if (declarado * 0.005 < costoManejo) {
        calculoCotizacion = redondearMultiplo50(pesoCorregido * costo + costoManejo);
        calculoCotizacionDescuento = redondearMultiplo50((pesoCorregido * (costo* ((100-descuento)/100)) + costoManejo));
        
      } else {
        calculoCotizacion = redondearMultiplo50(pesoCorregido * costo + declarado * 0.005);
        calculoCotizacionDescuento = redondearMultiplo50((pesoCorregido * (costo* ((100-descuento)/100)) + declarado * 0.005));
       
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
        <span className="carroEmoji" role="img" aria-label="carro">🚛</span>
        <h2>Resultado cotización</h2>
        
        {calculoCotizacion && calculoCotizacionDescuento !== undefined && (
          <div>
            <p>El costo por caja es: <br/> <span className="negrita">${calculoCotizacion.toLocaleString('es-CO')}</span> </p>
            <p>El envío de la(s) {cajas} cajas cuesta:   <br/> <span className="negrita">${(calculoCotizacion * cajas).toLocaleString('es-CO')}</span>  </p>
            <p>El envío de la(s) {cajas} cajas cuesta con descuento:   <br/> <span className="negrita">${(calculoCotizacionDescuento * cajas).toLocaleString('es-CO')}</span>  </p>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default GenerarCotizacion;

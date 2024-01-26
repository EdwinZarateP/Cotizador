import '../estilos/cotizar.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useFormularioContext } from '../contexto/Contexto';


//CREAMOS LA FORMULA PARA CALCULAR EL FLETE
const calcularFlete = (
    //AQUI COLOCAMOS LAS VARIABLES QUE RECIBIRA
    minimoKgUrbano: number,
    minimoKgNacional: number,
    promedioKgUrbano: number,
    promedioKgNacional: number,
    descuento: number,
    // anoVigencia: number,
    descuentoNacional: number,
    cobroMinDespachoUrbano: number,
    cobroMinCajaUrbano: number,
    tarifaIntegralUrbano: number,
    cobroMinDespachoNacional: number,
    cobroMinCajaNacional: number,
    tarifaIntegralNacional: number,
    costoCombinacion: number,
    tipoCombinacion: string,
    valorPesoMin: number | undefined,
    valorDeclarado: number | undefined,
    valorCajas: number | undefined,
    valorAlto: number | undefined,
    valorLargo: number | undefined,
    valorAncho: number | undefined

    ): number => {

    //PARA EVITAR ERRORES PONEMOS COMO CERO LAS VARIABLES QUE PUEDAN TENER CONFLICTOS
    if (valorCajas === undefined) {
        valorCajas = 0;}
    if (valorAlto === undefined) {
        valorCajas =0;}
    if (valorLargo === undefined) {
        valorLargo= 0;}
    if (valorAncho === undefined) {
        valorAncho= 0;}
    if (valorDeclarado === undefined) {
        valorDeclarado= 500000;}
    if (valorPesoMin === undefined) {
        valorPesoMin= 0;}
        
    //FORMULA PARA REDONDEAR A $50 PESOS
    const redondearMultiplo50 = (valor: number) => {
        return Math.ceil(valor / 50) * 50;
    };

    //CALCULAR COSTO MANEJO FINAL
    let costoManejo = 2500;
    const calcularManejo = (valor: number ): number => {
        if (valor * 0.005 < costoManejo) {
            return costoManejo;
        } else {
            return valor * 0.005;
        }
    };

    //CALCULAR PESO ELEGIDO
    const calcularPeso = (pesoUsuario: number, pesoMinAutorizado: number ): number => {
        
        //CONSTANTES
        const factorPeso = 400;
        const pesoVolumetrico = (valorAlto! / 100) * (valorLargo! / 100) * (valorAncho! / 100) * factorPeso;

        if (pesoUsuario  > pesoMinAutorizado) {
           if(pesoUsuario>pesoVolumetrico){
            return pesoUsuario;
           }
           else{
            return pesoVolumetrico;
           }
            
        } else {
            if(pesoMinAutorizado>pesoVolumetrico){
             return pesoMinAutorizado;
            }
            else{
             return pesoVolumetrico;
            }
        }
    };


    //LOGICA 1. tarifaIntegralNacional o tarifaIntegralUrbano es mayor a cero
    if (tarifaIntegralNacional > 0 && tipoCombinacion ==='NACIONAL') {
            return tarifaIntegralNacional * valorCajas;
        }
         else if (tarifaIntegralUrbano > 0 && (tipoCombinacion ==='URBANO' || tipoCombinacion ==='CIUDAD INTERMEDIA')) {
            return tarifaIntegralUrbano * valorCajas;
        }

        //LOGICA 2. cobroMinDespachoNacional o cobroMinCajaNacional es mayor a cero
        else if (cobroMinDespachoNacional > 0 && valorCajas>1 && tipoCombinacion ==='NACIONAL') {
            return cobroMinDespachoNacional * valorCajas;
        }
        else if (cobroMinCajaNacional > 0 && valorCajas===1 && tipoCombinacion ==='NACIONAL') {
            return cobroMinCajaNacional * valorCajas;
        }

        //LOGICA 3. cobroMinDespachoUrbano o cobroMinCajaUrbano es mayor a cero
        else if (cobroMinDespachoUrbano > 0 && valorCajas>1 && (tipoCombinacion ==='URBANO' || tipoCombinacion ==='CIUDAD INTERMEDIA')) {
            return redondearMultiplo50(cobroMinDespachoUrbano * valorCajas);
        }
        else if (cobroMinCajaUrbano > 0 && valorCajas===1 && (tipoCombinacion ==='URBANO' || tipoCombinacion ==='CIUDAD INTERMEDIA')) {
            return redondearMultiplo50(cobroMinCajaUrbano * valorCajas);
        }

        //LOGICA 4. promedioKgUrbano o promedioKgNacional es mayor a cero
        else if (promedioKgNacional > 0 && tipoCombinacion ==='NACIONAL') {
            return redondearMultiplo50(promedioKgNacional * valorCajas * costoCombinacion + calcularManejo(valorDeclarado));
        }
        else if (promedioKgUrbano > 0 && (tipoCombinacion ==='URBANO' || tipoCombinacion ==='CIUDAD INTERMEDIA')) {
            return redondearMultiplo50(promedioKgUrbano * valorCajas * costoCombinacion + calcularManejo(valorDeclarado));
        }

        //LOGICA 5. descuentoNacional, minimoKgNacional, valorPesoMin
        else if (minimoKgNacional > 0 && tipoCombinacion ==='NACIONAL' && valorCajas===1) {
            return redondearMultiplo50(calcularPeso(30,valorPesoMin)*valorCajas * costoCombinacion * ((100 - descuentoNacional) / 100) + calcularManejo(valorDeclarado))
        }
        else if (minimoKgNacional > 0 && tipoCombinacion ==='NACIONAL' && valorCajas>1) {
            return redondearMultiplo50(calcularPeso(minimoKgNacional,valorPesoMin)*valorCajas * costoCombinacion * ((100 - descuentoNacional) / 100) + calcularManejo(valorDeclarado))
        }

        //LOGICA 6. descuento, minimoKgUrbano, valorPesoMin
        else if (minimoKgUrbano > 0 && tipoCombinacion ==='URBANO' && valorCajas===1) {
            return redondearMultiplo50(calcularPeso(30,valorPesoMin)*valorCajas * costoCombinacion * ((100 - descuento) / 100) + calcularManejo(valorDeclarado))
        }
        else if (minimoKgUrbano > 0 && tipoCombinacion ==='URBANO' && valorCajas>1) {
            return redondearMultiplo50(calcularPeso(minimoKgUrbano,valorPesoMin)*valorCajas * costoCombinacion * ((100 - descuento) / 100) + calcularManejo(valorDeclarado))
        }

        //RE EXPEDICIONES
        else if (costoCombinacion ===3000) {
            return redondearMultiplo50(calcularPeso(30,valorPesoMin)*valorCajas * costoCombinacion   + calcularManejo(valorDeclarado))
        }

        else {
            return redondearMultiplo50(calcularPeso(30,valorPesoMin)*valorCajas * costoCombinacion   + calcularManejo(valorDeclarado))
        }
    };


const Cotizar = () => {
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const {
        minimoKgUrbano,
        minimoKgNacional,
        promedioKgUrbano,
        promedioKgNacional,
        descuento,
        // anoVigencia,
        descuentoNacional,
        cobroMinDespachoUrbano,
        cobroMinCajaUrbano,
        tarifaIntegralUrbano,
        cobroMinDespachoNacional,
        cobroMinCajaNacional,
        tarifaIntegralNacional,
        costoCombinacion,
        tipoCombinacion,
        valorPesoMin,
        valorDeclarado,
        valorCajas,
        valorAlto,
        valorLargo,
        valorAncho
    } = useFormularioContext();

    
    //LE MANDAMOS LOS PARAMETROS A LA FORMULA CREADA calcularFlete
    const flete = calcularFlete(
        minimoKgUrbano,
        minimoKgNacional,
        promedioKgUrbano,
        promedioKgNacional,
        descuento,
        // anoVigencia,
        descuentoNacional,
        cobroMinDespachoUrbano,
        cobroMinCajaUrbano,
        tarifaIntegralUrbano,
        cobroMinDespachoNacional,
        cobroMinCajaNacional,
        tarifaIntegralNacional,
        costoCombinacion,
        tipoCombinacion,
        valorPesoMin,
        valorDeclarado,
        valorCajas,
        valorAlto,
        valorLargo,
        valorAncho
        );

        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        });

        const dandoClick = () => {
            
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
                  title: 'La ruta es Re-expedición',
                  text: 'Lo sentimos, no tenemos disponible esa ruta en este momento, debemos generar una Re expedición para este destino',
                  allowOutsideClick: true,
                  allowEscapeKey: true,
                });
              }
          
            setMostrarResultado(true);
        };

    return (
        <div className='realizarCalculo'>
            <button className='botonCalcular' onClick={dandoClick}>
                Cotizar envío
            </button>

            <div className={`resultadoCalculo${mostrarResultado ? ' visible' : ''}`}>

                <span className='carroEmoji' role='img' aria-label='carro'>
                🚛
                </span>
                <h2>Resultado cotización</h2>

                <p>
                    El envío de la(s) {valorCajas} cajas con sus condiciones cuesta:<br/>
                    <span className='negrita'> {formatoMoneda.format(flete)} </span>
                </p>

            </div>

        </div>
    );
};

export default Cotizar;

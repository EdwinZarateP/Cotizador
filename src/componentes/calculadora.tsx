import '../estilos/calculadora.css'
import SelectorCiudad from './ciudad.tsx';
import SelectorPesos from './pesos.tsx';
import SelectorPesoMinyDec from './pesoMinyDeclarado.tsx';
import GenerarCotizacion from './cotizarEnvio.tsx';
import ExportarCotizacion from './exportarPDF.tsx';
import { useState } from 'react';


function Calculadora() {
  const [Descuento, setDescuento] = useState<number>(10);
 
  //medidas alto largo y ancho
  const [valorAlto, setvalorAlto] = useState<number | undefined>(undefined);
  const [valorLargo, setvalorLargo] = useState<number | undefined>(undefined);
  const [valorAncho, setvalorAncho] = useState<number | undefined>(undefined);
  //Peso minimo, valor declarado y cantidad de cajas
  const [valorPesoMin, setValorPesoMin] = useState<number | undefined>(undefined);
  const [valorDeclarado, setvalorDeclarado] = useState<number | undefined>(undefined);
  const [valorCajas, setvalorCajas] = useState<number | undefined>(undefined);
  
  //ciudad destino
  const [ciudadDestinoCosto, setCiudadDestinoCosto] = useState<string | undefined>(undefined);

  //Funciones de cambios de estado

  const handleDescuentoInputChange = (newDescuento: number) => {
    setDescuento(newDescuento);
  };

  const manejarCambioDeValorAlto = (nuevoValorAlto: number | undefined) => {
    setvalorAlto(nuevoValorAlto); // Actualiza el estado en el padre con el valor del hijo
  };

  const manejarCambioDeValorLargo = (nuevoValorLargo: number | undefined) => {
    setvalorLargo(nuevoValorLargo); // Actualiza el estado en el padre con el valor del hijo
  };

  const manejarCambioDeValorAncho = (nuevoValorAncho: number | undefined) => {
    setvalorAncho(nuevoValorAncho); // Actualiza el estado en el padre con el valor del hijo
  };

  const manejarCambioDeValorPesoMin = (nuevoValorPesoMin: number | undefined) => {
    setValorPesoMin(nuevoValorPesoMin); // Actualiza el estado en el padre con el valor del hijo
  };

  const manejarCambioDeValorDeclarado = (nuevoValorDeclarado: number | undefined) => {
    setvalorDeclarado(nuevoValorDeclarado); // Actualiza el estado en el padre con el valor declarado
  };

  const manejarCambioDeValorCajas = (nuevoValorCajas: number | undefined) => {
    setvalorCajas(nuevoValorCajas); // Actualiza el estado en el padre con el valor declarado
  };
  const manejarCambioDeCiudadDestino = (nuevaCiudadDestino: string | undefined) => {
    setCiudadDestinoCosto(nuevaCiudadDestino);
  };  

  return (
      <div className='contenedorCalculadora'>
        
        <h3>Aplique su descuento</h3>

        <ExportarCotizacion
        onDescuentoInputChange={handleDescuentoInputChange}/>

        <h3>Cotice el costo por caja aplicando el % descuento</h3>
        
        <SelectorCiudad 
        onCiudadDestinoChange={manejarCambioDeCiudadDestino}/>
        
        <SelectorPesos
        onValorAltoChange={manejarCambioDeValorAlto}
        onValorLargoChange={manejarCambioDeValorLargo}
        onValorAnchoChange={manejarCambioDeValorAncho}
        />

        <SelectorPesoMinyDec
        onValorPesoMinChange={manejarCambioDeValorPesoMin}
        onValorDeclaradoChange={manejarCambioDeValorDeclarado}
        onValorCajasChange={manejarCambioDeValorCajas}
        />

        <GenerarCotizacion
        peso={valorPesoMin ?? 0 }
        declarado={valorDeclarado ?? 0} 
        costo={Number(ciudadDestinoCosto)}
        alto={Number(valorAlto)}
        largo={Number(valorLargo)}
        ancho={Number(valorAncho)} 
        cajas={Number(valorCajas)}
        descuento={Descuento}
    
        />      
        
      </div>
    )
  }
  
  export default Calculadora
  
import '../estilos/calculadora.css'
import SelectorCiudad from './ciudad.tsx';
import SelectorPesos from './pesos.tsx';
import SelectorPesoMinyDec from './pesoMinyDeclarado.tsx';
import GenerarCotizacion from './cotizarEnvio.tsx';
import { useState } from 'react';
import { useFormularioContext } from '../contexto/Contexto';


function Calculadora() {
  
  // Usar el hook para obtener el contexto
  const { minimoKgUrbano, minimoKgNacional, descuento } = useFormularioContext();


  //medidas alto largo y ancho
  const [valorAlto, setvalorAlto] = useState<number | undefined>(undefined);
  const [valorLargo, setvalorLargo] = useState<number | undefined>(undefined);
  const [valorAncho, setvalorAncho] = useState<number | undefined>(undefined);
  
  //Peso minimo, valor declarado y cantidad de cajas
  const [valorPesoMin, setValorPesoMin] = useState<number | undefined>(undefined);
  const [valorDeclarado, setvalorDeclarado] = useState<number | undefined>(undefined);
  const [valorCajas, setvalorCajas] = useState<number | undefined>(undefined);

  //ciudad destino
  const [ciudadDestinoCosto, setCiudadDestinoCosto] = useState<number>(0);
  const [tipo, setTipo] = useState<string>('Nacional');
  
  //Funciones de cambios de estado

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
    setValorPesoMin(nuevoValorPesoMin); 
  };

  const manejarCambioDeValorDeclarado = (nuevoValorDeclarado: number | undefined) => {
    setvalorDeclarado(nuevoValorDeclarado); 
  };

  const manejarCambioDeValorCajas = (nuevoValorCajas: number | undefined) => {
    setvalorCajas(nuevoValorCajas); 
  };

  const guardarCostoEnVariable = (costo: number) => {
    setCiudadDestinoCosto(costo);
  };

  // Función de manejo para el tipo
  const handleGuardarTipo = (nuevoTipo: string) => {
    setTipo(nuevoTipo);
  };

  return (
      <div className='contenedorCalculadora'>
        
        <SelectorCiudad
        guardarCosto={guardarCostoEnVariable}
        guardarTipo={handleGuardarTipo}/>

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
        descuento={descuento}
        minKg={tipo === 'URBANO' || tipo === 'CIUDAD INTERMEDIA' ? minimoKgUrbano : minimoKgNacional}
        Tipo={tipo}

        />

      </div>
    )
  }

  export default Calculadora

import '../estilos/calculadora.css'
import SelectorCiudad from './ciudad.tsx';
import SelectorPesos from './pesos.tsx';
import SelectorPesoMinyDec from './pesoMinyDeclarado.tsx';
import GenerarCotizacion from './cotizarEnvio.tsx';
import { useState } from 'react';


function Calculadora() {
  
  const [valorPesoMin, setValorPesoMin] = useState<number | undefined>(undefined);
  const [valorDeclarado, setvalorDeclarado] = useState<number | undefined>(undefined);

  const manejarCambioDeValorPesoMin = (nuevoValorPesoMin: number | undefined) => {
    setValorPesoMin(nuevoValorPesoMin); // Actualiza el estado en el padre con el valor del hijo
  };

  const manejarCambioDeValorDeclarado = (nuevoValorDeclarado: number | undefined) => {
    setvalorDeclarado(nuevoValorDeclarado); // Actualiza el estado en el padre con el valor declarado
  };


  return (
      <div className='contenedorCalculadora'>

        <SelectorCiudad/>
        <SelectorPesos/>
        <SelectorPesoMinyDec
        onValorPesoMinChange={manejarCambioDeValorPesoMin}
        onValorDeclaradoChange={manejarCambioDeValorDeclarado}/>

        <GenerarCotizacion/>      

        <div>
            el peso minimo es {valorPesoMin} *{valorDeclarado}
        </div>


      </div>
    )
  }
  
  export default Calculadora
  
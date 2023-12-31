import '../estilos/calculadora.css'
import SelectorCiudad from './ciudad.tsx';
import SelectorPesos from './pesos.tsx';
import SelectorPesoMinyDec from './pesoMinyDeclarado.tsx';
import GenerarCotizacion from './cotizarEnvio.tsx';
import { useState } from 'react';


function Calculadora() {
  
  const [valorPesoMin, setValorPesoMin] = useState<number | undefined>(undefined);
  const [valorDeclarado, setvalorDeclarado] = useState<number | undefined>(undefined);
  const [ciudadDestinoCosto, setCiudadDestinoCosto] = useState<string | undefined>(undefined);

  const manejarCambioDeValorPesoMin = (nuevoValorPesoMin: number | undefined) => {
    setValorPesoMin(nuevoValorPesoMin); // Actualiza el estado en el padre con el valor del hijo
  };

  const manejarCambioDeValorDeclarado = (nuevoValorDeclarado: number | undefined) => {
    setvalorDeclarado(nuevoValorDeclarado); // Actualiza el estado en el padre con el valor declarado
  };

  const manejarCambioDeCiudadDestino = (nuevaCiudadDestino: string | undefined) => {
    setCiudadDestinoCosto(nuevaCiudadDestino);
  };


  return (
      <div className='contenedorCalculadora'>

        <SelectorCiudad 
        onCiudadDestinoChange={manejarCambioDeCiudadDestino}/>
        
        <SelectorPesos/>

        <SelectorPesoMinyDec
        onValorPesoMinChange={manejarCambioDeValorPesoMin}
        onValorDeclaradoChange={manejarCambioDeValorDeclarado}/>

        <GenerarCotizacion
        peso={valorPesoMin ?? 0 }
        declarado={valorDeclarado ?? 0} 
        costo={Number(ciudadDestinoCosto)}
        />      

        <div>
            el peso minimo es {(valorPesoMin  ?? 0) * (valorDeclarado  ?? 0)} y
            tiene un costo {ciudadDestinoCosto}
        </div>


      </div>
    )
  }
  
  export default Calculadora
  
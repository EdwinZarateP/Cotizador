import '../estilos/calculadora.css'
import SelectorCiudad from './ciudad.tsx';
import SelectorMedidas from './medidas.tsx';
import SelectorPesoMinyDec from './pesoMinyDeclarado.tsx';
import GenerarCotizacion from './cotizarEnvio.tsx';

function Calculadora() {

  return (
      <div className='contenedorCalculadora'>
        
        <SelectorCiudad/>

        <SelectorMedidas/>

        <SelectorPesoMinyDec />

        <GenerarCotizacion

        />
      </div>
    )
  }

  export default Calculadora

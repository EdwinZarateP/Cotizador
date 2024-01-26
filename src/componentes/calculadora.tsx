import '../estilos/calculadora.css'
import SelectorCiudad from './ciudad.tsx';
import SelectorMedidas from './medidas.tsx';
import SelectorPesoMinyDec from './pesoMinyDeclarado.tsx';
import Cotizar from './cotizar.tsx';

function Calculadora() {

  return (
      <div className='contenedorCalculadora'>
        
        <SelectorCiudad/>

        <SelectorMedidas/>

        <SelectorPesoMinyDec />
        
        <Cotizar/>
      </div>
    )
  }

  export default Calculadora

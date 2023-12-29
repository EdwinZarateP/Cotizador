import '../estilos/calculadora.css'
import SelectorCiudad from './ciudad.tsx';
import SelectorPesos from './pesos.tsx';
import SelectorPesoMinyDec from './pesoMinyDeclarado.tsx';
import botonCotizacion from './botonCotizar.tsx';



function Calculadora() {

   const mostrarMensaje = () => {
   alert('😀😀  🤣 Hola');
   };

  return (
      <div className='contenedorCalculadora'>
        
        <SelectorCiudad/>
        <SelectorPesos/>
        <SelectorPesoMinyDec/>
        {/* <botonCotizacion/> */}
        
        <button 
        className='botonCotizar'
        onClick={mostrarMensaje}>
          Cotizar Envio
        </button>

        {/* <botonCotizacion/> */}
        
        

      </div>
    )
  }
  
  export default Calculadora
  
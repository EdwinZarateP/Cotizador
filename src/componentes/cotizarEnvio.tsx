interface GenerarCotizacionProps {
  peso: number;
  declarado:number;
  costo: number;

}

const GenerarCotizacion: React.FC<GenerarCotizacionProps> = ({ peso, declarado, costo }) => {

  const mostrarMensaje = () => {
    alert(`El envío tiene un costo de $: ${peso * declarado * costo}`);
  };
   
     return (
       
       <div>
         
         <button 
           className='botonCotizar'
           onClick={mostrarMensaje}>
           Cotizar Envio
           </button> 
   
       </div>
    );
  };
  
  export default GenerarCotizacion;
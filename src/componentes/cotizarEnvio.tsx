interface GenerarCotizacionProps {
  peso: number;
  declarado:number;
  costo: number;

}

const GenerarCotizacion: React.FC<GenerarCotizacionProps> = ({ peso, declarado, costo }) => {

  const mostrarMensaje = () => {
    alert(`El peso es: ${peso * declarado * costo}`);
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
const GenerarCotizacion = () => {

  const mostrarMensaje = () => {
    alert('😀😀  🤣 Hola');
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
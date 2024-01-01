interface GenerarCotizacionProps {
  peso: number;
  declarado:number;
  costo: number;
  alto:number;
  largo:number;
  ancho:number;
  cajas:number;
}

const GenerarCotizacion: React.FC<GenerarCotizacionProps> = ({ peso, declarado, costo ,alto, largo, ancho, cajas }) => {

  const mostrarMensaje = () => {
    const factorPeso = 400;
    let pesoSeleccionado:number;
    const pesoVolumetrico = ((alto/100) * (largo/100) * (ancho/100) * factorPeso);
    let costoManejo=1878;

    if (pesoVolumetrico > peso) {

      if (declarado*0.005 < costoManejo) {
        pesoSeleccionado = pesoVolumetrico  * costo + costoManejo;
      }else {
        pesoSeleccionado = pesoVolumetrico * costo + declarado*0.005;
        }

    } else {
      if (declarado*0.005 < costoManejo) {
        pesoSeleccionado = peso  * costo + costoManejo;
      }else {
        pesoSeleccionado = peso * costo + declarado*0.005;
        }
    }

    alert(`el valor declarado aplicando el 0.5% es ${declarado*0.005}, 
     y el valor estandar es ${costoManejo} por lo cual se escogió el mayor entre los dos.
     El envío tiene un peso volumetrico de $:${pesoVolumetrico.toFixed(1)},
     y un peso de ${peso}, por lo cual se escoge el mayor entre los dos.
     El costo para esta ciudad por kg es ${costo}. por tanto el
     costo por caja es de $ ${pesoSeleccionado.toFixed(0)}, el envío de la(s) ${cajas} cajas cuesta 
     $ ${(pesoSeleccionado*cajas).toFixed(0)}`);
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
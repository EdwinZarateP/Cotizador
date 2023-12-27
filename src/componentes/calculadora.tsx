import '../estilos/calculadora.css'
import SelectorCiudad from './ciudad.tsx';


function Calculadora() {
  
  const mostrarMensaje = () => {
    alert('😀 Estimado Nestor , si diste clic 🤣 te cuento que no es tan fácil llegar a este punto, sigo trabajando en ello. Posdata, ya Juan envió el rfi al proveedor escala, quienes se comunicaron conmigo para darnos respuesta lo mas pronto');
  };

  return (
      <div className='contenedorCalculadora'>
        
        <SelectorCiudad/>



        





















        {/* <div className='ciudadOrigen'>
        <Select 
        placeholder="Ciudad destino"
        options={ciudades}/>     
        </div> */}

        <div className='contenedorPesos'>
          <input type="text" placeholder="Alto (cm)" className='ingresosPesos'/>
          <input type="text" placeholder="Largo (cm)" className='ingresosPesos'/>
          <input type="text" placeholder="Ancho (cm)" className='ingresosPesos'/>
        </div>

        <input type="text" placeholder="Peso minimo: 2 kg" className='ingresosDatos'/>
        <input type="text" placeholder="Valor declarado: Mínimo $5.000" className='ingresosDatos'/>

        <button 
        className='botonCotizar'
        onClick={mostrarMensaje}>
          Cotizar Envio
        </button>
      </div>
    )
  }
  
  export default Calculadora
  
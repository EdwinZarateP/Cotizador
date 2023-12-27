import '../estilos/calculadora.css'

function Calculadora() {
  const mostrarMensaje = () => {
    alert('Cotización en proceso');
  };

    return (
      <div className='contenedorCalculadora'>

        <input type="text" placeholder="Ciudad origen" className='ingresosDatos'/>
        <input type="text" placeholder="Ciudad destino" className='ingresosDatos'/>

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
  
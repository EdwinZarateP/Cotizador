import '../estilos/calculadora.css'
import SelectorCiudad from './ciudad.tsx';
import { useState } from 'react';

function Calculadora() {

  const mostrarMensaje = () => {
    alert('😀 Estimado Nestor , si diste clic 🤣 te cuento que no es tan fácil llegar a este punto, sigo trabajando en ello. Posdata, ya Juan envió el rfi al proveedor escala, quienes se comunicaron conmigo para darnos respuesta lo mas pronto');
  };

  //Valor del Alto
  const [value, setValue] = useState<number | undefined>(undefined);
  const manejarAlto = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = parseFloat(event.target.value);

  if (!isNaN(inputValue) && inputValue >= 0) {
    setValue(inputValue);
  } else {
    setValue(undefined);
  }};

  //Valor del largo
  const [valorLargo, setvalorLargo] = useState<number | undefined>(undefined);
  const manejarLargo = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputValueLargo = parseFloat(event.target.value);
  
    if (!isNaN(inputValueLargo) && inputValueLargo >= 0) {
      setvalorLargo(inputValueLargo);
    } else {
      setvalorLargo(undefined);
    }};

    //Valor del largo
  const [valorAncho, setvalorAncho] = useState<number | undefined>(undefined);
  const manejarAncho = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputValueAncho = parseFloat(event.target.value);
  
    if (!isNaN(inputValueAncho) && inputValueAncho >= 0) {
      setvalorAncho(inputValueAncho);
    } else {
      setvalorAncho(undefined);
    }};

  return (
      <div className='contenedorCalculadora'>
        
        <SelectorCiudad/>

        <div className='contenedorPesos'>

          <input type="number" min='0' placeholder="Alto (cm)"
           className='ingresosPesos' onChange={manejarAlto}
           value={value === undefined ? '' : value}/>

          <input type="number" min='0' placeholder="Largo (cm)"
           className='ingresosPesos' onChange={manejarLargo}
           value={valorLargo === undefined ? '' : valorLargo}/>
          
          <input type="number" min='0' placeholder="Ancho (cm)"
           className='ingresosPesos' onChange={manejarAncho}
           value={valorAncho === undefined ? '' : valorAncho}/>
        
        </div>

        <input type="number" min='2' placeholder="Peso minimo: 2 kg" className='ingresosDatos'/>
        
        <input type="number" min='0' placeholder="Valor declarado: Mínimo $5.000" className='ingresosDatos'/>

        <button 
        className='botonCotizar'
        onClick={mostrarMensaje}>
          Cotizar Envio
        </button>
      </div>
    )
  }
  
  export default Calculadora
  
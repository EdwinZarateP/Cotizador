import { useState } from 'react';


const SelectorPesos: React.FC = () => {

  //Valor del Alto
  const [valorAlto, setvalorAlto] = useState<number | undefined>(undefined);
  const manejarAlto = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputvalorAlto = parseFloat(event.target.value);

  if (!isNaN(inputvalorAlto) && inputvalorAlto>= 0) {
    setvalorAlto(inputvalorAlto);
  } else {
    setvalorAlto(undefined);
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

        <div className='contenedorPesos'>

        <input type="number" min='0' placeholder="Alto (cm)"
         className='ingresosPesos' onChange={manejarAlto}
         value={valorAlto === undefined ? '' : valorAlto}/>

        <input type="number" min='0' placeholder="Largo (cm)"
         className='ingresosPesos' onChange={manejarLargo}
         value={valorLargo === undefined ? '' : valorLargo}/>
        
        <input type="number" min='0' placeholder="Ancho (cm)"
         className='ingresosPesos' onChange={manejarAncho}
         value={valorAncho === undefined ? '' : valorAncho}/>
      
      </div>
      
    )
};

export default SelectorPesos;

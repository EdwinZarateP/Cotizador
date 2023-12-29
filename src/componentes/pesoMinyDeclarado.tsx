import { useState } from 'react';


const SelectorPesoMinyDec: React.FC = () => {

   //Valor Peso minimo
  const [valorPesoMin, setvalorLargo] = useState<number | undefined>(undefined);
  const manejarvalorPesoMin = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputvalorPesoMin = parseFloat(event.target.value);
  
    if (!isNaN(inputvalorPesoMin) && inputvalorPesoMin >= 0) {
      setvalorLargo(inputvalorPesoMin);
    } else {
      setvalorLargo(undefined);
    }};

    //Valor declarado
  const [valorDeclarado, setvalorDeclarado] = useState<number | undefined>(undefined);
  const manejarvalorDeclarado = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputvalorDeclarado = parseFloat(event.target.value);
  
    if (!isNaN(inputvalorDeclarado) && inputvalorDeclarado >= 0) {
      setvalorDeclarado(inputvalorDeclarado);
    } else {
      setvalorDeclarado(undefined);
    }};

    return (

        <div className='contenedorPesos'>

        <input type="number" min='2' placeholder="Peso minimo: 2 kg"
         className='ingresosDatos' onChange={manejarvalorPesoMin}
         value={valorPesoMin === undefined ? '' : valorPesoMin}/>

        <input type="number" min='2' placeholder="Valor declarado"
         className='ingresosDatos' onChange={manejarvalorDeclarado}
         value={valorDeclarado === undefined ? '' : valorDeclarado}/>

        {/* <input type="number" min='0' placeholder="Valor declarado: Mínimo $5.000" className='ingresosDatos'/> */}

      </div>
      
    )
};

export default SelectorPesoMinyDec;

import { useState } from 'react';

interface SelectorPesoMinyDecProps {
  onValorPesoMinChange: (nuevoValor: number | undefined) => void;
  onValorDeclaradoChange: (nuevoValor: number | undefined) => void;
  onValorCajasChange: (nuevoValor: number | undefined) => void;
  
}

const SelectorPesoMinyDec: React.FC <SelectorPesoMinyDecProps> = ({ onValorPesoMinChange, onValorDeclaradoChange, onValorCajasChange}) => {

   //Valor Peso minimo
  const [valorPesoMin, setPesoMin] = useState<number | undefined>(undefined);
  const manejarvalorPesoMin = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputvalorPesoMin = parseFloat(event.target.value);
  
    if (!isNaN(inputvalorPesoMin) && inputvalorPesoMin >= 0) {
      setPesoMin(inputvalorPesoMin);
      onValorPesoMinChange(inputvalorPesoMin);
    } else {
      setPesoMin(undefined);
      onValorPesoMinChange(undefined); 
    }};

    //Valor declarado
  const [valorDeclarado, setvalorDeclarado] = useState<number | undefined>(undefined);
  const manejarvalorDeclarado = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputvalorDeclarado = parseFloat(event.target.value);
  
    if (!isNaN(inputvalorDeclarado) && inputvalorDeclarado >= 0) {
      setvalorDeclarado(inputvalorDeclarado);
      onValorDeclaradoChange(inputvalorDeclarado);
    } else {
      setvalorDeclarado(undefined);
      onValorDeclaradoChange(undefined);
    }};

    //Valor cajas
  const [valorCajas, setvalorCajas] = useState<number | undefined>(undefined);
  const manejarvalorCajas = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputvalorCajas = parseFloat(event.target.value);
  
    if (!isNaN(inputvalorCajas) && inputvalorCajas >= 0) {
      setvalorCajas(inputvalorCajas);
      onValorCajasChange(inputvalorCajas);
    } else {
      setvalorCajas(undefined);
      onValorCajasChange(undefined);
    }};

    return (

        <div className='contenedorPesos'>

        <input 
          type="number" min='2'
         placeholder="Peso minimo: 2 kg"
         className='ingresosDatos' 
         onChange={manejarvalorPesoMin}
         value={valorPesoMin === undefined ? '' : valorPesoMin}/>

        <input type="number" min='0' 
         placeholder="Valor declarado mínimo $25.000"
         className='ingresosDatos' 
         onChange={manejarvalorDeclarado}
         value={valorDeclarado === undefined ? '' : valorDeclarado}/>

        <input type="number" min='0' 
         placeholder="Minimo 1 caja"
         className='ingresosDatos' 
         onChange={manejarvalorCajas}
         value={valorCajas === undefined ? '' : valorCajas}/>


      </div>
      
    )
};

export default SelectorPesoMinyDec;

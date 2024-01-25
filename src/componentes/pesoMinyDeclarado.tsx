import React from 'react';
import { useFormularioContext } from '../contexto/Contexto';
import '../estilos/pesoMinyDeclarado.css';

const SelectorPesoMinyDec: React.FC = () => {
  const {
    valorPesoMin,
    setValorPesoMin,
    valorDeclarado,
    setValorDeclarado,
    valorCajas,
    setValorCajas,
  } = useFormularioContext();

  const manejarValorPesoMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValorPesoMin = parseFloat(event.target.value);

    if (!isNaN(inputValorPesoMin) && inputValorPesoMin >= 2) {
      setValorPesoMin(inputValorPesoMin);
    } else {
      setValorPesoMin(undefined);
    }
  };

  const manejarValorDeclarado = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValorDeclarado = parseFloat(event.target.value);

    if (!isNaN(inputValorDeclarado) && inputValorDeclarado >= 0) {
      setValorDeclarado(inputValorDeclarado);
    } else {
      setValorDeclarado(undefined);
    }
  };

  const manejarValorCajas = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValorCajas = parseFloat(event.target.value);

    if (!isNaN(inputValorCajas) && inputValorCajas >= 1) {
      setValorCajas(inputValorCajas);
    } else {
      setValorCajas(undefined);
    }
  };

  return (
    <div className="contenedorPesos">
      <input
        type="number"
        min="2"
        placeholder="Peso mínimo: 2 kg"
        className="ingresosDatos"
        onChange={manejarValorPesoMin}
        value={valorPesoMin === undefined ? '' : valorPesoMin}
      />

      <input
        type="number"
        min="0"
        placeholder="$ Valor declarado"
        className="ingresosDatos"
        onChange={manejarValorDeclarado}
        value={valorDeclarado === undefined ? '' : valorDeclarado}
      />

      <input
        type="number"
        min="1"
        placeholder="Mínimo 1 caja"
        className="ingresosDatos"
        onChange={manejarValorCajas}
        value={valorCajas === undefined ? '' : valorCajas}
      />
    </div>
  );
};

export default SelectorPesoMinyDec;

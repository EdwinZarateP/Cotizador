import React from 'react';
import { useFormularioContext } from '../contexto/Contexto';
import '../estilos/pesos.css';

const SelectorMedidas: React.FC = () => {
  const {
    valorAlto,
    valorLargo,
    valorAncho,
    setValorAlto,
    setValorLargo,
    setValorAncho,
  } = useFormularioContext();

  const manejarAlto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValorAlto = parseFloat(event.target.value);

    if (!isNaN(inputValorAlto) && inputValorAlto >= 0) {
      setValorAlto(inputValorAlto);
    } else {
      setValorAlto(undefined);
    }
  };

  const manejarLargo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValorLargo = parseFloat(event.target.value);

    if (!isNaN(inputValorLargo) && inputValorLargo >= 0) {
      setValorLargo(inputValorLargo);
    } else {
      setValorLargo(undefined);
    }
  };

  const manejarAncho = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValorAncho = parseFloat(event.target.value);

    if (!isNaN(inputValorAncho) && inputValorAncho >= 0) {
      setValorAncho(inputValorAncho);
    } else {
      setValorAncho(undefined);
    }
  };

  return (
    <div className="contenedorPesos">
      <input
        type="number"
        min="0"
        placeholder="Alto (cm)"
        className="ingresosPesos"
        onChange={manejarAlto}
        value={valorAlto === undefined ? '' : valorAlto}
      />

      <input
        type="number"
        min="0"
        placeholder="Largo (cm)"
        className="ingresosPesos"
        onChange={manejarLargo}
        value={valorLargo === undefined ? '' : valorLargo}
      />

      <input
        type="number"
        min="0"
        placeholder="Ancho (cm)"
        className="ingresosPesos"
        onChange={manejarAncho}
        value={valorAncho === undefined ? '' : valorAncho}
      />
    </div>
  );
};

export default SelectorMedidas;

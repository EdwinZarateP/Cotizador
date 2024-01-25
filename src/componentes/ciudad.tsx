import React, { useEffect } from 'react';
import Select from 'react-select';
import { useFormularioContext } from '../contexto/Contexto';
import { ciudades } from './data';
import { ciudadesCombinadas } from './CombinacionesCiudades';
import '../estilos/ciudad.css';

interface SelectorCiudadProps {
  // ... Otras props
}

const SelectorCiudad: React.FC<SelectorCiudadProps> = () => {
  const {
    ciudadOrigen,
    ciudadDestino,
    setCiudadOrigen,
    setCiudadDestino,
    costoCombinacion,
    tipoCombinacion,
    setCostoCombinacion,
    setTipoCombinacion,
  } = useFormularioContext();

  const opcionesCiudades = ciudades.map((ciudad) => ({
    label: ciudad.nombre,
    value: ciudad.nombre,
  }));

  useEffect(() => {
    obtenerCostoCombinacion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ciudadOrigen, ciudadDestino]); // Se ejecuta cuando cambian ciudadOrigen o ciudadDestino

  const handleCiudadOrigenChange = (selectedOption: { label: string; value: string } | null) => {
    setCiudadOrigen(selectedOption);
  };

  const handleCiudadDestinoChange = (selectedOption: { label: string; value: string } | null) => {
    setCiudadDestino(selectedOption);
  };

  const obtenerCostoCombinacion = () => {
    if (ciudadOrigen && ciudadDestino) {
      const combinacion = `${ciudadOrigen.value} / ${ciudadDestino.value}`;

      const combinacionEncontrada = ciudadesCombinadas.find(
        (c) => c.combinacion === combinacion
      );

      if (combinacionEncontrada) {
        setCostoCombinacion(combinacionEncontrada.costo);
        setTipoCombinacion(combinacionEncontrada.Tipo);
      } else {
        setCostoCombinacion(3000);
        setTipoCombinacion('');
      }
    }
  };

  return (
    <div>
      <Select
        className="ciudad"
        value={ciudadOrigen}
        onChange={handleCiudadOrigenChange}
        options={opcionesCiudades}
        placeholder="Ciudad Origen"
      />
      <Select
        className="ciudad"
        value={ciudadDestino}
        onChange={handleCiudadDestinoChange}
        options={opcionesCiudades}
        placeholder="Ciudad Destino"
      />
      <p>TARIFA Kg: ${ciudadOrigen && ciudadDestino ? costoCombinacion : 3000}</p>
      {ciudadOrigen && ciudadDestino && <p>Tipo: {tipoCombinacion}</p>}
    </div>
  );
};

export default SelectorCiudad;

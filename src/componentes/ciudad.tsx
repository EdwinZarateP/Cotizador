import { useState, useEffect } from 'react';
import Select from 'react-select';
import { ciudades } from './data';
import { ciudadesCombinadas } from './CombinacionesCiudades';
import '../estilos/ciudad.css'


interface SelectorCiudadProps {
  guardarCosto: (costo: number) => void;
}

const SelectorCiudad: React.FC<SelectorCiudadProps> = ({ guardarCosto }) => {
  const [ciudadOrigen, setCiudadOrigen] = useState<{ label: string; value: string } | null>(null);
  const [ciudadDestino, setCiudadDestino] = useState<{ label: string; value: string } | null>(null);
  const [costoCombinacion, setCostoCombinacion] = useState(0);

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
    console.log(costoCombinacion)
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
        guardarCosto(combinacionEncontrada.costo);
      } else {
        setCostoCombinacion(3000);
        guardarCosto(3000);
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
      <p>Costo Combinación: {costoCombinacion}</p>
    </div>
  );
};

export default SelectorCiudad;

import React, { useState } from 'react';
import Select from 'react-select';
import { ciudades } from './data';
import '../estilos/ciudad.css'

interface Ciudad {
  nombre: string;
  costo: number;
}

interface SelectorCiudadProps {
  onCiudadDestinoChange: (ciudad: string) => void;
}

const SelectorCiudad: React.FC<SelectorCiudadProps> = ({ onCiudadDestinoChange }) => {

  const [OrigenSeleccionado, setOrigenSeleccionado] = useState<Ciudad | null>(null);
  const [DestinoSeleccionado, setDestinoSeleccionado] = useState<Ciudad | null>(null);

  const manejarCiudadOrigen = (opcionSeleccionada: any) => {
    setOrigenSeleccionado(opcionSeleccionada.value);
    console.log(OrigenSeleccionado)
  };

  const manejarCiudadDestino = (opcionSeleccionada: any) => {
    setDestinoSeleccionado(opcionSeleccionada.value);
    onCiudadDestinoChange(opcionSeleccionada.value.costo);
    console.log(DestinoSeleccionado)
  };

  return (
    <div>

      <Select
        className="ciudad"
        placeholder="Ciudad Origen"
        options={ciudades.map(ciudad => ({ value: ciudad, label: ciudad.nombre }))}
        onChange={manejarCiudadOrigen}
      />

      <Select
        className="ciudad"
        placeholder="Ciudad Destino"
        options={ciudades.map(ciudad => ({ value: ciudad, label: ciudad.nombre }))}
        onChange={manejarCiudadDestino}
      />

      {/* <div className='ciudades-seleccionadas'>
        {OrigenSeleccionado && (
          <div className='ciudad-seleccionada'>
            <p><span className="negrita">Origen: <br /> </span>  {OrigenSeleccionado.nombre}</p>
          </div>
        )}

        {DestinoSeleccionado && (
          <div className='ciudad-seleccionada ciudad-seleccionada-destino'>
            <p><span className="negrita">Destino: <br /> </span> {DestinoSeleccionado.nombre}</p>
          </div>
        )}

      </div> */}
      

    </div>
  );
};

export default SelectorCiudad;

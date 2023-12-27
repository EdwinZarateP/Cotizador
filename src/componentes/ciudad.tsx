import React, { useState } from 'react';
import Select from 'react-select';
import { ciudades } from './data';
import '../estilos/ciudad.css'

interface Ciudad {
  nombre: string;
  costo: number;
}

const SelectorCiudad: React.FC = () => {

  const [OrigenSeleccionado, setOrigenSeleccionado] = useState<Ciudad | null>(null);
  const [DestinoSeleccionado, setDestinoSeleccionado] = useState<Ciudad | null>(null);

  const manejarCiudadOrigen = (opcionSeleccionada: any) => {
    // `opcionSeleccionada` es el objeto de la ciudad seleccionada
    setOrigenSeleccionado(opcionSeleccionada.value);
  };

  const manejarCiudadDestino = (opcionSeleccionada: any) => {
    // `opcionSeleccionada` es el objeto de la ciudad seleccionada
    setDestinoSeleccionado(opcionSeleccionada.value);
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
        placeholder="Destino"
        options={ciudades.map(ciudad => ({ value: ciudad, label: ciudad.nombre }))}
        onChange={manejarCiudadDestino}
      />    

      <div className='ciudades-seleccionadas'>
        {OrigenSeleccionado && ( 
          <div className='ciudad-seleccionada'>
            {/* <h3>Ruta:</h3> */}
            <p><span className="negrita">Origen: <br /> </span>  {OrigenSeleccionado.nombre}</p>
          </div>
        )}

        {DestinoSeleccionado && (
          <div className='ciudad-seleccionada ciudad-seleccionada-destino'>
            <p><span className="negrita">Destino: <br /> </span> {DestinoSeleccionado.nombre}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectorCiudad;

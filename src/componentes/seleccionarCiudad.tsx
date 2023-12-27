import React, { useState } from 'react';
import '../estilos/seleccionarCiudad.css'
// import { ciudades } from './data';

// Definición del tipo para una ciudad
type Ciudad = {
  nombre: string;
  costo: number;
};

const SeleccionarCiudad: React.FC = () => {
  // Lista de ciudades
  const ciudades: Ciudad[] = [
    {nombre:'AGUA DE DIOS - CUNDINAMARCA', costo:1},
    {nombre:'AGUACHICA - CESAR', costo:2},
    {nombre:'ANDALUCIA - VALLE DEL CAUCA', costo:3},
    {nombre:'APARTADO - ANTIOQUIA', costo:5},
    {nombre:'ARAUCA - ARAUCA', costo:6},
    {nombre:'ARMENIA - ANTIOQUIA', costo:7},
    {nombre:'ARMENIA - QUINDIO', costo:8},
    {nombre:'BARBOSA - ANTIOQUIA', costo:9},
    {nombre:'BARRANQUILLA - ATLANTICO', costo:10},
    {nombre:'YUMBO - VALLE DEL CAUCA', costo:11},
    {nombre:'ZIPAQUIRA - CUNDINAMARCA', costo:12}
  ];

  // Estado para almacenar la ciudad seleccionada
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<Ciudad | null>(null);

  // Función para manejar el cambio de la ciudad seleccionada
  const handleSeleccionarCiudad = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const ciudadIndex = event.target.value;
    setCiudadSeleccionada(ciudades[parseInt(ciudadIndex, 10)]);
  };

  return (
    <div>
      {/* <h2>Selecciona una ciudad:</h2> */}
      <select className='origen'
      onChange={handleSeleccionarCiudad}>
        <option value="">Selecciona una ciudad</option>
        {ciudades.map((ciudad, index) => (
          <option key={index} value={index}>
            {ciudad.nombre}
          </option>
        ))}
      </select>
      {ciudadSeleccionada && (
        <div>
          <h3>Ciudad seleccionada: {ciudadSeleccionada.nombre}</h3>
          <p>costo: {ciudadSeleccionada.costo}</p>
        </div>
      )}
    </div>
  );
};

export default SeleccionarCiudad;

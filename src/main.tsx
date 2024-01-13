// Componente Padre
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Imagen from './componentes/titulo.tsx';
import Calculadora from './componentes/calculadora.tsx';
import Header from './componentes/header.tsx';
import './index.css';

const App = () => {
  const [inputValorClave, setInputValorClave] = useState('');

  const manejarCambioClave = (value: string) => {
    setInputValorClave(value);
    console.log(inputValorClave);
  };

  return (
    <React.StrictMode>
      <div className="contenedorPrincipal">
        <Header onInputChange={manejarCambioClave} />
        <Imagen />
        <Calculadora clave={inputValorClave} />
      </div>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

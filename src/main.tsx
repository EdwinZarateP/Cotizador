// Componente Padre
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Imagen from './componentes/titulo.tsx';
import Calculadora from './componentes/calculadora.tsx';
import Header from './componentes/header.tsx';
import Formulario from './componentes/formulario.tsx';
import './index.css';
import { FormularioProvider } from './contexto/Contexto.tsx';
import { Clientes } from './componentes/clientes.tsx';
import ClienteActivo from './componentes/clienteActivo.tsx';

const App = () => {
  const [inputValorClave, setInputValorClave] = useState('');

  const manejarCambioClave = (value: string) => {
    setInputValorClave(value);
    console.log(inputValorClave);
  };

  // Encuentra la clave válida y almacénala en la variable claveValida
  const claveValida = Clientes.find(
    (clave) => clave.clave === inputValorClave && (clave.tipo === "comercial" || clave.tipo === "cliente" || clave.tipo === "gerente")
  );

  return (
    <FormularioProvider>
      <React.StrictMode>
        <div className="contenedorPrincipal">
          <Header onInputChange={manejarCambioClave} />
          
          <Imagen />

          {claveValida && (claveValida.tipo === "comercial" || claveValida.tipo === "gerente") && <Formulario />}
          
          {claveValida && claveValida.tipo === "cliente" && <ClienteActivo />}

          <Calculadora />

          {/* <ExcelExportComponent/> */}
        
        </div>
      </React.StrictMode>
    </FormularioProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

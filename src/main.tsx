  // Componente Padre
  import React, { useState } from 'react';
  import ReactDOM from 'react-dom/client';
  import Imagen from './componentes/titulo.tsx';
  import Calculadora from './componentes/calculadora.tsx';
  import Header from './componentes/header.tsx';
  import Formulario from './componentes/formulario.tsx';
  import './index.css';
  import { FormularioProvider,  } from './contexto/Contexto.tsx';
  import { Claves } from './componentes/claves.tsx'

  const App = () => {
    const [inputValorClave, setInputValorClave] = useState('');

    const manejarCambioClave = (value: string) => {
      setInputValorClave(value);
      console.log(inputValorClave);
    };

    // Verifica si inputValorClave está en el array de claves
    const claveValida = Claves.some((clave) => clave.clave === inputValorClave);


    return (

      <FormularioProvider>

        <React.StrictMode>
        
          <div className="contenedorPrincipal">
            <Header onInputChange={manejarCambioClave} />
            <Imagen />
            {claveValida && <Formulario />}
            <Calculadora />
          
          </div>

        </React.StrictMode>
        
      </FormularioProvider>
    );
  };

  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

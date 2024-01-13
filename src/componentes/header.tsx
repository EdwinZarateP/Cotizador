import { useState } from 'react';
import '../estilos/header.css'
import InputClave from './clave.tsx';

const Header = ({ onInputChange }: { onInputChange: (value: string) => void }) => {

  const [inputValorClave, setInputValorClave] = useState('');

  const manejarCambioClave = (value: string) => {
    setInputValorClave(value);
    onInputChange(value); // Llama a la función del padre
    console.log(inputValorClave);
  };

  return (
    <header className='encabezado'>

      <div className='centrar-titulo'>
        <h1>Cotizador de paqueteo </h1>
        
      </div> 

      <div className='alinear-derecha'>
        <InputClave onInputChange={manejarCambioClave}/>
        
      </div>
      
    </header>
  );
};

export default Header;
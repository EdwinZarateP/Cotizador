import { useState } from 'react';
import '../estilos/header.css'
import InputClave from './clave.tsx';

const Header = () => {

  const [inputValorClave, setInputValorClave] = useState('');

  const manejarCambioClave = (value: string) => {
    setInputValorClave(value);
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
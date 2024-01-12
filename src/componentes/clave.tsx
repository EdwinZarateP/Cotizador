import React, { useState } from 'react';
import '../estilos/clave.css'

const InputClave: React.FC<{ onInputChange: (value: string) => void }> = ({ onInputChange }) => {
  const [inputValorClave, setInputValorClave] = useState('');

  const manejarCambioClave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Verificar si la longitud es 4 antes de actualizar el estado
    if (value.length <= 4) {
    setInputValorClave(value);
      onInputChange(value);
    }
  };

  return (
    <input
      className='inputClave'
      type="text"
      value={inputValorClave}
      onChange={manejarCambioClave}
      maxLength={4}
      placeholder="Token"
    />
  );
};

export default InputClave;

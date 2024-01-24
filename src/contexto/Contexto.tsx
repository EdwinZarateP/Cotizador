import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormularioContextType {
  nombreComercial: string;
  cliente: string;
  nitCliente: string; 
  minimoKgUrbano: number; 
  minimoKgNacional: number;
  descuento:number;
  anoVigencia: number; 
  descuentoNacional:number;
  setNombreComercial: React.Dispatch<React.SetStateAction<string>>;
  setCliente: React.Dispatch<React.SetStateAction<string>>;
  setNitCliente: React.Dispatch<React.SetStateAction<string>>; 
  setMinimoKgUrbano: React.Dispatch<React.SetStateAction<number>>; 
  setMinimoKgNacional: React.Dispatch<React.SetStateAction<number>>;
  setdescuento: React.Dispatch<React.SetStateAction<number>>;
  setAnoVigencia: React.Dispatch<React.SetStateAction<number>>;
  setdescuentoNacional: React.Dispatch<React.SetStateAction<number>>; 
}

interface FormularioProviderProps {
  children: ReactNode;
}

// Creamos el contexto
const FormularioContext = createContext<FormularioContextType | undefined>(undefined);

// Proporcionamos un componente envolvente para que los descendientes tengan acceso al contexto
export const FormularioProvider: React.FC<FormularioProviderProps> = ({ children }) => {
  const [nombreComercial, setNombreComercial] = useState('');
  const [cliente, setCliente] = useState('');
  const [nitCliente, setNitCliente] = useState(''); 
  const [minimoKgUrbano, setMinimoKgUrbano] = useState<number>(30);
  const [minimoKgNacional, setMinimoKgNacional] = useState<number>(30);
  const [descuento, setdescuento] = useState<number>(0); 
  const [anoVigencia, setAnoVigencia] = useState<number>(2024); 
  const [descuentoNacional, setdescuentoNacional] = useState<number>(0); 

  // Proporcionamos el valor del contexto
  const contextValue: FormularioContextType = {
    nombreComercial,
    cliente,
    nitCliente,
    minimoKgUrbano,
    minimoKgNacional,
    descuento,
    anoVigencia,
    descuentoNacional,
    setNombreComercial,
    setCliente,
    setNitCliente,
    setMinimoKgUrbano,
    setMinimoKgNacional,
    setdescuento,
    setAnoVigencia,
    setdescuentoNacional
  };

  return (
    <FormularioContext.Provider value={contextValue}>
      {children}
    </FormularioContext.Provider>
  );
};

// Creamos un hook personalizado para acceder al contexto
export const useFormularioContext = (): FormularioContextType => {
  const context = useContext(FormularioContext);
  if (!context) {
    throw new Error('useFormularioContext debe ser utilizado dentro de un FormularioProvider');
  }
  return context;
};

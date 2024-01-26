import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormularioContextType {
  // provienen del formulario
  nombreComercial: string;
  cliente: string;
  nitCliente: string; 
  minimoKgUrbano: number; 
  minimoKgNacional: number;
  promedioKgNacional: number;
  promedioKgUrbano: number;
  descuento:number;
  anoVigencia: number; 
  descuentoNacional:number;
  cobroMinDespachoUrbano :number;
  cobroMinCajaUrbano :number;
  tarifaIntegralUrbano:number;
  cobroMinDespachoNacional:number;
  cobroMinCajaNacional:number;
  tarifaIntegralNacional:number;
  addValorem:number;
  diasCartera:number;
  setNombreComercial: React.Dispatch<React.SetStateAction<string>>;
  setCliente: React.Dispatch<React.SetStateAction<string>>;
  setNitCliente: React.Dispatch<React.SetStateAction<string>>; 
  setMinimoKgUrbano: React.Dispatch<React.SetStateAction<number>>; 
  setMinimoKgNacional: React.Dispatch<React.SetStateAction<number>>;
  setPromedioKgUrbano: React.Dispatch<React.SetStateAction<number>>;
  setPromedioKgNacional: React.Dispatch<React.SetStateAction<number>>;
  setdescuento: React.Dispatch<React.SetStateAction<number>>;
  setAnoVigencia: React.Dispatch<React.SetStateAction<number>>;
  setdescuentoNacional: React.Dispatch<React.SetStateAction<number>>; 
  setCobroMinDespachoUrbano:React.Dispatch<React.SetStateAction<number>>; 
  setCobroMinCajaUrbano:React.Dispatch<React.SetStateAction<number>>;
  setTarifaIntegralUrbano:React.Dispatch<React.SetStateAction<number>>;
  setCobroMinDespachoNacional:React.Dispatch<React.SetStateAction<number>>;
  setCobroMinCajaNacional:React.Dispatch<React.SetStateAction<number>>;
  setTarifaIntegralNacional:React.Dispatch<React.SetStateAction<number>>;
  setAddValorem:React.Dispatch<React.SetStateAction<number>>;
  setDiasCartera:React.Dispatch<React.SetStateAction<number>>;


  // variables de medidas
  valorAlto: number | undefined;
  valorLargo: number | undefined;
  valorAncho: number | undefined;
  setValorAlto: React.Dispatch<React.SetStateAction<number | undefined>>;
  setValorLargo: React.Dispatch<React.SetStateAction<number | undefined>>;
  setValorAncho: React.Dispatch<React.SetStateAction<number | undefined>>;

  // variables del ciudad
  ciudadOrigen: { label: string; value: string } | null;
  ciudadDestino: { label: string; value: string } | null;
  costoCombinacion: number;
  tipoCombinacion: string;
  setCiudadOrigen: React.Dispatch<React.SetStateAction<{ label: string; value: string } | null>>;
  setCiudadDestino: React.Dispatch<React.SetStateAction<{ label: string; value: string } | null>>;
  setCostoCombinacion: React.Dispatch<React.SetStateAction<number>>;
  setTipoCombinacion: React.Dispatch<React.SetStateAction<string>>;

  // variables del peso y declarado
  valorPesoMin: number| undefined;
  valorDeclarado: number| undefined;
  valorCajas: number| undefined;
  setValorDeclarado: React.Dispatch<React.SetStateAction<number | undefined>>;
  setValorPesoMin: React.Dispatch<React.SetStateAction<number | undefined>>;
  setValorCajas: React.Dispatch<React.SetStateAction<number | undefined>>;



  //variables claves
  clave: string;
  setClave: React.Dispatch<React.SetStateAction<string>>;
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
  const [minimoKgUrbano, setMinimoKgUrbano] = useState<number>(0);
  const [minimoKgNacional, setMinimoKgNacional] = useState<number>(0);
  const [promedioKgNacional, setPromedioKgNacional] = useState<number>(0);
  const [promedioKgUrbano, setPromedioKgUrbano] = useState<number>(0);
  const [descuento, setdescuento] = useState<number>(0); 
  const [anoVigencia, setAnoVigencia] = useState<number>(2024); 
  const [descuentoNacional, setdescuentoNacional] = useState<number>(0);
  const [cobroMinDespachoUrbano, setCobroMinDespachoUrbano] = useState<number>(0); 
  const [cobroMinCajaUrbano, setCobroMinCajaUrbano] = useState<number>(0); 
  const [tarifaIntegralUrbano, setTarifaIntegralUrbano] = useState<number>(0); 
  const [cobroMinDespachoNacional, setCobroMinDespachoNacional] = useState<number>(0); 
  const [cobroMinCajaNacional, setCobroMinCajaNacional] = useState<number>(0); 
  const [tarifaIntegralNacional, setTarifaIntegralNacional] = useState<number>(0); 
  const [addValorem, setAddValorem] = useState<number>(0); 
  const [diasCartera, setDiasCartera] = useState<number>(0);

   // Nuevas variables de medidas
  const [valorAlto, setValorAlto] = useState<number | undefined>(undefined);
  const [valorLargo, setValorLargo] = useState<number | undefined>(undefined);
  const [valorAncho, setValorAncho] = useState<number | undefined>(undefined);

  // Variables del ciudad
  const [ciudadOrigen, setCiudadOrigen] = useState<{ label: string; value: string } | null>(null);
  const [ciudadDestino, setCiudadDestino] = useState<{ label: string; value: string } | null>(null);
  const [costoCombinacion, setCostoCombinacion] = useState(0);
  const [tipoCombinacion, setTipoCombinacion] = useState('');

  // variables del peso y declarado
  const [valorPesoMin, setValorPesoMin] = useState<number | undefined>(undefined);
  const [valorDeclarado, setValorDeclarado] = useState<number | undefined>(undefined);
  const [valorCajas, setValorCajas] = useState<number | undefined>(undefined);

  //variables claves
  const [clave, setClave] = useState('');
  
  // Proporcionamos el valor del contexto
  const contextValue: FormularioContextType = {
    nombreComercial,
    cliente,
    nitCliente,
    minimoKgUrbano,
    minimoKgNacional,
    promedioKgUrbano,
    promedioKgNacional,
    descuento,
    anoVigencia,
    descuentoNacional,
    cobroMinDespachoUrbano,
    cobroMinCajaUrbano,
    tarifaIntegralUrbano,
    cobroMinDespachoNacional,
    cobroMinCajaNacional,
    tarifaIntegralNacional,
    addValorem,
    diasCartera,
    setNombreComercial,
    setCliente,
    setNitCliente,
    setMinimoKgUrbano,
    setMinimoKgNacional,
    setPromedioKgUrbano,
    setPromedioKgNacional,
    setdescuento,
    setAnoVigencia,
    setdescuentoNacional,
    setCobroMinDespachoUrbano,
    setCobroMinCajaUrbano,
    setTarifaIntegralUrbano,
    setCobroMinDespachoNacional,
    setCobroMinCajaNacional,
    setTarifaIntegralNacional,
    setAddValorem,
    setDiasCartera,

     // variables del medidas
     valorAlto,
     valorLargo,
     valorAncho,
     setValorAlto,
     setValorLargo,
     setValorAncho,

     // Variables del ciudad
    ciudadOrigen,
    ciudadDestino,
    costoCombinacion,
    tipoCombinacion,
    setCiudadOrigen,
    setCiudadDestino,
    setCostoCombinacion,
    setTipoCombinacion,

    // variables del peso y declarado
    valorPesoMin,
    valorDeclarado,
    valorCajas,
    setValorCajas,
    setValorPesoMin,
    setValorDeclarado,

    //variables claves
    clave,
    setClave,

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




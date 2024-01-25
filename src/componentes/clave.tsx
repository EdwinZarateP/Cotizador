// Importa las bibliotecas necesarias
import { useFormularioContext } from '../contexto/Contexto';
import '../estilos/clave.css';
import { Clientes } from './clientes.tsx';

// Definición del componente InputClave
const InputClave: React.FC<{ onInputChange: (value: string) => void }> = ({ onInputChange }) => {
  // Utiliza el contexto para acceder a los valores y funciones necesarios
  const { clave, setClave, setNombreComercial, setCliente,setNitCliente,
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
    setDiasCartera } = useFormularioContext();

  // Maneja el cambio en el campo de clave
  const manejarCambioClave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Verifica si la longitud es menor o igual a 6 antes de actualizar el estado
    if (value.length <= 6) {
      // Actualiza la clave en el contexto
      setClave(value);

      // Busca el cliente correspondiente a la clave
      const clienteEncontrado = Clientes.find(cliente => cliente.clave === value);

      setCliente(clienteEncontrado?.nombre || "Nombre no encontrado");
      setNombreComercial(clienteEncontrado?.nombreComercial || "Comercial no encontrado");
      setNitCliente(clienteEncontrado?.nitCliente || "NIT no encontrado");
      setMinimoKgUrbano(clienteEncontrado?.minimoKgUrbano || 0);
      setPromedioKgUrbano(clienteEncontrado?.promedioKgUrbano || 0);
      setdescuento(clienteEncontrado?.descuento || 0);
      setCobroMinDespachoUrbano(clienteEncontrado?.cobroMinDespachoUrbano || 0);
      setCobroMinCajaUrbano(clienteEncontrado?.cobroMinCajaUrbano || 0);
      setTarifaIntegralUrbano(clienteEncontrado?.tarifaIntegralUrbano || 0);
      setMinimoKgNacional(clienteEncontrado?.minimoKgNacional || 0);
      setPromedioKgNacional(clienteEncontrado?.promedioKgNacional || 0);
      setAnoVigencia(clienteEncontrado?.anoVigencia || 0);
      setdescuentoNacional(clienteEncontrado?.descuentoNacional || 0);
      setCobroMinDespachoNacional(clienteEncontrado?.cobroMinDespachoNacional || 0);
      setCobroMinCajaNacional(clienteEncontrado?.cobroMinCajaNacional || 0);
      setTarifaIntegralNacional(clienteEncontrado?.tarifaIntegralNacional || 0);
      setAddValorem(clienteEncontrado?.addValorem || 0)
      setDiasCartera(clienteEncontrado?.diasCartera || 0);
      
      // Llama a la devolución de llamada proporcionada con el valor actualizado
      onInputChange(value);
    }
  };

  // Renderiza el componente de entrada de clave
  return (
    <div>
      <input
        className='inputClave'
        type="password"
        value={clave}
        onChange={manejarCambioClave}
        maxLength={6}
        placeholder="Token"
      />
    </div>
  );
};

export default InputClave;

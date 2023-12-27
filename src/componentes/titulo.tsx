import '../estilos/titulo.css'

const Imagen = () => {
  const imagenUrl = 'https://integralogistica.com/wp-content/uploads/2017/08/logo-nuevo-integra-logistica.png'; // URL de la imagen

  return (
    <div className='contenedorLogo'>
      <img src={imagenUrl} 
      alt="logoIntegra"
      className="logoIntegra"
      />
    </div>
  );
};

export default Imagen;
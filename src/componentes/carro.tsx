
import { useState, useEffect } from 'react';
import '../estilos/carro.css'

const Car = () => {
  const [position, setPosition] = useState<number>(-100); // Estado para la posición horizontal del automóvil
  const [direction, setDirection] = useState<number>(2); // Estado para la dirección del movimiento (izquierda o derecha)
  const carWidth = 50; // Ancho del automóvil

  useEffect(() => {
    const screenWidth = 450;
    const interval = setInterval(() => {
      // Verificar si el automóvil llega al borde izquierdo o derecho de la pantalla
      if (position <= 0) {
        setDirection(1); // Cambiar la dirección a la derecha
      } else if (position + carWidth >= screenWidth) {
        setDirection(-1); // Cambiar la dirección a la izquierda
      }

      // Actualizar la posición del automóvil según la dirección actual
      setPosition(prevPosition => prevPosition + (5 * direction)); // Velocidad de movimiento: 5px/frame
    }, 40); // Intervalo de tiempo para actualizar la posición (50ms)

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [position, direction]);

  return (
    <div className="car" style={{ left: `${position}px` }}>
      🚛{/* Puedes reemplazar este emoji con una imagen de un automóvil */}
    </div>
  );
};

export default Car;

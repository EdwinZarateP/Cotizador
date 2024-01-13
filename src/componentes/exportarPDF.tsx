// ExportarCotizacion.tsx
import React, { useState } from 'react';
import { Document, Page, Text, View, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { ciudades } from './data';
import { estilosParaExportar } from './estilosExportar'; // Importa los estilos desde el nuevo archivo
import '../estilos/exportarPDF.css';
import logoImage from '../imagenes/logo.png'; // Importa la imagen desde tu carpeta local
import firmaCarlos from '../imagenes/FirmaCarlos.png'; // Importa la imagen desde tu carpeta local


const ExportarCotizacion: React.FC <{ onDescuentoInputChange: (newDescuento: number) => void }> = ({ onDescuentoInputChange }) => {
  
  const [descuentoInput, setDescuentoInput] = useState<number | 0>(0);
  const ManejarDescuentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      const newDescuento = Number(value);
      setDescuentoInput(newDescuento);
      onDescuentoInputChange(newDescuento)
    }
  };

  const generateTable = (descuento: number) => (
    ciudades.map((ciudad, index) => (
      <View key={index} style={estilosParaExportar.tableRow}>
        <Text style={estilosParaExportar.tableCol}>{ciudad.nombre}</Text>
        <Text style={estilosParaExportar.tableCol}>${ciudad.costo}</Text>
        <Text style={estilosParaExportar.tableCol}>
          ${Math.ceil(ciudad.costo * (1 - (descuento / 100)))}
        </Text>
      </View>
    ))
  );


  const pad = (num: number): string => {
    return num < 10 ? '0' + num : num.toString();
  };

  const today = new Date();

  const formattedDate = `${pad(today.getDate())}-${pad(today.getMonth() + 1)}-${today.getFullYear()}`;
  const fileName = `Cotizacion_${formattedDate}.pdf`;

  
  
  let MyDocument = null;

  if (descuentoInput !== 0) {
    MyDocument = (
      <Document>
        <Page size="A4" style={estilosParaExportar.page}>
          <View style={estilosParaExportar.section}>
            
          {/* Encabezado con imagen */}
          <View style={estilosParaExportar.header}>
            <Image src={logoImage} style={estilosParaExportar.logo} />
          </View>


            <Text style={estilosParaExportar.title}>Cotización paqueteo Integra</Text>
            <Text style={estilosParaExportar.subtitle}>Fecha: {formattedDate}</Text>
            
            <Text style={estilosParaExportar.paragraph}>
              Apreciado Cliente, {"\n"} {"\n"}
              Esta oferta considera ser servicio de paqueteo, con los siguientes requisitos:{"\n"}{"\n"}
              1. PAQUETEO URBANO COMERCIAL (DE ACUERDO CON TABLA N.1 COSTOS 
              POR KG CON DESCUENTO DEL {descuentoInput}%) {"\n"}{"\n"}
              
              1.1 Despachos de una (1) unidad {"\n"} {"\n"}

              Se cobrará 20 Kg mínimos por caja.{"\n"} {"\n"}
              
              1.2 Despachos de dos o más unidades {"\n"}{"\n"}
              Se cobrarán de acuerdo con el tipo de caja:{"\n"}{"\n"}
              {`\u2022`} Tipo A 16 Kg por cada caja{"\n"}
              {`\u2022`} Tipo B 20 Kg por cada caja{"\n"}{"\n"}

              Para efectos de la relación peso-volumen, se cobrará de acuerdo con los estándares establecidos para 
              tal fin, (1 M3=400 Kg), se cobrará el mayor entre los dos.{"\n"}{"\n"}

              TABLA N.1 COSTOS POR Kg CON DESCUENTO DEL {descuentoInput}% 

            </Text>
           
            <View style={estilosParaExportar.table}>
              <View style={estilosParaExportar.tableRow}>
                <Text style={estilosParaExportar.tableColHeader}> Ciudad </Text>
                <Text style={estilosParaExportar.tableColHeader}> Costo Original </Text>
                <Text style={estilosParaExportar.tableColHeader}> Costo con Descuento </Text>
              </View>
              {generateTable(Number(descuentoInput))}
            </View>

            <Text style={estilosParaExportar.paragraph}>
              {"\n"}
              1.3 Costo de manejo paqueteo urbano y nacional {"\n"} {"\n"}
              
              Se liquidará a una tasa del 0.5%, sobre la totalidad del valor declarado de sus cargamentos con un valor no inferior a:{"\n"}{"\n"}
             
              {`\u2022`} $ 1.878 por caja para el Servicio Nacional{"\n"}
              {`\u2022`} $ 1.489 por caja para el Servicio Urbano{"\n"}{"\n"}{"\n"}{"\n"}

              2.   RECOGIDAS EN DESTINATARIO URBANO Y NACIONAL{"\n"}{"\n"}
              
              Se cobrará 30 Kg mínimo por despacho (hasta 1 unidad), y a partir de este 25 Kg mínimo por
              unidad.{"\n"}{"\n"}

              NOTA:  Se  cobrará  $  66.804  adicionales  al  valor  de  los  20  kg  mínimos  por  despacho  
              (hasta  1 unidad),  a  partir  del  segundo  intento  fallido,  en  los  casos  de  que  no  se  efectúe
              la  recogida  por responsabilidades ajenas a la operación de INTEGRA.{"\n"}{"\n"}
        
              3.   DEVOLUCIONES {"\n"}{"\n"}
              En caso de que se presenten devoluciones de pedidos, por causas ajenas a nosotros (Ej.: pedido
              no solicitado, pedido repetido, orden de compra vencida, etc.) las mismas se cobrarán de acuerdo
              con los siguientes parámetros: Si el destinatario que originó la devolución se halla en una 
              ciudad, el flete de la devolución se asimilará con el flete urbano de dicha ciudad, pero si el
              destinatario se halla en una población distante de la ciudad de origen del despacho,
              el valor del flete se asimilará con el flete establecido para dicho servicio entre
              aquellas (ciudad-población), para poder realizar la entrega nuevamente{"\n"}{"\n"}
              
              3.1 NOTAS:{"\n"}{"\n"}

              Una vez tramitada y solucionada la novedad de la devolución o recogida el tiempo máximo que 
              Solistica almacenara sus productos en nuestra bodega de devoluciones es de 72 horas. A partir 
              de la siguiente hora se procederá a almacenar la mercancía al área de almacenamiento temporal el
              cual tendrá un costo de: 4 días a 15 días a razón de $ 36.858 por estiba ocupada.A partir del día
              16 se cobrara $73.717 mensual por estiba ocupada.{"\n"}{"\n"}

              4.   REEXPEDICIONES {"\n"}{"\n"}

              Se cobrará a razón de 30 Kg mínimo por unidad, y el 1% adicional por Costo de Manejo, del valor
              declarado de sus mercancías con un mínimo por caja de $6.593.oo valor por kg $ 2.397 
              (Correspondientes a las entregas en ciudades o poblaciones no indicadas en la tabla de tarifas
              origen/destino).{"\n"}{"\n"}{"\n"}{"\n"}

            </Text>
            
            {/* imagen de la firma */}
          <View style={estilosParaExportar.footerImage}>
            <Image src={firmaCarlos} style={estilosParaExportar.firma} />
          </View>

          </View>
        </Page>
      </Document>
    );
  }

  return (
    <div className='contenedorDescuento'>
      <div>
      <h3>Aplique el % descuento que desea:</h3>
        <input
          type="number" min='0' 
          placeholder="Ingrese % de descuento"
          onChange={ManejarDescuentoChange}
          style={estilosParaExportar.input}
          value={descuentoInput}
        />
        <p>Aqui podrá descargar la cotización en PDF con su descuento por Kg</p>        
      </div>
      <div className='inputDescargar'>
        {MyDocument && (
          <PDFDownloadLink 
            document={MyDocument}
            fileName={fileName}
            style={{
              textDecoration: 'none', // Quita el subrayado del enlace
              backgroundColor: '#AED035', // Aplica un fondo al enlace
              padding: '10px', // Añade un espacio alrededor del enlace
              color: 'white', // Cambia el color del texto del enlace 
                           
            }}
            >
            {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
};

export default ExportarCotizacion;

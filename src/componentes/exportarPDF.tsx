// ExportarCotizacion.tsx
import React, { useState } from 'react';
import { Document, Page, Text, View, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { estilosParaExportar } from './estilosExportar'; // Importa los estilos desde el nuevo archivo
import '../estilos/exportarPDF.css';
import logoImage from '../imagenes/logo.png'; // Importa la imagen desde tu carpeta local
import firmaCarlos from '../imagenes/FirmaCarlos.png'; // Importa la imagen desde tu carpeta local
import { ciudadesCombinadas } from './CombinacionesCiudades';

const ExportarCotizacion: React.FC <{
   onDescuentoInputChange: (newDescuento: number) => void,
   onMinimoKgInputChange: (newMinimoKg: number) => void
  }> = ({ onDescuentoInputChange, onMinimoKgInputChange }) => {
  
  const [descuentoInput, setDescuentoInput] = useState<number | 0>(0);
  const [minimoKgInput, setMinimoKgInput] = useState<number | 0>(0); // Nuevo estado para el mínimo de Kg


  const ManejarDescuentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      const newDescuento = Number(value);
      setDescuentoInput(newDescuento);
      onDescuentoInputChange(newDescuento)
    }
  };

  const ManejarMinimoKgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      const newMinimoKg = Number(value);
      setMinimoKgInput(newMinimoKg);
      onMinimoKgInputChange(newMinimoKg);
    }
  };

  const generateTable = (descuento: number) => {
    const ciudadesUnicas = [...new Set(ciudadesCombinadas.map(ciudad => ciudad.destino))].sort();
  
    const tableRows = ciudadesUnicas.map((ciudad, index) => {
      
      const indexOfDash = ciudad.indexOf('-');
      const truncatedDestino = indexOfDash !== -1 ? ciudad.slice(0, indexOfDash + 5) : ciudad;
      const bogotaData = ciudadesCombinadas.find(c => c.destino === ciudad && c.origen === 'BOGOTA, D.C. - BOGOTA, D.C.');
      const medellinData = ciudadesCombinadas.find(c => c.destino === ciudad && c.origen === 'MEDELLIN - ANTIOQUIA');
      const barranquillaData = ciudadesCombinadas.find(c => c.destino === ciudad && c.origen === 'BARRANQUILLA - ATLANTICO');
      const caliData = ciudadesCombinadas.find(c => c.destino === ciudad && c.origen === 'CALI - VALLE DEL CAUCA');
      const bucaramangaData = ciudadesCombinadas.find(c => c.destino === ciudad && c.origen === 'BUCARAMANGA - SANTANDER');

      return (
        <View key={index} style={estilosParaExportar.tableRow}>
          <Text style={estilosParaExportar.tableCol}>{truncatedDestino}</Text>
  
          {bogotaData ? (
            <>
              <Text style={estilosParaExportar.tableCol}>
                ${Math.ceil(bogotaData.costo * (1 - (descuento / 100)))}
              </Text>
            </>
          ) : (
            <Text style={estilosParaExportar.tableCol}>-</Text>
          )}
  
          {medellinData ? (
            <>
              <Text style={estilosParaExportar.tableCol}>
                ${Math.ceil(medellinData.costo * (1 - (descuento / 100)))}
              </Text>
            </>
          ) : (
            <Text style={estilosParaExportar.tableCol}>-</Text>
          )}

          {caliData ? (
            <>
              <Text style={estilosParaExportar.tableCol}>
                ${Math.ceil(caliData.costo * (1 - (descuento / 100)))}
              </Text>
            </>
          ) : (
            <Text style={estilosParaExportar.tableCol}>-</Text>
          )}

          
          {barranquillaData ? (
            <>
              <Text style={estilosParaExportar.tableCol}>
                ${Math.ceil(barranquillaData.costo * (1 - (descuento / 100)))}
              </Text>
            </>
          ) : (
            <Text style={estilosParaExportar.tableCol}>-</Text>
          )}

          {bucaramangaData ? (
            <>
              <Text style={estilosParaExportar.tableCol}>
                ${Math.ceil(bucaramangaData.costo * (1 - (descuento / 100)))}
              </Text>
            </>
          ) : (
            <Text style={estilosParaExportar.tableCol}>-</Text>
          )}

        </View>
      );
    });
  
    return tableRows;
  };



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

              Se tomarán {minimoKgInput} Kg mínimos por caja.              
              Para efectos de la relación peso-volumen, se cobrará de acuerdo con los estándares establecidos para 
              tal fin, (1 M3=400 Kg), se cobrará el mayor entre los dos.

            </Text>
                       
            <View style={estilosParaExportar.table}>
            <Text style={estilosParaExportar.tableTitle}>TABLA N.1 COSTOS POR Kg CON DESCUENTO DEL {descuentoInput}%</Text>
              <View style={estilosParaExportar.tableRow}>
                <Text style={estilosParaExportar.tableColHeader}> Destino / Origen  </Text>
                <Text style={estilosParaExportar.tableColHeader}> BOGOTA, D.C </Text>
                <Text style={estilosParaExportar.tableColHeader}> MEDELLIN </Text>
                <Text style={estilosParaExportar.tableColHeader}> CALI </Text>
                <Text style={estilosParaExportar.tableColHeader}> BARRANQUILLA </Text>
                <Text style={estilosParaExportar.tableColHeader}> BUCARAMANGA </Text>
              </View>
              {generateTable(Number(descuentoInput))}
            </View>
            <Text style={estilosParaExportar.tableTitleAdicionales}>ZONAS METROPOLITANAS</Text>
            <Text style={estilosParaExportar.tableAdicionales}>

            Para estos Municipios se cobrara la tarifa de la ciudad capital de la zona metropolitana 
            a la cual corresponden.{"\n"}{"\n"}

            BOGOTA: CAJICA, CHIA, COTA, FACATATIVA, FUNZA, LA CALERA
            MADRID, MOSQUERA, SIBATE, SOACHA, SOPO, TENJO, TOCANCIPA, GACHANCIPA, ZIPAQUIRA{"\n"}{"\n"}

            MEDELLIN: BELLO, COPACABANA, ENVIGADO, ITAGUI, LA ESTRELLA, SABANETA, RIONEGRO {"\n"}{"\n"} 
            
            CALI: PALMIRA, JAMUNDI, YUMBO {"\n"}{"\n"}
                
            BARRANQUILLA: SOLEDAD, PUERTO COLOMBIA, SABANALARGA {"\n"}{"\n"}

            BUCARAMANGA: FLORIDABLANCA, GIRON, PIEDECUESTA {"\n"}{"\n"}

            </Text>



            <Text style={estilosParaExportar.paragraph}>
              {"\n"}
              1.3 Costo de manejo paqueteo urbano y nacional {"\n"} {"\n"}
              
              Se liquidará a una tasa del 0.5%, sobre la totalidad del valor declarado de sus cargamentos con un valor no inferior a:{"\n"}{"\n"}

              {`\u2022`} $ 2.500 por caja{"\n"}{"\n"}{"\n"}

              2.   RECOGIDAS EN DESTINATARIO URBANO Y NACIONAL{"\n"}{"\n"}
              
              Cuando se despache una sola caja se tomará un peso mínimo de 30 Kg, a partir de la segunda caja se tomará {minimoKgInput} Kg mínimo por
              caja.{"\n"}{"\n"}

              NOTA:  Se  cobrará  $  66.804  adicionales  al  valor  de  los  {minimoKgInput}  kg  mínimos  por  despacho  
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

              Se cobrará $3.000 por kg (Correspondientes a las entregas en ciudades o poblaciones no indicadas en la tabla de tarifas
              origen/destino).{"\n"}{"\n"}

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
        <h3>Ingrese la cantidad de Kg mínimos a cobrar por caja (mínimo 15 Kg)</h3>
         <input
          type="number" min='0'
          placeholder="Ingrese mínimo de Kg"
          onChange={ManejarMinimoKgChange}
          style={estilosParaExportar.input}
          value={minimoKgInput}
        />

        <p>Aqui podrá descargar la cotización en PDF con su descuento por Kg</p>        
      </div>
      <div className='inputDescargar'>
        
      {minimoKgInput >= 15 && MyDocument && (
          <PDFDownloadLink
            document={MyDocument}
            fileName={fileName}
            style={{
              textDecoration: 'none',
              backgroundColor: '#AED035',
              padding: '10px',
              color: 'white',
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

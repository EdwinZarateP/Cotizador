// ExportarCotizacion.tsx
// import React, { useState } from 'react';
import { Document, Page, Text, View, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { estilosParaExportar } from './estilosExportar'; // Importa los estilos desde el nuevo archivo
import '../estilos/exportarPDF.css';
import logoImage from '../imagenes/logo.png'; 
import logoBasc from '../imagenes/logoBasc.png'; 
import logoBuro from '../imagenes/buro.png'; 
import firmaCarlos from '../imagenes/FirmaCarlos.png'; // Importa la imagen desde tu carpeta local
import { ciudadesCombinadas } from './CombinacionesCiudades';
import { useFormularioContext } from '../contexto/Contexto.tsx';

const ExportarCotizacion: React.FC  = () => {
  
  // Usar el hook para obtener el contexto
  const { minimoKgUrbano, minimoKgNacional, descuento, descuentoNacional,
     nombreComercial, cliente, nitCliente, anoVigencia , addValorem, 
     cobroMinDespachoUrbano, cobroMinCajaUrbano, tarifaIntegralUrbano, 
     cobroMinDespachoNacional, cobroMinCajaNacional, tarifaIntegralNacional} = useFormularioContext();

  const generateTable = (descuento: number) => {
    const ciudadesUnicas = [...new Set(ciudadesCombinadas.map(ciudad => ciudad.destino))].sort();
  
      // Excluir las ciudades específicas
    const ciudadesExcluidas = ['ZIPAQUIRA - CUNDINAMARCA','CAJICA - CUNDINAMARCA', 'COTA - CUNDINAMARCA','CHIA - CUNDINAMARCA',
    'FACATATIVA - CUNDINAMARCA','FUNZA - CUNDINAMARCA','GACHANCIPA - CUNDINAMARCA','LA CALERA - CUNDINAMARCA',
    'MADRID - CUNDINAMARCA','MOSQUERA - CUNDINAMARCA','SIBATE - CUNDINAMARCA','SOACHA - CUNDINAMARCA',
    'SOPO - CUNDINAMARCA','TENJO - CUNDINAMARCA','TOCANCIPA - CUNDINAMARCA','COPACABANA - ANTIOQUIA','BELLO - ANTIOQUIA',
    'ENVIGADO - ANTIOQUIA','ITAGUI - ANTIOQUIA', 'LA ESTRELLA - ANTIOQUIA', 'SABANETA - ANTIOQUIA',
    'RIONEGRO - ANTIOQUIA', 'PALMIRA - VALLE DEL CAUCA', 'JAMUNDI - VALLE DEL CAUCA', 'JAMUNDI - VALLE DEL CAUCA',
    'SOLEDAD - ATLANTICO', 'PUERTO COLOMBIA - ATLANTICO', 'SABANALARGA - ATLANTICO',
    'FLORIDABLANCA - SANTANDER', 'GIRON - SANTANDER', 'PIEDECUESTA - SANTANDER'];
    
    const ciudadesFiltradas = ciudadesUnicas.filter(ciudad => !ciudadesExcluidas.includes(ciudad));

    const tableRows = ciudadesFiltradas.map((ciudad, index) => {
      
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
              ${Math.ceil(bogotaData.costo * (1 - (bogotaData.Tipo === 'URBANO' || bogotaData.Tipo === 'CIUDAD INTERMEDIA' ? descuento : descuentoNacional) / 100))}
              </Text>
            </>
          ) : (
            <Text style={estilosParaExportar.tableCol}>-</Text>
          )}
  
          {medellinData ? (
            <>
              <Text style={estilosParaExportar.tableCol}>
              ${Math.ceil(medellinData.costo * (1 - (medellinData.Tipo === 'URBANO' || medellinData.Tipo === 'CIUDAD INTERMEDIA' ? descuento : descuentoNacional) / 100))}
              </Text>
            </>
          ) : (
            <Text style={estilosParaExportar.tableCol}>-</Text>
          )}

          {caliData ? (
            <>
              <Text style={estilosParaExportar.tableCol}>
              ${Math.ceil(caliData.costo * (1 - (caliData.Tipo === 'URBANO' || caliData.Tipo === 'CIUDAD INTERMEDIA' ? descuento : descuentoNacional) / 100))}
              </Text>
            </>
          ) : (
            <Text style={estilosParaExportar.tableCol}>-</Text>
          )}

          
          {barranquillaData ? (
            <>
              <Text style={estilosParaExportar.tableCol}>
              ${Math.ceil(barranquillaData.costo * (1 - (barranquillaData.Tipo === 'URBANO' || barranquillaData.Tipo === 'CIUDAD INTERMEDIA' ? descuento : descuentoNacional) / 100))}
              </Text>
            </>
          ) : (
            <Text style={estilosParaExportar.tableCol}>-</Text>
          )}

          {bucaramangaData ? (
            <>
              <Text style={estilosParaExportar.tableCol}>
              ${Math.ceil(bucaramangaData.costo * (1 - (bucaramangaData.Tipo === 'URBANO' || bucaramangaData.Tipo === 'CIUDAD INTERMEDIA' ? descuento : descuentoNacional) / 100))}
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

  // Suma 30 días a la fecha actual
  const fechaVigencia = new Date(today);
  fechaVigencia.setDate(today.getDate() + 30);
  // Formatea la nueva fecha como lo necesites (en este caso, DD-MM-YYYY)
  const formattedFechaVigencia = `${pad(fechaVigencia.getDate())}-${pad(fechaVigencia.getMonth() + 1)}-${fechaVigencia.getFullYear()}`;
  
  
  let MyDocument = null;

  if (descuento >= 0) {
    MyDocument = (
      <Document>
        <Page size="A4" style={estilosParaExportar.page}>
          <View style={estilosParaExportar.section}>
            
          {/* Encabezado con imagen */}
          <View style={estilosParaExportar.header}>
            <Image src={logoImage} style={estilosParaExportar.logo} />
            <Text style={estilosParaExportar.title}>OFERTA COMERCIAL PAQUETEO</Text>
            <Image src={logoBuro} style={estilosParaExportar.headerRight} />
            <Image src={logoBasc} style={estilosParaExportar.headerRight} />
          </View>


            {/* <Text style={estilosParaExportar.title}>OFERTA COMERCIAL PAQUETEO</Text> */}

            <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita}> Fecha de Elaboración: </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita}> {formattedDate}  </Text>
                <Text style={estilosParaExportar.tablacolumanegrita}> Vigencia:  </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita}> {formattedDate}  al  {formattedFechaVigencia}  </Text>
            </View>

            <View style={estilosParaExportar.tablaGenerica1}>
                <Text style={estilosParaExportar.tablacolumanegrita}> Comercial: </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita}> {nombreComercial}  </Text>
                <Text style={estilosParaExportar.tablacolumanegrita}> Año Tarifario:  </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita}> {anoVigencia} </Text>
            </View>

        
            
              {/* INFORMACION CLIENTE */}
              <Text style={estilosParaExportar.tableTitle1}>.                                                                                 INFORMACION CLIENTE</Text>
              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita}> Razón social: </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita}> {cliente}  </Text>
                <Text style={estilosParaExportar.tablacolumanegrita}> NIT:  </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita}> {nitCliente} </Text>
            </View>

            
              {/* COTIZACION URBANOS */}
              <Text style={estilosParaExportar.tableTitle1}>.                                                                    CONDICIONES DE NEGOCIACION URBANO</Text>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Cobro minimo despacho $</Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> ${cobroMinDespachoUrbano} </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Kg minimo por despacho</Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> {minimoKgUrbano} </Text>
              </View>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Cobro minimo caja $ </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> ${cobroMinCajaUrbano} </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Kg minimo por caja  </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> 30 </Text>
              </View>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Tarifa integral caja $ </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> ${tarifaIntegralUrbano}  </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Kg promedio por Caja  </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> 30 </Text>
              </View>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Factor de conversion peso/vol</Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> 400 </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> % Descuento por flete </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> {descuento} </Text>
              </View>


              {/* COTIZACION NACIONALES */}
              <Text style={estilosParaExportar.tableTitle1}>.                                                                    CONDICIONES DE NEGOCIACION NACIONAL</Text>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Cobro minimo despacho $</Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> ${cobroMinDespachoNacional} </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Kg minimo por despacho</Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> 30 </Text>
              </View>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Cobro minimo caja $ </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> ${cobroMinCajaNacional} </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Kg minimo por caja  </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> {minimoKgNacional} </Text>
              </View>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Tarifa integral caja $ </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> ${tarifaIntegralNacional}  </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Kg promedio por caja </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> 30 </Text>
              </View>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Factor de conversion peso/vol</Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> 400 </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> % Descuento por flete </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> {descuentoNacional} </Text>
              </View>
  
              {/* COTIZACION REEXPEDICION */}
              <Text style={estilosParaExportar.tableTitle1}>.                                                                    CONDICIONES DE NEGOCIACION REEXPEDICION</Text>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Cobro minimo despacho $</Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> $ 12.000 </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Kg minimo por despacho</Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> 30 </Text>
              </View>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Cobro minimo caja $ </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> $ 30.000  </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Kg minimo por caja  </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> {30} </Text>
              </View>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Tarifa integral caja $ </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> $ 8.000  </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Kg promedio por caja </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> 20 </Text>
              </View>

              <View style={estilosParaExportar.tablaGenerica0}>
                <Text style={estilosParaExportar.tablacolumanegrita1}> Factor de conversion peso/vol</Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> 400 </Text>
                <Text style={estilosParaExportar.tablacolumanegrita1}> % Descuento por flete </Text>
                <Text style={estilosParaExportar.tablacolumasinnegrita1}> {descuentoNacional} </Text>
              </View>

            
            {/* TABLA FLETES */}
              <View style={estilosParaExportar.table}>
            <Text style={estilosParaExportar.tableTitle}>.                                         TABLA 1. TARIFARIO - DESCUENTO URBANO {descuento}% - NACIONAL {descuentoNacional}%</Text>
              <View style={estilosParaExportar.tableRow}>
                <Text style={estilosParaExportar.tableColHeader}> Destino / Origen  </Text>
                <Text style={estilosParaExportar.tableColHeader}> BOGOTA, D.C </Text>
                <Text style={estilosParaExportar.tableColHeader}> MEDELLIN </Text>
                <Text style={estilosParaExportar.tableColHeader}> CALI </Text>
                <Text style={estilosParaExportar.tableColHeader}> BARRANQUILLA </Text>
                <Text style={estilosParaExportar.tableColHeader}> BUCARAMANGA </Text>
              </View>
              {generateTable(Number(descuento))}
            </View>
            <Text style={estilosParaExportar.tableTitleAdicionales}>ZONAS METROPOLITANAS</Text>
            <Text style={estilosParaExportar.tableAdicionales}>

            Para estos Municipios se cobrara la tarifa de la ciudad capital de la zona metropolitana 
            a la cual corresponden.{"\n"}{"\n"}

            BOGOTA: CAJICA, CHIA, COTA, FACATATIVA, FUNZA, LA CALERA, SIBERIA
            MADRID, MOSQUERA, SIBATE, SOACHA, SOPO, TENJO, TOCANCIPA, GACHANCIPA, ZIPAQUIRA{"\n"}{"\n"}

            MEDELLIN: BELLO, CALDAS, COPACABANA, ENVIGADO, ITAGUI, LA ESTRELLA, SABANETA, RIONEGRO {"\n"}{"\n"} 
            
            CALI: PALMIRA, JAMUNDI, YUMBO, CAVASA {"\n"}{"\n"}
                
            BARRANQUILLA: MALAMBO, PUERTO COLOMBIA, SOLEDAD,  GALAPA{"\n"}{"\n"}

            BUCARAMANGA: FLORIDABLANCA, GIRON, PIEDECUESTA {"\n"}{"\n"}

            CARTAGENA: TURBACO, ARJONA, BAYUNCA, MAMONAL, TURBACO, TURBANA Y PASACABALLOS {"\n"}  

            </Text>
        
            <Text style={estilosParaExportar.paragraph}>
            
              Esta oferta considera ser servicio de paqueteo, con los siguientes requisitos:{"\n"}{"\n"}
              
              <Text style={estilosParaExportar.subtitle}> 1. MANEJO</Text>{"\n"} {"\n"}

              • % Ad Valorem: Se pacta un cobro general del {addValorem}% {"\n"}
              • Se liquidará a una tasa del 0.5%, sobre la totalidad del valor declarado de sus cargamentos con un valor no inferior a $ 2.500 por caja{"\n"}{"\n"}

              <Text style={estilosParaExportar.subtitle}> 2. MERCANCÍA DE PROHIBIDO TRANSPORTE</Text>{"\n"} {"\n"}
      
              •	Material reactivo, contaminante, corrosivo, de naturaleza explosiva o inflamable (Decreto 1609).{"\n"}
              •	Productos perecederos.{"\n"}
              •	Gases comprimidos Material que deba mantenerse sobre condiciones de refrigeración, congelación o calefacción. {"\n"}
              •	Perecederos y/o comestibles con un tiempo de vencimiento menor a 3 meses. {"\n"}
              •	Obras de arte. {"\n"}
              •	Títulos valores, Monedas y/o papel moneda, dinero en efectivo, cheques, metales y piedras preciosas. {"\n"}
              •	Elementos importados sin que estén debidamente legalizados. {"\n"}
              •	Especies Animales y vegetales. {"\n"}
              •	Vidrios y espejos{"\n"}
              •	No transportamos Mercancías, paquetes o documentos mal empacadas, deficientemente protegidas, que puedan averiar otros envíos o con contenidos no aptos para el transporte, ni vidrio.{"\n"}{"\n"} 

              <Text style={estilosParaExportar.subtitle}> 3. CONDICIONES DEL SERVICIO</Text>{"\n"} {"\n"}
              
              •	Toda devolución ajena a responsabilidad de INTEGRA LOGISTICA, sera asumida por el cliente.{"\n"}
              •	Se otorga un plazo maximo para la solución de una novedad de 72 horas, posterior a este tiempo se cobrara almacenamiento temporal el cual tiene un costo de $40.000 por estiba (o fracción) semanal.{"\n"}
              •	Los segundos ofrecimientos serán cobrados de acuerdo con la tarifa de la regional destino.{"\n"}
              •	INTEGRA LOGISTICA asignara un ejecutivo de cuenta para el seguimiento de los despachos.{"\n"}
              •	En caso de presentarse situaciones ajenas al proceso desarrollado por INTEGRA LOGISTICA que afecten la movilidad en el país y hagan necesario tomar vías alternas y/o esperas prolongadas podra generarse sobre costos que seran negociados entre las partes.{"\n"}
              •	El tiempo maximo de espera para entrega en punto es de 45 minutos; de igual forma, si se presenta una novedad en el punto, el tiempo maximo de espera para lograr la solución es de 20 minutos, pasado este tiempo se dara continuidad a la ruta y se cobrara el flete por una futura entrega.{"\n"}{"\n"}

              <Text style={estilosParaExportar.subtitle}> 4. AVERIAS, FALTANTES E INDEMNIZACIONES</Text>{"\n"} {"\n"}
              
              •	Art 1028. Los reclamos de los clientes por pérdidas o averías se podrán realizar máximo dentro de los tres días siguientes a la fecha de entrega. {"\n"}
              •	Art 1031. El monto de la indemnización en caso de Pérdida o avería en transporte, INTEGRA LOGISTICA asumirá el valor declarado de acuerdo con la proporción que la mercancía averiada o perdida represente frente al total del despacho. {"\n"}
              •	Según concepto No. 041573 de julio de 2004 de la DIAN, INTEGRA LOGISTICA. NO asumirá el valor correspondiente al IVA de los productos Averiados o Perdidos, teniendo en cuenta que “Los bienes que se rompen, pierden o sufren daño estos no causan el impuesto sobre las ventas, {"\n"}
              ya que tales hechos no constituyen venta para efectos del impuesto, debiendo contabilizarse como una perdida la cual deberá soportarse con los documentos pertinentes que dan crédito del hecho”.{"\n"} {"\n"}


              <Text style={estilosParaExportar.subtitle}> 5. FORMA DE PAGO Y FACTURACIÓN</Text>{"\n"} {"\n"}
              
              •	Plazo de pago: 30 dias fecha factura.{"\n"}
              •	Intereses por mora: Si las facturas no son canceladas dentro de las fechas anteriormente estipuladas, se causarán intereses por mora de acuerdo con la tasa máxima legal vigente en el mercado.{"\n"}
              •	La actualización de tarifas se realizará el 01 de enero de cada año, de acuerdo con la siguiente formula: IPC 30%+SMMLV 70%{"\n"}{"\n"} {"\n"}

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

      </div>
      <div className='inputDescargar'>
        
      {minimoKgUrbano >= 15 && MyDocument && (
          <PDFDownloadLink
            document={MyDocument}
            fileName={fileName}
            style={{
              padding: '10px',
              color: 'blue',
              fontSize:'14px',
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

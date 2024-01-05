import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { ciudades } from './data';
import '../estilos/exportarPDF.css'

const ExportarCotizacion: React.FC = () => {
  const [descuentoInput, setDescuentoInput] = useState<number | ''>('');

  const handleDescuentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setDescuentoInput(Number(value));
    }
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    table: {
      width: '100%',
      border: '1px solid black',
      borderCollapse: 'collapse',
      marginTop: 10,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      alignItems: 'center',
    },
    tableColHeader: {
      width: '33.33%',
      borderRight: '1px solid black',
      padding: 5,
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 'bold',
    },
    tableCol: {
      width: '33.33%',
      borderRight: '1px solid black',
      padding: 5,
      textAlign: 'center',
      fontSize: 10,
    },
    input: {
      marginBottom: 10,
      padding: 5,
      fontSize: 12,
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: 4,
    },
    paragraph: {
      marginBottom: 10,
      fontSize: 12,
    },
  });

  const generateTable = (descuento: number) => (
    ciudades.map((ciudad, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.tableCol}>{ciudad.nombre}</Text>
        <Text style={styles.tableCol}>${ciudad.costo}</Text>
        <Text style={styles.tableCol}>
          ${Math.ceil(ciudad.costo * (1 - (descuento / 100)))}
        </Text>
      </View>
    ))
  );

  const today = new Date();
  const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const fileName = `Cotizacion_${formattedDate}.pdf`;

  let MyDocument = null;

  if (descuentoInput !== '') {
    MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Cotización paqueteo integra</Text>
            <Text style={styles.subtitle}>Fecha: {formattedDate}</Text>
            <Text style={styles.paragraph}>
              Estimado cliente, los costos con el porcentaje de descuento {descuentoInput}% indicado son:
            </Text>
            
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Ciudad</Text>
                <Text style={styles.tableColHeader}>Costo Original</Text>
                <Text style={styles.tableColHeader}>Costo con Descuento</Text>
              </View>
              {generateTable(Number(descuentoInput))}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Ingrese porcentaje de descuento"
          value={descuentoInput}
          onChange={handleDescuentoChange}
          style={styles.input}
        />
      </div>
      <div className='botonDescargar'>
        {MyDocument && (
          <PDFDownloadLink document={MyDocument} fileName={fileName}>
            {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
};

export default ExportarCotizacion;

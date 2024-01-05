import { StyleSheet } from '@react-pdf/renderer';

export const estilosParaExportar = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'justify',
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
    height:'35px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign:'center'
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 12,
    textAlign: 'justify',
  },

  // Agrega el estilo para el encabezado (header) aquí
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100, // ajusta el tamaño de la imagen del logo según tus necesidades
    height: 50, // ajusta el tamaño de la imagen del logo según tus necesidades
  },

  // Agrega el estilo para la firma (footerImage) aquí
  footerImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firma: {
    width: 280, // ajusta el tamaño de la imagen del logo según tus necesidades
    height: 130, // ajusta el tamaño de la imagen del logo según tus necesidades
  }
});

import { StyleSheet, Font } from '@react-pdf/renderer';
// Importa la fuente Helvetica-Bold
Font.register({ family: 'Helvetica-Bold', src: 'https://unpkg.com/pdfkit-font-helvetica-bold@latest/dist/Helvetica-Bold.ttf', fontStyle: 'normal', fontWeight: 'bold' });

export const estilosParaExportar = StyleSheet.create({
    
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    padding: '15px 25px 25px 25px',
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },

  title: {
    fontSize: 12,
    marginBottom: 5 ,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Helvetica-Bold'
  },
  
  subtitle: {
    fontSize: 10,
    marginBottom: 0,
    textAlign: 'justify',
    color: 'black',
    fontFamily: 'Helvetica-Bold'
  },

  table: {
    width: '100%',
    border: '1px solid #333',
    borderCollapse: 'collapse',
    marginTop: 10,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tablaGenerica0: {
    flexDirection: 'row',
    alignItems: 'center',
    },

  tablaGenerica1: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tableTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    padding: '1',
    fontFamily: 'Helvetica-Bold',
    borderBottom: '1px solid black',
    backgroundColor: '#AED035',
  },

  tableTitle1: {
    fontSize: 9,
    fontWeight: 'bold',
    padding: '1',
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#AED035',
    border: '0.5px 0.5px 0 0.5px solid black',
  },
  

  tableColHeader: {
    width: '16.67%',
    borderRight: '1px solid black',
    padding: 5,
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold'
  },

  tablacolumanegrita: {
    width: '25%',
    border: '0.5px solid black',
    padding: 2,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold'
  },

  tablacolumasinnegrita: {
    width: '25%',
    border: '0.5px solid black',
    padding: 2,
    textAlign: 'center',
    fontSize: 9,
  },

  tablacolumanegrita1: {
    width: '30%',
    border: '0.5px solid black',
    padding: 2,
    textAlign: 'left',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold'
  },

  tablacolumasinnegrita1: {
    width: '20%',
    border: '0.5px solid black',
    padding: 2,
    textAlign: 'center',
    fontSize: 9,
  },

  tableCol: {
    width: '16.67%',
    height:'100%',  
    borderRight: '1px solid black',
    padding: 0,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 8,
  },

  tableTitleAdicionales: {
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    backgroundColor: '#AED035',
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
    fontFamily:'Helvetica-Bold'
  },

  tableAdicionales: {
    border: '1px solid black',
    fontSize: 9,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 1,
    padding:2
  },

  

  input: {
    
    marginBottom: 8,
    padding: 5,
    fontSize: 12,
    width: '100%',
    height:'25px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign:'center'
  },

  paragraph: {
    marginBottom: 10,
    fontSize: 10,
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

  headerRight: {
    width: 40,
    height: 30,
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

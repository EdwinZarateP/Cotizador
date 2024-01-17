import { StyleSheet } from '@react-pdf/renderer';

export const estilosParaExportar = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    padding: 25,
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },

  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  
  subtitle: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'justify',
    color: '#555'
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
  },

  tableTitle: {
    fontSize: 9,
    borderBottomWidth: 1,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 1,
  },
  

  tableColHeader: {
    width: '16.67%',
    borderRight: '1px solid black',
    padding: 5,
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    backgroundColor: '#AED035'
  },

  tableCol: {
    width: '16.67%',
    borderRight: '1px solid black',
    padding: 0,
    textAlign: 'center',
    fontSize: 8,
  },

  tableTitleAdicionales: {
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    backgroundColor: '#AED035',
    borderRight: '1px solid black',
    borderLeft: '1px solid black'
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

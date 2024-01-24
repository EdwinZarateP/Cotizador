import React from 'react';
import * as XLSX from 'xlsx';

const ExcelExportComponent: React.FC = () => {

  const exportToExcel = () => {

    // Crear un libro de Excel
    const wb = XLSX.utils.book_new();

    // Crear una hoja de Excel
    const ws = XLSX.utils.aoa_to_sheet([]);

    // Agregar el texto "OFERTA COMERCIAL PAQUETEO" a la celda J1
    XLSX.utils.sheet_add_aoa(ws, [['OFERTA COMERCIAL PAQUETEO']], { origin: 'J1' });

    // Agregar el texto "Fecha de Elaboración:" a la celda A8
    XLSX.utils.sheet_add_aoa(ws, [['Fecha de Elaboración:']], { origin: 'A8' });

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

    // Guardar el archivo Excel
    XLSX.writeFile(wb, 'oferta_comercial_paqueteo.xlsx');
  };

  return (
    <div>
      <button onClick={exportToExcel}>Exportar a Excel</button>
    </div>
  );
};

export default ExcelExportComponent;

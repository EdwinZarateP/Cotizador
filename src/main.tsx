import React from 'react'
import ReactDOM from 'react-dom/client'
import Imagen from './componentes/titulo.tsx'
import Calculadora from './componentes/calculadora.tsx'
import Header from './componentes/header.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="contenedorPrincipal">
      <Header/>
      <Imagen/> 
      <Calculadora/>

    </div>
  </React.StrictMode>,
)

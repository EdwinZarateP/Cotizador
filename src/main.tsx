import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import Calculadora from './componentes/calculadora.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="contenedorPrincipal">

      <Calculadora/>

    </div>
  </React.StrictMode>,
)

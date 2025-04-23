import './Inicial.css';
import React, { useState } from 'react';

const items = Array.from({ length: 250 }, (_, i) => `Elemento ${i + 1}`); // Lista de prueba
const ITEMS_PER_PAGE = 25;

const Inicial = () => {
    const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
    return (
  <section className="container">
    <section className="content">
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Stocks</h2>
        <table align='center'>
        <thead>
        <tr>
          <td>&nbsp;</td>
          <td>simbolo</td>
          <td>nombre</td>
          <td>precio</td>
          <td>cantidad</td>
        </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (//genera tabla con stock
            <tr>
              <td>{index +1}</td>
              <td>{item}</td>
              <td>stock{index}</td>
              <td>1000</td>
              <td>{index*2}</td>
            </tr>
          ))}
        </tbody>
        </table>
        <div className="button-container" align='center'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            
          >
            Siguiente
          </button>
        </div>
        
      
      </div>
    </section>
    <section className="sidebar">
    <div className="form-section">
        <h2>Formulario de Stocks</h2>
        <form >
          <label>
            Precio:
            <input type="text" name="precio" placeholder="Precio"/>
          </label>
          <br />
          <label>
            nombre:
            <input type="text" name="nombre" placeholder="ej:amzn"  />
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  </section>
  );    
}
export default Inicial;

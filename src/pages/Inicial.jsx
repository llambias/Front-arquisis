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
    <>
    <div className="left_side">
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
    </div>
    <div className='right_side'>
      <div className="form-section">
        <h2>Cantidad mostrada</h2>
        <input type="number" name="cantidad" placeholder="25"/>
      </div>
      <div className="form-section">
        <h2>Formulario</h2>
        <form >
          <label>
            Nombre:
            <input type="text" name="nombre" placeholder="Nombre"/>
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" placeholder="email"  />
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  </>
  );    
}
export default Inicial;
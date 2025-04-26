import "./Inicial.css";
import React, { useState } from "react";
import { stocksData } from "../constants/constants";

const items = Array.from({ length: 250 }, (_, i) => `Elemento ${i + 1}`); // Lista de prueba
const ITEMS_PER_PAGE = 7;

type Stock = {
  symbol: string;
  name: string;
  price: number;
  quantity: number;
};

const Inicial = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>(stocksData);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const totalPages = Math.ceil(stocks.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (field: string) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);

    const sortedStocks = [...stocks].sort((a, b) => {
      if (a[field as keyof typeof a] < b[field as keyof typeof b]) {
        return newDirection === "asc" ? -1 : 1;
      }
      if (a[field as keyof typeof a] > b[field as keyof typeof b]) {
        return newDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setStocks(sortedStocks);
  };

  const getSortIndicator = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  // Get current stocks
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentStocks = stocks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="container">
      <div className="header">
        <h1>Stocks Disponibles</h1>
        <p>Revisa y compra stocks a tu gusto</p>
      </div>
      <div className="tableContainer">
        <table className="stocksTable">
          <thead>
            <tr>
              <th onClick={() => handleSort("symbol")} className="sortable">
                Symbol {getSortIndicator("symbol")}
              </th>
              <th onClick={() => handleSort("name")} className="sortable">
                Name {getSortIndicator("name")}
              </th>
              <th onClick={() => handleSort("price")} className="sortable">
                Price ($) {getSortIndicator("price")}
              </th>
              <th onClick={() => handleSort("quantity")} className="sortable">
                Quantity {getSortIndicator("quantity")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStocks.map((stock) => (
              <tr key={stock.symbol}>
                <td className="symbolCell">{stock.symbol}</td>
                <td>{stock.name}</td>
                <td className="priceCell">${stock.price.toFixed(2)}</td>
                <td>{stock.quantity}</td>
                <td>
                  <button className="buyButton">Buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentStocks.length > 0 && (
          <div className="pagination">
            <button
              className="paginationButton"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              Primera
            </button>
            <button
              className="paginationButton"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <div className="pageInfo">
              Página {currentPage} de {totalPages}
            </div>
            <button
              className="paginationButton"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
            <button
              className="paginationButton"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Última
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default Inicial;

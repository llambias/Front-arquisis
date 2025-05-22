import "./Inicial.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moneyIcon from "../assets/money.svg";
import { useAuth } from "../context/AuthContext";
import { getAllStocksRequest, buyStockRequest } from "../requests/stocks";
const ITEMS_PER_PAGE = 7;

type Stock = {
  id: number;
  symbol: string;
  short_name: string;
  long_name: string;
  price: number;
  quantity: number;
  amount?: number;
  timestamp: string;
};

type stockFilters = {
  price?: string;
  quantity?: string;
  date?: string;
};

function toDatetimeLocal(isoString) {
  const date = new Date(isoString);
  // Get the local time in the format YYYY-MM-DDTHH:mm
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

const Inicial = () => {
  const { user } = useAuth();
  const userFunds = user?.funds || 0;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState<stockFilters>({
    price: undefined,
    quantity: undefined,
    date: undefined,
  });

  const fetchStocks = async () => {
    const stocks = await getAllStocksRequest({
      ...filters,
      price: filters.price ? Number(filters.price) : undefined,
      quantity: filters.quantity ? Number(filters.quantity) : undefined,
      timestamp: filters.date
        ? new Date(filters.date).toISOString()
        : undefined,
    });
    setStocks(
      stocks.map((stock) => ({
        ...stock,
        amount: 0,
        timestamp: toDatetimeLocal(stock.timestamp),
      }))
    );
  };

  useEffect(() => {
    try {
      fetchStocks();
    } catch (error) {
      console.error("Error fetching stocks:", error);
      setStocks([]);
    }
  }, []);

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
  const totalPages = Math.ceil(stocks.length / ITEMS_PER_PAGE);

  const handleFilter = async () => {
    try {
      await fetchStocks();
    } catch (error) {
      setStocks([]);
    }
  };

  const handleBuy = async (
    symbol: string,
    longName: string,
    amount: number,
    price: number
  ) => {
    try {
      const user_id = user?.id;
      if (!user_id) {
        throw new Error("User ID is undefined");
      }
      if (amount * price > userFunds) {
        return;
      }
      if (amount > 0) {
        // const response = await buyStockRequest({
        //   symbol,
        //   quantity: amount,
        //   funds: userFunds,
        //   user_id,
        //   operation: "buy",
        // });

        // const { url, token } = response?.data;
        const url = "https://www.google.com";
        const token = "1234567890";

        if (url && token) {
          console.log("Purchase Data");
          console.log({
            url,
            token,
            amount,
            title: symbol,
            name: longName,
            price: price,
          });
          navigate(`/confirm-purchase`, {
            state: {
              url,
              token,
              amount,
              title: symbol,
              name: longName,
              type: "buy",
              price: price,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error buying stock:", error);
    }
  };

  const handleAmountChange = (id: number, amount: number, quantity: number) => {
    if (amount > quantity) {
      return;
    }
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, amount: amount } : stock
      )
    );
  };

  const calculateTotal = (price: number, amount: number) => {
    return (price * (amount || 0)).toFixed(2);
  };

  return (
    <section className="stocks-container">
      <div
        className="header"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={moneyIcon} // Toggle icon
            alt="moneyicon"
            style={{ width: "2rem", height: "2rem" }}
          />
          <span
            style={{
              fontFamily: "Courier New",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Dinero disponible: ${userFunds}
          </span>
        </div>
      </div>
      <div className="pagination">
        <input
          type="number"
          placeholder="Precio máximo"
          className="filter-input"
          value={filters.price ?? ""}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          className="filter-input"
          value={filters.quantity ?? ""}
          onChange={(e) => setFilters({ ...filters, quantity: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="Fecha"
          className="filter-input"
          value={filters.date ?? ""}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <button className="paginationButton" onClick={handleFilter}>
          Filtrar
        </button>
      </div>
      <div className="tableContainer">
        <table className="stocksTable">
          <thead>
            <tr>
              <th onClick={() => handleSort("symbol")} className="sortable">
                Symbol {getSortIndicator("symbol")}
              </th>
              <th onClick={() => handleSort("short_name")} className="sortable">
                Short Name {getSortIndicator("short_name")}
              </th>
              <th onClick={() => handleSort("long_name")} className="sortable">
                Long Name {getSortIndicator("long_name")}
              </th>
              <th onClick={() => handleSort("price")} className="sortable">
                Price ($) {getSortIndicator("price")}
              </th>
              <th onClick={() => handleSort("quantity")} className="sortable">
                Quantity {getSortIndicator("quantity")}
              </th>
              <th onClick={() => handleSort("timestamp")} className="sortable">
                Timestamp {getSortIndicator("timestamp")}
              </th>
              <th>Amount</th>
              <th>Total ($)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStocks.length > 0 ? (
              currentStocks.map((stock) => (
                <tr key={stock.id}>
                  <td className="symbolCell">{stock.symbol}</td>
                  <td>{stock.short_name}</td>
                  <td>{stock.long_name}</td>
                  <td className="priceCell">${stock.price.toFixed(2)}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.timestamp}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={stock.quantity}
                      value={stock.amount || 0}
                      onChange={(e) =>
                        handleAmountChange(
                          stock.id,
                          parseInt(e.target.value) || 0,
                          stock.quantity || 0
                        )
                      }
                      className="amount-input"
                    />
                  </td>
                  <td
                    className="priceCell"
                    style={{
                      color:
                        Number(calculateTotal(stock.price, stock.amount || 0)) >
                        userFunds
                          ? "red"
                          : "black",
                    }}
                  >
                    ${calculateTotal(stock.price, stock.amount || 0)}
                  </td>
                  <td>
                    <button
                      className="buyButton"
                      onClick={() =>
                        handleBuy(
                          stock.symbol,
                          stock.long_name,
                          stock.amount || 0,
                          stock.price || 0
                        )
                      }
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", fontStyle: "italic" }}
                >
                  No hay acciones disponibles
                </td>
              </tr>
            )}
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

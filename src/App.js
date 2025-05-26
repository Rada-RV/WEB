import React from "react";
import "./index.css";

const App = () => {
  const today = new Date().toLocaleDateString();

  const stocks = [
    { stock_name: "EFX", company_name: "Equifax Inc", price: 163.55, currency: "USD", change: "+9.03" },
    { stock_name: "IRM", company_name: "Iron Mountain Inc", price: 33.21, currency: "USD", change: "+1.42" },
    { stock_name: "NTAP", company_name: "NetApp Inc", price: 54.81, currency: "USD", change: "-6.01" },
    { stock_name: "CTL", company_name: "Centurylink Inc", price: 13.79, currency: "USD", change: "-1.37" }
  ];

  const renderNotation = () => {
    const letters = [...'abcdefgh'];
    return letters.map((l, i) => <span key={i}>{l}</span>);
  };

  const renderStockTable = () => (
    <table>
      <thead>
        <tr>
          <th>Тикер</th>
          <th>Компания</th>
          <th>Цена</th>
          <th>Изменение</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock, index) => (
          <tr key={index}>
            <td>{stock.stock_name}</td>
            <td>{stock.company_name}</td>
            <td>{stock.price} {stock.currency}</td>
            <td style={{ color: stock.change.startsWith('+') ? 'green' : 'red' }}>{stock.change}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const Square = ({ isBlack }) => (
    <div className={isBlack ? 'black' : 'white'}></div>
  );

  const ChessBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isBlack = (row + col) % 2 === 1;
        board.push(<Square key={`${row}-${col}`} isBlack={isBlack} />);
      }
    }
    return <div className="board"> {board} </div>;
  };

  return (
    <div className="app">
      <h2>Задание 1: Сегодняшняя дата</h2>
      <p>{today}</p>

      <h2>Задание 2: Таблица акций</h2>
      {renderStockTable()}

      <h2>Задание 3: Шахматная доска</h2>
      <div className="notation">{renderNotation()}</div>
      <ChessBoard />
      <div className="notation">{renderNotation()}</div>
    </div>
  );
};

export default App;
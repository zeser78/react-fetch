import React, { useState, useEffect } from "react";
import axios from "axios";

// this is the API https://financialmodelingprep.com/api/v3/stock/real-time-price/${stock}
//that I want to loop to have "Symbol" - "Name" - "price"
//So, from json file I got the symbol to loop into the API to have the price.

const StocksList = props => {
  const stocksData = props.stocksList.stocksList;

  const stocks = stocksData.map((stock, index) => {
    if (index < 10) {
      return (
        <li key={index}>
          {index + 1} - {stock.Symbol} - {stock.Name}
        </li>
      );
    }
  });

  return (
    <div>
      <h1> Stock List</h1>
      <ul>{stocks}</ul>
    </div>
  );
};

export default StocksList;

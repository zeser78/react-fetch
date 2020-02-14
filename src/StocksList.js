import React, { useState, useEffect } from "react";
import axios from "axios";
import stocksList from "./list_company.json";

// this is the API https://financialmodelingprep.com/api/v3/stock/real-time-price/${stock}
//that I want to loop to have "Symbol" - "Name" - "price"
//So, from json file I got the symbol to loop into the API to have the price.

const StocksList = props => {
  const stocksData = props.stocksList.stocksList;

  //Fetching
  //TODO: Doesn't get the stocksData.price value
  const fetchData = stocksData.map((stock, index) => {
    if (index < 10) {
      let stockData;
      fetch(
        `https://financialmodelingprep.com/api/v3/stock/real-time-price/${stock.Symbol}`
      ).then(response => {
        if (!response.ok) {
          console.log("no status : 200");
          throw new Error(`Status Code Error: ${response.status}`);
        } else {
          response.json().then(data => {
            stockData = data;
            console.log(stockData.symbol + stockData.price);
          });
        }
      });
      return (
        <li>
          {index + 1} -{stock.Symbol} -{stock.Name} - {stocksData.price}
        </li>
      );
    }
  });
  // Stock List
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
      <h2>Fetching</h2>
      <ul>{fetchData}</ul>
    </div>
  );
};

export default StocksList;

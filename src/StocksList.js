import React, { useState, useEffect } from "react";
import axios from "axios";
import stocksList from "./list_company.json";

// this is the API https://financialmodelingprep.com/api/v3/stock/real-time-price/${stock}
//that I want to loop to have "Symbol" - "Name" - "price"
//So, from json file I got the symbol to loop into the API to have the price.

const StocksList = ({ stocksList }) => {
  // const stocksData = props.stocksList.stocksList;
  const [fetchData, setFetchData] = useState([]);
  useEffect(() => {
    const fetchUrls = stocksList
      .slice(0, 130)
      .map((stock, index) =>
        axios.get(
          `https://financialmodelingprep.com/api/v3/stock/real-time-price/${stock.Symbol}`
        )
      );
    axios.all(fetchUrls).then(data => {
      data.map(({ data }) => {
        //TODO: here can be the filter of the price
        console.log(data);
        const { Name } = stocksList.find(
          slStock => slStock.Symbol === data.symbol
        );
        console.log(Name);
        setFetchData(
          //TODO: learn this prevData and returning [] breaks
          prevData => [
            ...prevData,
            { name: Name, symbol: data.symbol, price: data.price }
          ],
          console.log(data.symbol)
        );
      });
    });
  }, []);

  // Stock List
  const stocks = stocksList.map((stock, index) => {
    if (index < 10) {
      return (
        <li key={index}>
          {index + 1} - {stock.Symbol} - {stock.Name}
        </li>
      );
    }
  });

  const renderStocks = () => {
    return fetchData.map(({ name, symbol, price }, index) => {
      //TODO: here I can manipulate to get
      return (
        <li key={index}>
          {`${index + 1} - ${symbol} - ${name} - $${price.toFixed(2)}`}
        </li>
      );
    });
  };

  return (
    <div>
      <h1> Stock List</h1>
      <ul>{stocks}</ul>
      <h2>Fetching</h2>
      {/* <ul>{fetchData}</ul> */}
      <ul>{fetchData.length > 0 && renderStocks()}</ul>
      {/* <ul>{renderStocks()}</ul> */}
    </div>
  );
};

export default StocksList;

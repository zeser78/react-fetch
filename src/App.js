import React from "react";

import StocksList from "./StocksList";
import stocksList from "./list_company.json";

function App() {
  return (
    <div className="App">
      <StocksList {...stocksList} />
    </div>
  );
}

export default App;

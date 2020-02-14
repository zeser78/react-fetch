fetch("./list_company.json")
  .then(response => {
    if (!response.ok) {
      console.log("no status : 200");
      throw new Error(`Status Code Error: ${response.status}`);
    } else {
      response.json().then(data => {
        for (let i = 0; i < 10; i++) {
          const stockList = data.stockList[i];

          console.log(data.stockList[i]);
          const symbol = data.stockList[i].Symbol;
          const name = data.stockList[i].Name;
          console.log("checking" + symbol);

          fetch(
            `https://financialmodelingprep.com/api/v3/stock/real-time-price/${symbol}`
          ).then(response => {
            if (!response.ok) {
              console.log("no status : 200");
              throw new Error(`Status Code Error: ${response.status}`);
            } else {
              response.json().then(data => {
                console.log(data.price);
                const { symbol, price } = data;
                console.log(symbol, price);
                // }
                let listStock = document.createElement("li");
                listStock.textContent =
                  "symbol: " +
                  symbol +
                  " - " +
                  "name: " +
                  name +
                  " - " +
                  "price: " +
                  price;
                document.getElementById("myList").appendChild(listStock);
              });
            }
          });
        }
      });
    }
  })
  .catch(err => {
    console.log("something went wrong with fetch");
    console.log(err);
  });

// Change the fet to be inside and create compare

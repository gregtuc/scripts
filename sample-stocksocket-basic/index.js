const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const StockSocket = require("stocksocket");

//Start server on port 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`);

  StockSocket.addTickers(["TSLA", "NIO", "AMD"], stockPriceChanged);

  function stockPriceChanged(data) {
    //Choose what to do with your data as it comes in.
    console.log(data);
  }
});

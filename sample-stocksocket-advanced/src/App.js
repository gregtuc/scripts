import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const App = () => {
  const [tickerList, setTickerList] = useState([]);

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTicker(e);
  };

  const handleAddTicker = (e) => {
    setValue(e.target.value);
    alert("A name was submitted: " + value);

    //Using Stocksocket
    var StockSocket = require("stocksocket");
    StockSocket.addTicker(value, handleCallback);
  };

  const handleCallback = (data) => {
    if (data) {
      if (tickerList.length < 1) {
        setTickerList([...tickerList, data]);
      } else {
        for (var i = 0; i < tickerList.length; i++) {
          if (tickerList[i].id === data.id) {
            //Switching tickerList
            let items = [...tickerList];
            let item = { ...items[i] };
            item.price = data.price;
            item.changePercent = data.changePercent;
            item.time = data.time;
            items[i] = item;
            setTickerList(items);

            break;
          } else if (i === tickerList.length - 1) {
            setTickerList([...tickerList, data.price]);
          }
        }
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicStock">
            <Form.Label>Stock:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a ticker"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Form.Control type="submit" value="Submit" />
          </Form.Group>
        </Form>

        <Table responsive variant="dark">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Change %</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(tickerList).map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.changePercent.toFixed(2)}</td>
                <td>{item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </header>
    </div>
  );
};

export default App;

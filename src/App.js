import "./App.css";
import Button from "./Button.js";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("1");

  const onChange = (event) => {
    if (event.target.value !== "" && event.target.value > 0)
      setMoney(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json))
      .then(setLoading(false));
  }, [money, loading]);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <input
        onChange={onChange}
        value={money}
        type="number"
        placeholder="How much dollar"
      />
      {loading ? (
        <strong>Loading..</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price / money}{" "}
              token
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;

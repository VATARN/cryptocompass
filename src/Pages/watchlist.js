import React, { useEffect, useState } from "react";
import Button from "../Components/button";
import Header from "../Components/header";
import TabsComponent from "../Components/tabs";
import { getCoins } from "../API/cryptoAPI";
import Loader from "../Components/loader";

function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));


  useEffect(() => {
    const data = getCoins(setError)
    if (data.length > 0) {
      gotCoinData(data);
    }
  }, []);

  const gotCoinData = (data) => {
    setCoins(data.filter((coin) => watchlist.includes(coin.id)));
    setLoading(false);
  };


  return (
    <div>
      <Header />
      {loading && error === '' && <Loader />}
      {error && <h1>{error}</h1>}
      {watchlist?.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;

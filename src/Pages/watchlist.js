import React, { useEffect, useState } from "react";
import Button from "../Components/button";
import Header from "../Components/header";
import TabsComponent from "../Components/tabs";
import { getCoins } from "../API/cryptoAPI";
import Loader from "../Components/loader";
import { toast } from "react-toastify";

function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (error !== "") {
      toast.error(error);
      setLoading(false);
    }
  }, [error]);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await getCoins(setError);
      setCoins(data.filter((coin) => watchlist.includes(coin.id)));
    } catch (error) {
      setError("Failed to fetch coins: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Header />
      {loading ? <Loader /> :
        watchlist.length > 0 ? (
          <TabsComponent coins={coins} setSearch={() => { console.log("tab clicked!") }} />
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
                <Button text="Dashboard" clickFn={() => { console.log("Dashboard clicked!") }} outlined={false} />
              </a>
            </div>
          </div>
        )}
    </div>
  );
}

export default Watchlist;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Info from "../Components/cryptoInfo.js";
import LineChart from "../Components/lineChart.js";
import SelectDays from "../Components/selectDays.js";
import ToggleComponents from "../Components/toggleComponent.js";
import Button from "../Components/button.js";
import Header from "../Components/header.js";
import Loader from "../Components/loader.js";
import List from "../Components/list.js";
import { getCoinData, getPrices } from "../API/cryptoAPI.js";
import { settingChartData, settingCoinObject } from "../Utils.js";
import { toast } from "react-toastify";

function Coin() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setLoading(false);
    }
  }, [error]);

  const getData = async () => {
    setLoading(true);
    let coinData = await getCoinData(id, setError);
    settingCoinObject(coinData, setCoin);
    if (coinData) {
      const prices = await getPrices(id, days, priceType, setError);
      if (prices) {
        settingChartData(setChartData, prices);
        setLoading(false);
      }
    }
  };

  const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event.target.value);
    const prices = await getPrices(id, event.target.value, priceType, setError);
    if (prices) {
      settingChartData(setChartData, prices);
      setLoading(false);
    }
  };

  const handlePriceTypeChange = async (event) => {
    setLoading(true);
    setPriceType(event.target.value);
    const prices = await getPrices(id, days, event.target.value, setError);
    if (prices) {
      settingChartData(setChartData, prices);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {!error && !loading && coin.id ? (
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.5} />
          </div>
          <div className="grey-wrapper">
            <SelectDays handleDaysChange={handleDaysChange} days={days} />
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} />
          </div>
          <Info title={coin.name} desc={coin.desc} />
        </>
      ) : error ? (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, Couldn't find the coin you're looking for 😞
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
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Coin;

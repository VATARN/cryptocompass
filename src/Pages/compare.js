import React, { useEffect, useState } from "react";
import Info from "../Components/cryptoInfo.js";
import LineChart from "../Components/lineChart.js";
import ToggleComponents from "../Components/toggleComponent.js";
import Header from "../Components/header.js";
import Loader from "../Components/loader.js";
import SelectCoins from "../Components/selectCrypto.js";
import List from "../Components/list.js";
import { getCoins, getCoinData, getPrices } from "../API/cryptoAPI.js";
import { settingChartData, settingCoinObject } from "../Utils.js";

function Compare() {
  const [error, setError] = useState("");
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  // id states
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  // data states
  const [coin1Data, setCoin1Data] = useState({});
  const [coin2Data, setCoin2Data] = useState({});
  // days state
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    setLoading(true);
    const coins = await getCoins(setError);
    if (coins) {
      setAllCoins(coins);
      const data1 = await getCoinData(crypto1, setError);
      const data2 = await getCoinData(crypto2, setError);
      settingCoinObject(data1, setCoin1Data);
      settingCoinObject(data2, setCoin2Data);
      if (data1 && data2) {
        // getPrices
        const prices1 = await getPrices(crypto1, days, priceType, setError);
        const prices2 = await getPrices(crypto2, days, priceType, setError);
        settingChartData(setChartData, prices1, prices2);
        setLoading(false);
      }
    }
  };

  const onCoinChange = async (e, isCoin2) => {
    setLoading(true);
    if (isCoin2) {
      const newCrypto2 = e.target.value;
      // crypto2 is being changed
      setCrypto2(newCrypto2);
      // fetch coin2 data
      const data2 = await getCoinData(newCrypto2);
      settingCoinObject(data2, setCoin2Data);
      // fetch prices again
      const prices1 = await getPrices(crypto1, days, priceType, setError);
      const prices2 = await getPrices(newCrypto2, days, priceType, setError);
      settingChartData(setChartData, prices1, prices2);
    } else {
      const newCrypto1 = e.target.value;
      // crypto1 is being changed
      setCrypto1(newCrypto1);
      // fetch coin1 data
      const data1 = await getCoinData(newCrypto1);
      settingCoinObject(data1, setCoin1Data);
      // fetch coin prices
      const prices1 = await getPrices(newCrypto1, days, priceType, setError);
      const prices2 = await getPrices(crypto2, days, priceType, setError);
      settingChartData(setChartData, prices1, prices2);
    }
    setLoading(false);
  };

  const handleDaysChange = async (e) => {
    const newDays = e.target.value;
    setLoading(true);
    setDays(newDays);
    const prices1 = await getPrices(crypto1, newDays, priceType, setError);
    const prices2 = await getPrices(crypto2, newDays, priceType, setError);
    settingChartData(setChartData, prices1, prices2);
    setLoading(false);
  };

  const handlePriceTypeChange = async (e) => {
    const newPriceType = e.target.value;
    setLoading(true);
    setPriceType(newPriceType);
    const prices1 = await getPrices(crypto1, days, newPriceType, setError);
    const prices2 = await getPrices(crypto2, days, newPriceType, setError);
    settingChartData(setChartData, prices1, prices2);
    setLoading(false);
  };

  return (
    <div>
      <Header />
      {loading || !coin1Data?.id || !coin2Data?.id ? (
        <Loader />
      ) : (
        <>
          <SelectCoins
            allCoins={allCoins}
            crypto1={crypto1}
            crypto2={crypto2}
            onCoinChange={onCoinChange}
            days={days}
            handleDaysChange={handleDaysChange}
          />
          <div className="grey-wrapper">
            <List coin={coin1Data} />
          </div>
          <div className="grey-wrapper">
            <List coin={coin2Data} />
          </div>
          <div className="grey-wrapper">
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} multiAxis={true} />
          </div>
          <Info title={coin1Data.name} desc={coin1Data.desc} />
          <Info title={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
    </div>
  );
}

export default Compare;

import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Loader from "../Components/loader";
import Search from "../Components/search";
import TabsComponent from "../Components/tabs";

import PaginationComponent from "../Components/pagination";
import TopButton from "../Components/topButton";
import Footer from "../Components/footer";
import { getCoins } from "../API/cryptoAPI";
import { toast } from "react-toastify";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [error, setError] = useState("");

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
      setCoins(data);
      setPaginatedCoins(data.slice(0, 10));
    } catch (error) {
      setError("Failed to fetch coins: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };


  var filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    var initialCount = (value - 1) * 10;
    setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Search search={search} handleChange={handleChange} />
          <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
            setSearch={setSearch}
          />
          {!search && (
            <PaginationComponent
              count={10}
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}
      <TopButton />
      <Footer />
    </>
  );
}

export default Dashboard;
import { toast } from "react-toastify";

export const saveItemToWatchlist = (e, id) => {
    e.preventDefault();
    let watchlist = JSON.parse(localStorage.getItem("watchlist"));

    if (watchlist) {
        if (!watchlist.includes(id)) {
            watchlist.push(id);
            toast.success(
                `${id.substring(0, 1).toUpperCase() + id.substring(1)
                } - added to the watchlist`
            );
        } else {
            toast.error(
                `${id.substring(0, 1).toUpperCase() + id.substring(1)
                } - is already added to the watchlist!`
            );
        }
    } else {
        watchlist = [id];
        toast.success(
            `${id.substring(0, 1).toUpperCase() + id.substring(1)
            } - added to the watchlist`
        );
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
};

export const removeItemToWatchlist = (e, id, setIsCoinAdded) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to remove this coin?")) {
        let watchlist = JSON.parse(localStorage.getItem("watchlist"));
        const newList = watchlist.filter((coin) => coin !== id);
        setIsCoinAdded(false);
        localStorage.setItem("watchlist", JSON.stringify(newList));
        toast.success(
            `${id.substring(0, 1).toUpperCase() + id.substring(1)
            } - has been removed!`
        );
        window.location.reload();
    } else {
        toast.error(
            `${id.substring(0, 1).toUpperCase() + id.substring(1)
            } - could not be removed!`
        );
        setIsCoinAdded(true);
    }
};

export const convertNumber = (number) => {
    const numberWithCommas = number.toLocaleString();
    var arr = numberWithCommas.split(",");
    if (arr.length === 5) {
        //Trillions
        return arr[0] + "." + arr[1].slice(0, 2) + "T";
    } else if (arr.length === 4) {
        //Billions
        return arr[0] + "." + arr[1].slice(0, 2) + "B";
    } else if (arr.length === 3) {
        // Millions
        return arr[0] + "." + arr[1].slice(0, 2) + "M";
    } else if (arr.length === 2) {
        // Thousands
        return arr[0] + "." + arr[1].slice(0, 2) + "K";
    } else {
        // Hundreds
        return number.toLocaleString();
    }
};

export const gettingDate = (number) => {
    const date = new Date(number);
    return date.getDate() + "/" + (date.getMonth() + 1);
};

export const settingChartData = (setChartData, prices1, prices2, crypto1, crypto2) => {

    if (prices2) {
        setChartData({
            labels: prices1?.map((data) => gettingDate(data[0])),
            datasets: [
                {
                    label: crypto1 ? crypto1 : "Crypto1",
                    data: prices1?.map((data) => data[1]),
                    borderWidth: 1,
                    fill: false,
                    backgroundColor: "rgba(58, 128, 233,0.1)",
                    tension: 0.25,
                    borderColor: "#3a80e9",
                    pointRadius: 0,
                    yAxisID: 'crypto1',
                },
                {
                    label: crypto2 ? crypto2 : "Crypto2",
                    data: prices2?.map((data) => data[1]),
                    borderWidth: 1,
                    fill: false,
                    tension: 0.25,
                    borderColor: "#61c96f",
                    pointRadius: 0,
                    yAxisID: 'crypto2',
                },
            ],
        });
    } else {
        setChartData({
            labels: prices1?.map((data) => gettingDate(data[0])),
            datasets: [
                {
                    data: prices1?.map((data) => data[1]),
                    borderWidth: 1,
                    fill: true,
                    backgroundColor: "rgba(58, 128, 233,0.1)",
                    tension: 0.25,
                    borderColor: "#3a80e9",
                    pointRadius: 0,
                    yAxisID: 'crypto1',
                },
            ],
        });
    }
};

export const settingCoinObject = (data, setCoin) => {
    if (data) {
        setCoin({
            id: data.id,
            name: data.name,
            symbol: data.symbol,
            image: data.image.large,
            desc: data.description.en,
            price_change_percentage_24h: data.market_data.price_change_percentage_24h,
            total_volume: data.market_data.total_volume.usd,
            current_price: data.market_data.current_price.usd,
            market_cap: data.market_data.market_cap.usd,
        });
    } else {
        setCoin({});
    }
};

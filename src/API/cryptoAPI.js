import axios from 'axios';

const config = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-hZNq4hdWvVsnFh3qFuJUncm8'
    },
};

export const getCoinData = async (id, setError) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, config);
        return response.data;
    } catch (error) {
        setError(error.message);
        return null;
    }
};


export const getCoins = async (setError) => {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false", config);
        return response.data; // Return the data for use in your component
    } catch (err) {
        setError(err.message);
        return [];
    }
};


export const getPrices = async (id, days, priceType, setError) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`);
        if (response.data) {
            switch (priceType) {
                case "market_caps":
                    return response.data.market_caps;
                case "total_volumes":
                    return response.data.total_volumes;
                default:
                    return response.data.prices;
            }
        }
        return [];
    } catch (error) {
        setError(error.message);
        return [];
    }
};

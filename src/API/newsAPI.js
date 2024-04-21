import axios from 'axios';

export const getCryptoNews = async (setError) => {
    try {
        const response = await axios.get("https://newsdata.io/api/1/news?apikey=pub_423326b364230474ecdd60cfeb6f6da7becae&q=cryptocurrency&country=us&language=en&category=business,technology");
        return response.data;
    } catch (err) {
        setError(err.message);
        return [];
    }
};

export const getCryptoNext = async (setError, Page) => {
    try {
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=pub_423326b364230474ecdd60cfeb6f6da7becae&q=cryptocurrency&country=us&language=en&category=business,technology&page=${Page}`);
        return response.data;
    } catch (err) {
        setError(err.message);
        return [];
    }
};

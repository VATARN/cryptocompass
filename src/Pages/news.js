import React, { useEffect, useState } from "react";
import { getCryptoNews } from '../API/newsAPI';
import PaginationComponent from "../Components/pagination";
import { toast } from "react-toastify";
import Loader from "../Components/loader";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { news } from "./data";
import NewsGrid from "../Components/newsGrid";
function News() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchNews();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setLoading(false);
        }
    }, [error]);

    const fetchNews = async () => {
        setLoading(true);
        try {
            // const response = await getCryptoNews(setError);
            // setArticles(response.results);
            setArticles(news);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch news: ' + error.message);
            setLoading(false);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            {loading ? <Loader /> : (<>
                <Header />
                <div>
                    <NewsGrid news={articles} />
                </div>
                <PaginationComponent page={currentPage}
                    handlePageChange={handlePageChange} />
                <Footer />
            </>
            )}
        </div>
    );
}

export default News;

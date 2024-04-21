import React, { useEffect, useState } from "react";
import { getCryptoNews, getCryptoNext } from '../API/newsAPI';
import PaginationComponent from "../Components/pagination";
import { toast } from "react-toastify";
import Loader from "../Components/loader";
import Header from "../Components/header";
import Footer from "../Components/footer";
import NewsGrid from "../Components/newsGrid";

function News() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(2);

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
            const response = await getCryptoNews(setError);
            setArticles(response.results);
            setNextPage(response.nextPage);
            setPageCount(Math.ceil(response.totalResults / 10));
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch news: ' + error.message);
            setLoading(false);
        }
    };

    const fetchNextNews = async () => {
        setLoading(true);
        try {
            const response = await getCryptoNext(setError, nextPage);
            setArticles(response.results);
            setPageCount(Math.ceil(response.totalResults / 10));
            if (response.nextPage) {
                setNextPage(response.nextPage)
            } else {
                toast.error('No more news to show');
            }
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch news: ' + error.message);
            setLoading(false);
        }
    };


    const handlePageChange = (event, value) => {
        fetchNextNews()
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
                    handlePageChange={handlePageChange} count={pageCount} />
                <Footer />
            </>
            )}
        </div>
    );
}

export default News;

import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../CSS/tabs.css";
import "../CSS/grid.css";
import { motion } from "framer-motion";

export default function NewsGrid({ news }) {

    return (
        <TabContext value="grid">
            <TabPanel value="grid">
                <div className="grid-flex">
                    {news.length > 0 ? (
                        news.map((article, i) => (

                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-card">
                                <motion.div
                                    className='grid'
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: (i % 4) * 0.2 }}
                                >
                                    <div className="img-flex">
                                        <img src={article.image_url} alt={article.title} className="news-image" />
                                    </div>
                                    <p className="coin-name">
                                        {article.title}
                                    </p>
                                    <p className="coin-name">
                                        {article.description}
                                    </p>
                                    <div className="news-source">
                                        <img src={article.source_icon} alt={article.source_id} className="source-icon" />
                                        {article.source_id}
                                    </div>
                                </motion.div>
                            </a>

                        ))
                    ) : (
                        <div>
                            <h1 style={{ textAlign: "center" }}>
                                Sorry, Couldn't load news at this moment.
                                Please try again.
                            </h1>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "2rem",
                                }}
                            >
                            </div>
                        </div>
                    )}
                </div>
            </TabPanel>
        </TabContext>
    );
}

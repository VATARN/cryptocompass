import React from "react";
import "../CSS/landingPage.css";
import gradient from "../Assets/gradient.png";
import iphone from "../Assets/iphone.png";
import { motion } from "framer-motion";
import Button from "./button";

function MainComponent() {
  return (
    <div className="main-flex">
      <div className="info-landing">
        <motion.h1
          className="heading1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Track, Compare and Stay Informed on Crypto
        </motion.h1>
        <motion.h1
          className="heading2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75, duration: 1 }}
        >
          in Real Time.
        </motion.h1>
        <motion.p
          className="info-text"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Discover Real-Time Crypto Movements with Our Comprehensive Dashboard.{" "}
        </motion.p>
        <motion.div
          className="btn-flex"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.00, duration: 0.75 }}
        >
          <a href="/dashboard">
            <Button text={"Dashboard"} />
          </a>
        </motion.div>
      </div>
      <div>
      </div>
      <div className="gradient-div">
        <img src={gradient} className="gradient" alt="gradient" />
        <motion.img
          src={iphone}
          className='iphone'
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}

export default MainComponent;

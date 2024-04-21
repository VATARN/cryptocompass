import React from "react";
import "../CSS/footer.css";
import logo from "../Assets/logo.webp"

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className="footer">
      <h2 className="logo" onClick={() => topFunction()}>
        CryptoCompass<span>.</span>
      </h2>
      <div className="social-links">
        <a href="/home">
          <img src={logo} alt="cryptocompass" className="social-link" />
        </a>
      </div>
    </div>
  );
}

export default Footer;

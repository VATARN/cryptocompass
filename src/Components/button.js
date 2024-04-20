import React from "react";
import "../CSS/button.css";

function Button({ text, clickFn, outlined }) {
  return (
    <div
      className={outlined ? "btn-outlined" : "btn"}
      onClick={() => clickFn()}
    >
      {text}
    </div>
  );
}

export default Button;

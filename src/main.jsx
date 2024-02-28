import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// import StarRating from "./components/starRating/StarRating";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <StarRating messages={["bad", "okay", "normal", "good", "amazing"]} />
    <StarRating defaultRating={2} color="green" size={100} className="test" />
    <Text /> */}
  </React.StrictMode>
);

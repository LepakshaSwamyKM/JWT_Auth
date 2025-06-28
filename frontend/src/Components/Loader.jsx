import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ size = 40, color = "#4fa94d" }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
      <ClipLoader size={size} color={color} speedMultiplier={1} />
    </div>
  );
};

export default Loader;

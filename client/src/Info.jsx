/* eslint-disable react/prop-types */
// Importing the css for the info
import { useEffect } from "react";
import "./css/info.css";

const Info = ({ name1, name2 }) => {
  useEffect(() => {
    console.log("From info: " + { name1 } + ", " + { name2 });
  }, [name1, name2]);
  return (
    <div className="info">
      <div className="player">{name1}: X</div>
      <div className="player">{name2}: O</div>
    </div>
  );
};

export default Info;

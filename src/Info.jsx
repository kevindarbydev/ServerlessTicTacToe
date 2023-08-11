/* eslint-disable react/prop-types */
// Importing the css for the info
import "./css/info.css";

const Info = ({ n1, n2 }) => {
  return (
    <div className="info">
      <div className="player">{n1}: X</div>
      <div className="player">{n2}: O</div>
    </div>
  );
};

export default Info;

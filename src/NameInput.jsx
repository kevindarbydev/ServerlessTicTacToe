/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
const NameInput = ({ sendNameOne, sendNameTwo }) => {
  const [nameOne, setNameOne] = useState("");
  const [nameTwo, setNameTwo] = useState("");
  const InputStyles = {
    width: "210px",
    backgroundColor: "red",
    padding: "2rem",
    color: "white",   
    borderRadius: '1rem',
  };

  useEffect(() => {
    console.log(`Found values: ${nameOne}, ${nameTwo}`);
  }, [nameOne, nameTwo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendNameOne(nameOne);
    sendNameTwo(nameTwo);
  };

  return (
    <div style={InputStyles}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="player1Name">Player 1 Name</label>
        <input
          id="player1Name"
          name="player1Name"
          value={nameOne}
          placeholder="Player 1 Name"
          onChange={(e) => setNameOne(e.target.value)}
        ></input>
        <label htmlFor="player2Name">Player 2 Name</label>
        <input
          id="player2Name"
          name="player2Name"
          value={nameTwo}
          placeholder="Player 2 Name"
          onChange={(e) => setNameTwo(e.target.value)}
        ></input>
        <button style={{ marginTop: "1.5rem", marginBottom:'-1rem' }}>Start Game!</button>
      </form>
    </div>
  );
};
export default NameInput;

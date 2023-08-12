import Board from "./Board";
import Info from "./Info";
import NameInput from "./NameInput";
import "./css/app.css";
import { useEffect, useState } from "react";

function App() {
  const [reset, setReset] = useState(false);
  const [winner, setWinner] = useState("");
  const [namesEntered, setNamesEntered] = useState(false);
  const [n1, setn1] = useState("");
  const [n2, setn2] = useState("");

  const resetBoard = () => {
    setReset(true);
  };

  const handleNameOneSubmit = (name) => {
    if (name !== "") {
      setn1(name);
      console.log("received: " + name);
    }
  };
  const handleNameTwoSubmit = (name) => {
    if (name !== "") {
      setn2(name);
      console.log("received in n2: " + name);
    }
  };
  useEffect(() => {
    
  }, [winner])

  useEffect(() => {
    if (n1 && n2) {
      setNamesEntered(true);      
      submitPlayerNames();
    }
  }, [n1, n2]);

 const submitPlayerNames = async () => {
   try {
     const response = await fetch("http://localhost:3000/player-names", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ n1, n2 }), // Assuming n1 and n2 are state variables
     });

     if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }

     const data = await response.json(); // Assuming the response is in JSON format
     console.log("Data:", data);
   } catch (error) {
     console.error("Error:", error);
   }
 };
 


  return (
    <div className="App">
      {namesEntered ? (
        <>
          <div className={`winner ${winner !== "" ? "" : "shrink"}`}>
            <div className="winner-text">{winner}</div>
            <button onClick={() => resetBoard()}>Reset Board</button>
          </div>
          <Board
            reset={reset}
            setReset={setReset}
            winner={winner}
            setWinner={setWinner}
            name1={n1}
            name2={n2}
          />
          <Info name1={n1} name2={n2} />         
        </>
      ) : (
        <NameInput
          sendNameOne={handleNameOneSubmit}
          sendNameTwo={handleNameTwoSubmit}
        />
      )}
    </div>
  );
}

export default App;

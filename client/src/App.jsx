// Importing the required components
import Board from "./Board";
import Info from "./Info";
import NameInput from "./NameInput";
// Importing the CSS File
import "./css/app.css";

// Importing the useState hook
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
     if (name !== ''){
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

    useEffect(() =>{
      // console.log('value of n1: ' + n1)
      // console.log("value of n2: " + n2);
      if (n1 && n2){
        setNamesEntered(true);
      }
    }, [n1, n2])

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

var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = 3000;
const cors = require("cors");
app.use(cors());

const TABLE_NAME = "TicTacToe_Game_History";
const COUNTER_TABLE_NAME = "GameCounter";

//get counter for gameId and then return +1
async function getPreviousGameId() {
  const params = {
    Key: {
      GAME_ID: {
        S: "1",
      },
    },
    TableName: COUNTER_TABLE_NAME,
  };

  return new Promise((resolve, reject) => {
    ddb.getItem(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else { 
        const currentGameId = data.Item?.COUNTER?.S;

        if (currentGameId) {
          const newGameId = parseInt(currentGameId) + 1;
         
          const paramsForPut = {
            TableName: COUNTER_TABLE_NAME,
            Item: {
              GAME_ID: { S: "1" },
              COUNTER: { S: newGameId.toString() },
            },
          };

          ddb.putItem(paramsForPut, function (err, data) {
            if (err) {
              console.log("Error" + err);
              reject(err);
            } else {
              console.log("Success !" );              
              resolve(newGameId); 
            }
          });
        } else {
          console.log("problem with newID");
          resolve(-1);
        }
      }
    });
  });
}

app.post("/start", async (req, res) => {
  try {
    const newGameId = await getPreviousGameId();
    console.log("returned ID: " + newGameId);
    if (newGameId < 0){
      console.log("Found -1")
      return;
    }
    const { n1, n2 } = req.body;
    const params = {
      TableName: TABLE_NAME,
      Item: {
        GAME_ID: { S: newGameId.toString() },
        PLAYER_ONE_NAME: { S: n1 },
        PLAYER_TWO_NAME: { S: n2 },
      },
    };

    ddb.putItem(params, function (err, data) {
      if (err) {
        console.log("Error" + err);
      } else console.log("Success " + data);
    });

    res.status(200).json({ GAME_ID: newGameId });
  } catch (error) {
    console.error("Error generating game ID:", error);
    res.status(500).json({ error: "Error generating game ID" });
  }
});

app.post("/game-winner", (req, res) => {
  try {
    const { winner, gameId } = req.body;
    
    var params = {
      TableName: "TicTacToe_Game_History",
      ExpressionAttributeNames: {        
        "#GW": "GameWinner",
      },
      ExpressionAttributeValues: {
        ":w": {
          S: winner,
        },       
      },
      Key: {
        GAME_ID: {
          S: gameId.toString(),
        },
      },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #GW = :w ",
    };

    ddb.updateItem(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else console.log(data);
    });
    res.status(200).json({ WINNER: winner});
  } catch (Error) {
    console.log("Something went wrong: " + Error);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} and current time is ${generateTimestamp()}`
  );
});

function generateTimestamp() {
  const currentTime = new Date();
  return Math.floor(currentTime.getTime() / 1000);
}

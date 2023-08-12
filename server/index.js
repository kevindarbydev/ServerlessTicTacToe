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

app.post("/player-names", (req, res) => {
  const timestamp = generateTimestamp();
  const { n1, n2 } = req.body;
  var params = {
    TableName: "GameHistory",
    Item: {
      TIMESTAMP: { N: timestamp.toString() },
      PLAYER_ONE_NAME: { S: n1 },
      PLAYER_TWO_NAME: { S: n2 },
    },
  };
  
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
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

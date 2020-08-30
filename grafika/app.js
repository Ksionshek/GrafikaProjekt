const express = require("express");
const app = express();

const https = require("https");
const fs = require("fs");
const key = fs.readFileSync("./server.key");
const cert = fs.readFileSync("./server.cert");

const httpsSeverPort = process.env.PORT || 3000;
const indexPath = require("./routes/index");

//= ==========================================================================
// HTTPS
//= ==========================================================================

const webServer = https.createServer(
  {
    key,
    cert,
  },
  app
);

webServer.listen(httpsSeverPort, () => {
  console.log(
    `GrafikaProjekt app listening at https://localhost:${httpsSeverPort}`
  );
});

// Set header to no-cache
function setHeaders(res) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
}

app.use("/", indexPath, setHeaders);

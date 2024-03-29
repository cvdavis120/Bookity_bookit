const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const path = require("path");

const app = express();

mongoose.connect(keys.mongoURI);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.group(`API server is listening on Port ${PORT}`);
});

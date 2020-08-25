const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-Parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

//bodyparser middleware
app.use(bodyParser.json());

const db = require("./config/Keys").mongoURI;

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected... "))
  .catch((err) => console.log(err));

//use routes

app.use("/api/items", items);

//server statics assests if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path, resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

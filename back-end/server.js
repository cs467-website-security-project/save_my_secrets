const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const routes = require("./controllers/login");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

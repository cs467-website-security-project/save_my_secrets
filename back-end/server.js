const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const loginRoutes = require("./controllers/login");
const userRoutes = require("./controllers/user");

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", loginRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

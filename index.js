const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/config");
require("dotenv").config();
const app = express();

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
dbConnection();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//Auth Routes //
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

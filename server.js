const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err));

app.use("/api/users", require("./api/Users"));
app.use("/api/notes", require("./api/Notes"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
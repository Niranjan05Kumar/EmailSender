const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mailSend = require("./controllers/mailSend");

require("dotenv").config();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/sendmail", mailSend);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
const port = 3000;
const auth = require("./src/routes/authRoute");
const data = require("./src/routes/dataRoute");

app.use(express.json());

app.use("/auth", auth);
app.use("/", data);

app.listen(port, () => {
  console.log(`Server running on http://localhost:3000`);
});

const express = require('express');
const cors = require('cors')
const dbcon = require("./dbconnect/dbconnect.js");
const auth = require("./router/auth/auth.js")
const profile = require("./router/other/profile.js");
const task = require("./router/other/task.js");
const port =3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth/api", auth);
app.use("/profile/api", profile);
app.use("/task/api", task);
dbcon.once("connected", () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}` );
  });
});
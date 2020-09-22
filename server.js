const express = require('express')
const app = express()
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();
const listEndpoints = require("express-list-endpoints");
const userRouter = require("./src/routes/users")

const port = process.env.PORT || 3300;


const mongooseConnection = require("./src/db/mongoose");

mongooseConnection();

app.get('/', (req, res) => {
  res.send('Hello World!')
  
})


app.use(express.json());
app.use(passport.initialize())

app.use(cors())

app.use("/users", userRouter)



console.log(listEndpoints(app))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
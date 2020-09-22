const express = require('express')
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const listEndpoints = require("express-list-endpoints");
const userRouter = require("./src/routes/users")

const port = process.env.PORT || 3300;

const mongooseConnection = require("./src/db/mongoose");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/users", userRouter)


console.log(listEndpoints(app))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
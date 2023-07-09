const express = require("express");
const colors = require('colors')
const cors = require("cors")
const connectionDB = require("./config/db");
const { errorHanler } = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000

connectionDB()

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({urlencoded : false}))

app.use("/api/users", require("./routes/userRoute"))
app.use("/api/games", require("./routes/gameRoute"))
app.use("/api/player", require("./routes/playerRoute"))
app.use("/api/team", require("./routes/teamRoute"))
app.use("/api/match", require("./routes/matchRoute"))

app.use(errorHanler)


app.listen(port , () => console.log(`Server started at port ${port}`))
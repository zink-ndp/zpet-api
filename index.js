const cors = require('cors')
const express = require ("express")

const app = express()

app.use(cors())

require('dotenv').config()


app.use(express.urlencoded({extended: false}))
app.use(express.json())

const router = require('./routes/api.router')
app.use("/api/v1/",router)

const PORT = process.env.PORT || 3100

app.listen(PORT, () => {
    console.log("Server running on", PORT)
})
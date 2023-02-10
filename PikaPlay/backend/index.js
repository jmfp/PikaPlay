//entrypoint for api
const express = require('express')
const cors = require('cors')

//dotenv for environment variables
require('dotenv').config()

//connect to mongoose db
const connectDB = require('./database/db')
connectDB()

const app = express()
app.use(cors())
//adding middleware for body data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/products', require("./routes/Products"))
app.use('/api/users', require('./routes/Users'))

app.listen(process.env.PORT, () =>{
    console.log(`server running on port ${process.env.PORT}`)
})
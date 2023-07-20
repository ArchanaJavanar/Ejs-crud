const express = require('express')
require('dotenv').config()

const port = process.env.port

const app = express()

//body parser middleware config
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ejs settings
app.set('view engine','ejs')
app.set('views', './view')

//default route
app.use(`/`, require('./route/userRoute'))

//server listen
app.listen(port, () => {
    console.log(`server started and live @ http://localhost:${port}`)
})
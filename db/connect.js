//logic to connect

const mongoose = require('mongoose')

//connectDb is a custom method

const connectDb = async () => {
    //1. read the .env file variable = mongo_uri
    await mongoose.connect(process.env.MONGO_URI)
        .then(res => {
            console.log('mongodb connected successfully')
        }).catch(err => console.log(err))
    }

// 1. mongoose.connect method is promise request method

module.exports = connectDb
// import mongoose
const mongoose = require ('mongoose')

//create a db schema ref new mongoose.Schema(schema, collection)

const userSchema = new mongoose.Schema({
    name: {
        type: String, //datatype
        required : true //mandatory filed
    },
    email: {
        type: String,
        required: true,
        unique: true // unique value - will not allow duplicates
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true // default value
    }
},{
    collection: 'users', // name of the collection
    timestamps: true // log the created and updated times in collection

})

module.exports = mongoose.model("User", userSchema) // model(Export Schema Name, schema ref)

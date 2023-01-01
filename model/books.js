const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number
    },
    bookRegisterDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model( 'Books', bookSchema )

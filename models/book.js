const mongoose = require('mongoose');

const bookschema = mongoose.Schema({
    photo: { 
        data: Buffer, 
        contentType: String 
    },

    name: {
        type: String,
        default: '',
        required: true,
        unique: true


    },
    category: { type: mongoose.Schema.Types.ObjectId,},
    user: { type: mongoose.Schema.Types.ObjectId,},

});

const book =  mongoose.model('Book', bookschema);

module.exports = book;
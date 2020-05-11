const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var bookStatusSchema =  mongoose.Schema({
    status:{ type: String , default:"reading" , enum:[ "reading" , "now reading" , "finished reading" ]},

    user:{type: Schema.Types.ObjectId, ref: 'User', required: true},
    book:{type: Schema.Types.ObjectId, ref: 'Book', required: true} ,

    });
    
    bookStatusSchema.pre('find', function (next) {
        this.populate('user')
        this.populate('book')
        next()
        })
        bookStatusSchema.index({user: 1, book: 1}, {unique: true});
 const readingStatusModel =  mongoose.model('ReadingStatus', bookStatusSchema);
 module.exports = readingStatusModel

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var bookStatusSchema = new mongoose.Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User', required: true},
    book:{type: Schema.Types.ObjectId, ref: 'Book', required: true} ,
    status:{ type: String , enum:[ "reading" , "want to read" , "finished reading" ]}
    });
    
    bookStatusSchema.pre('find', function (next) {
        this.populate('user')
        this.populate('book')
        next()
        })
        bookStatusSchema.index({user: 1, book: 1}, {unique: true});
 const readingStatusModel =  mongoose.model('ReadingStatus', bookStatusSchema);
 module.exports = readingStatusModel

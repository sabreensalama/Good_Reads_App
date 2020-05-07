const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var bookStatusSchema =  mongoose.Schema({
    status:{ type: String , default:"reading" , enum:[ "reading" , "now reading" , "finished reading" ]},

    user:{type: Schema.Types.ObjectId, ref: 'User', required: true},
    book:{type: Schema.Types.ObjectId, ref: 'Book', required: true} ,
    // 1 read , 2 currently read , 3 want to read

    });
    bookStatusSchema.pre('find', function (next) {
        this.populate('user')
        this.populate('book')
        next()
        })
 const readingStatusModel =  mongoose.model('ReadingStatus', bookStatusSchema);
 module.exports = readingStatusModel

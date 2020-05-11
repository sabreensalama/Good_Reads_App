const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var bookReviewSchema =  mongoose.Schema({

    user:{type: Schema.Types.ObjectId, ref: 'User', required: true},
    book:{type: Schema.Types.ObjectId, ref: 'Book', required: true} ,
    review:{type:String}

    });
    

 const reviewModel =  mongoose.model('BookReview', bookReviewSchema);
 module.exports = reviewModel

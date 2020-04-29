const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var bookSchemaStatus = new mongoose.Schema({
    user:{type: Schema.Types.ObjectId, ref: 'Author', required: true},
    user:{type: Schema.Types.ObjectId, ref: 'Book', required: true} ,
    status:{ type: Number , default:0 , enum:[ 1 , 2 , 3 ]}
    // 1 read , 2 currently read , 3 want to read

    })

 const readingstatus =  mongoose.model('ReadingStatus', bookSchemaStatus);
 module.exports = readingstatus

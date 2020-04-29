var mongoose = require('mongoose');
const express = require('express')
const BookModel = require("../models/book")
const router = express.Router()


router.use((request , response , next) => {
    console.log('books route')
    next()

})
router.get('/' , (request , response  ,next) => {
 BookModel.find({}).exec((err,books) =>{
   if(!err){
     //response.json(books)
     response.render('books' /*,{locals: {title: 'Welcome!'}}*/);

   }
   next(err)
 })

})


 router.get('/:id' , (request , response) => {
   
  const parameters = request.params
  // const id = parameters.id
  const { id } = parameters
  BookModel.findById( id , function(err, result) {
   if (err) {
     response.send(err);
   } else {
     response.json(result);
   }
 });
})

 
router.post('/' , ( request , response  ,next )=>{
  const { photo ,name,category,user } = request.body
  const book = new BookModel(request.body)
  book.save((err,book)=>{
    if(!err)
    {
       response.json(book)
    }
    response.send(err)
   })
})

 router.patch('/:id' , (req , res , next ) =>{
  const parameters = req.params
  const { id } =parameters
 BookModel.findByIdAndUpdate(id, req.body, {
  new: true
},
function(err, model) {
  if (!err) {
      res.status(201).json({
          data: model
      });
  } else {
      res.status(500).json({
          message: "not found any relative data"
      })
  }
});
})
 
router.delete('/:id' , (req , res ) =>{
  const parameters = req.params
  const { id } =parameters
  BookModel.findByIdAndRemove(id, (err, book) => {

    // check if query error
    if (err) {
        console.log(err);
    }

    res.json("your doc deleted")
});
 })

 module.exports = router
 
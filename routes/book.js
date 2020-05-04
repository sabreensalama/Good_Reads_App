var express = require('express');
const bookModel = require('../models/books');
const readingStatusModel = require('../models/readingBookStatus');
const userModel = require('../models/users');


const session = require('express-session')

var router = express.Router();

router.get('/', async (req, res) => {
  var booksIds = [];
  try {
    const books = await bookModel.find({});
    
  const user = await userModel.findOne({"email":session.email}) 
  const currentState = await readingStatusModel.find({"user":user.id}); 
  currentState.forEach((x)=>{
    booksIds.push(x.book.id);
 })
    res.render('layouts/books' ,{booksIds: booksIds,books: books , state: currentState,layout : 'books'});
    return;
  } catch (err) {
    res.send(err);
   
  }

  
});
router.post('/addstatus', async (req, res) => {
  const currentUser= await userModel.findOne({"email":session.email}) 
  const currentState = new readingStatusModel({"user":currentUser.id,"status":req.body.status,"book":req.body.book}) 


  try {
    const tmp = await currentState.save();
       
    res.send("added");

  } catch (err) {
    res.status(500).send(err);
  }

  
});

router.post('/', async (req, res) => {
  const book = new bookModel(req.body);
  try {
   const tmp = await book.save();
    
   
    res.send("added");
  } catch (err) {
    
    res.send(err);
  }
  
});

router.get('/:id', async (req, res) => {
  var bookitem = await bookModel.findById(req.params.id) 
  // console.log(book)

  try {
    // res.render('layouts/getBook' ,{ book:book ,id:id, layout:'getBook'});
     res.send(bookitem)
     console.log(bookitem)

  } catch (err) {
    res.status(500).send(err);
  }

  
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(currentbook.id)
    if (!book) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});
router.patch('/:id', async (req, res) => {
  try {
    await bookModel.findByIdAndUpdate(currentbook.id, req.body)
    await bookModel.save()
    res.send(book)
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;

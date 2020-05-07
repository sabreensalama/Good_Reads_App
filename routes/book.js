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
 const pageCount = Math.ceil(books.length / 10);
 let page = parseInt(req.query.p);
 if (!page) { page = 1;}
 if (page > pageCount) {
   page = pageCount
 }
 return res.render('layouts/books' ,{page: page,pageCount: pageCount,booksIds: booksIds,books: books.slice(page * 10 - 10, page * 10) , state: currentState,layout : 'books'});
    
  } catch (err) {
    return res.status(500).json(err);

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
router.get('/search', async (req, res) => {
  
  word = req.query.word.replace(/\s+/g, '');

  var book = await bookModel.find({ 'name' : { '$regex' : word, '$options' : 'i' } });
  try {
    console.log(book)
    if(word)
    res.json({ book: book })
 else
 res.json({})
  } catch (err) {
    
    res.send(err);
  }
  
});
router.get('/:id', async (req, res) => {
  var id = req.params.id
  var book = await bookModel.findById(id).populate('user').populate('category').exec();
  const user = await userModel.findOne({"email":session.email}) 
  const state = await readingStatusModel.findOne({"user":user.id , "book": req.params.id}); 

  console.log(state)


  try {
    
    res.render('layouts/getBook' ,{ book:book ,state:state, layout:'getBook'});

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

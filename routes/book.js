var express = require('express');
const bookModel = require('../models/book');
const session = require('express-session')

var router = express.Router();

router.get('/', async (req, res) => {
  const books = await bookModel.find({});

  try {
    res.render('books' ,{locals: {books: books}});
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

router.get('/find', async (req, res) => {
  const book = await bookModel.findOne({"email":req.params.id}) 

  try {
    res.send(book);
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

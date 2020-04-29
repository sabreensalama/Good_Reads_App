var express = require('express');
const authorModel = require('../models/authors');
const bookModel = require('../models/book');
var router = express.Router();

router.get('/', async (req, res) => {
  const authors = await authorModel.find({});

  try {
    res.send(authors);
  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.post('/', async (req, res) => {
  const author = new authorModel(req.body);
  try {
   const tmp = await author.save();
    
   
    res.send("added");
  } catch (err) {
    
    res.send(err);
  }
  
});
router.get('/profile', async (req, res) => {
  const books = await bookModel.find({"author":req.params.author}) 

  try {
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.get('/find', async (req, res) => {
  const author = await authorModel.findOne({"id":req.params.id}) 

  try {
    res.send(author);
  } catch (err) {
    res.status(500).send(err);
  }

  
});

router.delete('/:id', async (req, res) => {
  try {
    
    const author = await authorModel.findByIdAndDelete(currentauthor.id)
    if (!author) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});
router.patch('/:id', async (req, res) => {
  try {
    
    await authorModel.findByIdAndUpdate(currentauthor.id, req.body)
    await authorModel.save()
    res.send(author)
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;

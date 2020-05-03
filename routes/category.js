var express = require('express');
const categoryModel = require('../models/categories');
const bookModel = require('../models/books');
var router = express.Router();

router.get('/', async (req, res) => {
  const categories = await categoryModel.find({});

  try {
    res.send(categories);
  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.post('/', async (req, res) => {
    const category = new categoryModel(req.body);
    try {
     const tmp = await category.save();
      res.send("added");
    } catch (err) {
      
      res.send(err);
    }
    
  });
router.get('/profile', async (req, res) => {
  const books = await bookModel.find({"category":req.params.category}) 

  try {
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.get('/find', async (req, res) => {
  const category = await categoryModel.findOne({"id":req.params.id}) 

  try {
    res.send(category);
  } catch (err) {
    res.status(500).send(err);
  }

  
});

router.delete('/:id', async (req, res) => {
  try {
    
    const category = await categoryModel.findByIdAndDelete(currentcategory.id)
    if (!category) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});
router.patch('/:id', async (req, res) => {
  try {
    
    await categoryModel.findByIdAndUpdate(currentcategory.id, req.body)
    await categoryModel.save()
    res.send(category)
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;

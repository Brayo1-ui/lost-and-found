const express  = require('express');
const router   = express.Router();
const auth     = require('../middleware/authMiddleware');
const upload   = require('../config/multer');
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');
 
router.get('/',          getItems);                  // public — anyone can browse
router.post('/', auth, upload.single('image'), createItem);  // must be logged in
router.put('/:id',  auth, updateItem);
router.delete('/:id', auth, deleteItem);
 
module.exports = router;
 

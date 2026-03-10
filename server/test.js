require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const Item = require('./models/Item');
  const items = await Item.find({});
  console.log(JSON.stringify(items, null, 2));
  process.exit();
});
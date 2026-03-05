const mongoose = require('mongoose');
 
const itemSchema = new mongoose.Schema({
  type:        { type: String, enum: ['lost','found'], required: true },
  name:        { type: String, required: true },
  category:    { type: String, required: true },
  location:    { type: String, required: true },
  description: { type: String },
  image:       { type: String },
  status:      { type: String, enum: ['active','resolved'], default: 'active' },
  reportedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
 
module.exports = mongoose.model('Item', itemSchema);

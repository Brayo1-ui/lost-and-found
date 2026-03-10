const Item = require('../models/Item');

exports.getItems = async (req, res) => {
  try {
    let query = {};

   if (req.query.user === 'me') {
  query.reportedBy = req.user.id || req.user._id;
}else {
      query.status = 'active';
    }

    const items = await Item.find(query).populate('reportedBy', 'name');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      image: req.file ? req.file.filename : null,
      reportedBy: req.user.id
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
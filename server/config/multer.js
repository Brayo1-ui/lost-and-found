const multer = require('multer');
const path   = require('path');
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
 
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  console.log('File mimetype:', file.mimetype);
  console.log('File originalname:', file.originalname);
  const isAllowed = allowed.test(file.mimetype);
  console.log('Is allowed:', isAllowed);
  cb(null, isAllowed);
};
 
module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

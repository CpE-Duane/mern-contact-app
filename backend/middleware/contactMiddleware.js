const multer = require('multer');
const path = require('path');

// Define the destination and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer with the storage option and no file type filter
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
}).single("photo");

const contactMiddleware = {
  upload
};

module.exports = contactMiddleware;

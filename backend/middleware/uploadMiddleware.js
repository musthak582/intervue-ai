const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({ // Dynamic params
    folder: 'intervue-ai',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, crop: 'limit' }],
    public_id: `${Date.now()}-${file.originalname}` // Unique filename
  })
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Add error handling wrapper
const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        error: 'Upload failed',
        details: err.message
      });
    }
    next();
  });
};

module.exports = { handleUploadCloudinary };
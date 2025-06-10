const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'interviewprepai-uploads', // optional - set a folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // allowed file formats
    // transformation: [{ width: 500, height: 500, crop: 'limit' }] // optional transformations
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
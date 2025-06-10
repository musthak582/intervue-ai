const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { handleUploadCloudinary } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);


router.post("/upload-image", handleUploadCloudinary, async (req, res) => {
  try {
    // Check if file exists (might be in req.file or req.body.file depending on setup)
    const file = req.file;
    if (!file) {
      console.log('No file received in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Debug log the entire file object
    console.log('Uploaded file object:', file);

    // Ensure Cloudinary URL exists
    if (!file.path) {
      console.error('Cloudinary URL missing in file object');
      throw new Error('Cloudinary URL not generated');
    }

    console.log('File uploaded successfully:', file.path);

    // Send response
    res.status(200).json({
      imageUrl: file.path
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      error: 'Server error',
      message: err.message
    });
  }
});


module.exports = router;

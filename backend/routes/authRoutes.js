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
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Ensure Cloudinary URL exists
    if (!req.file.path) {
      throw new Error('Cloudinary URL not generated');
    }

    console.log('File uploaded successfully:', req.file.path);

    // Explicitly end the response
    res.status(200).json({
      imageUrl: req.file.path
    }).end(); // ← Critical for preventing hangs

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      error: 'Server error',
      message: err.message
    });
  }
});


module.exports = router;

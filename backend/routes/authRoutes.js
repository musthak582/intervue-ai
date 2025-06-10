const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { handleUploadCloudinary } = require('../middleware/uploadMiddleware');
const multer = require('multer');
const upload = multer({ 
  dest: 'uploads/', 
  storage: multer.memoryStorage(), // Store file in memory as Buffer
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}); 


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);


router.post(
  "/upload-image",
  upload.single('image'),
  handleUploadCloudinary,
  async (req, res) => {
    try {
      // Check if Cloudinary upload succeeded
      if (!req.file || !req.file.path) {
        console.error("❌ Cloudinary upload failed - no file path");
        return res.status(500).json({
          success: false,
          error: "Cloudinary upload failed",
        });
      }

      console.log("✅ Upload success. URL:", req.file.path);

      // Send the URL back to the frontend
      res.status(200).json({
        success: true,
        imageUrl: req.file.path,
      });
    } catch (err) {
      console.error("❌ Server error:", err);
      res.status(500).json({
        success: false,
        error: "Server error",
        details: err.message,
      });
    }
  }
);

module.exports = router;

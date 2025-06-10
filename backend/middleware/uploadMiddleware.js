const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const handleUploadCloudinary = async (req, res, next) => {
  try {
    // Check if file exists (now using req.file from Multer)
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid file type. Only JPEG, PNG, JPG, WEBP, and GIF are allowed.'
      });
    }

    // Convert file buffer to base64 (Cloudinary accepts this)
    const fileBase64 = req.file.buffer.toString('base64');
    const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      public_id: `${uuidv4()}-${req.file.originalname}`,
      folder: 'your_folder_name',
      resource_type: 'auto',
    });

    // Attach Cloudinary result to req.file
    req.file = {
      path: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes,
      width: result.width,
      height: result.height
    };

    next();
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({
      success: false,
      error: 'Error uploading image to Cloudinary',
      details: error.message
    });
  }
};

module.exports = { handleUploadCloudinary };
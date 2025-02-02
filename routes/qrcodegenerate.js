const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

/**
 * @swagger
 * tags:
 *   name: QRCode
 *   description: API for generating QR Codes
 */

/**
 * @swagger
 * /qrcode:
 *   post:
 *     summary: Generate a QR Code
 *     tags: [QRCode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qrcode:
 *                 type: string
 *                 example: "Hello, QR Code!"
 *     responses:
 *       200:
 *         description: QR Code successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 base64:
 *                   type: string
 *                   example: "data:image/png;base64,iVBORw0..."
 */
router.post('/qrcode', async (req, res) => {
  const { qrcode } = req.body;
  console.log('qee', qrcode);
  

  if (!qrcode) {
    return res.status(400).json({
      success: false,
      message: 'Field "qrcode" is required.',
    });
  }

  try {
    const base64 = await QRCode.toDataURL(qrcode); // Generate QR Code in Base64 format
    res.status(200).json({
      success: true,
      base64,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate QR Code',
      error: error.message,
    });
  }
});

module.exports = router;

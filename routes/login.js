const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      // Validasi input
      if (!username || !password) {
          return res.status(400).json({ success: false, error: 'Username and password are required' });
      }

      // Cari pengguna berdasarkan username
      const { data: user, error } = await supabase
          .from('users')
          .select('*') // Mengambil semua kolom
          .eq('username', username)
          .single();

      if (error || !user) {
          return res.status(401).json({ success: false, error: 'Invalid username or password' });
      }

      // Validasi password
      if (user.password !== password) {
          return res.status(401).json({ success: false, error: 'Invalid username or password' });
      }

      // Buat token JWT (opsional)
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
          { id: user.id, username: user.username }, // Payload token
          process.env.JWT_SECRET || 'your-secret-key', // Secret key
          { expiresIn: '1h' } // Masa berlaku token
      );

      // Response dengan token dan seluruh data pengguna
      res.status(200).json({
          success: true,
          token,
          user, // Mengembalikan seluruh data pengguna
      });
  } catch (err) {
      res.status(500).json({ success: false, error: err.message });
  }
});
  
  module.exports = router;
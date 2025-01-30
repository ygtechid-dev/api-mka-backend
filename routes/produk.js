const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

/**
 * @swagger
 * tags:
 *   name: Produk
 *   description: API for managing produk
 */

/**
 * @swagger
 * /produk:
 *   get:
 *     summary: Retrieve all produk
 *     tags: [Produk]
 *     responses:
 *       200:
 *         description: A list of produk
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       namaproduk:
 *                         type: string
 *                         example: Kopi Hitam
 *                       kategori:
 *                         type: string
 *                         example: Minuman
 *                       jmlstok:
 *                         type: integer
 *                         example: 50
 */
router.get('/produk', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('produk')
      .select('*'); // Pilih semua kolom

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /produk/{id}:
 *   get:
 *     summary: Retrieve a produk by ID
 *     tags: [Produk]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The produk ID
 *     responses:
 *       200:
 *         description: Details of a produk
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     namaproduk:
 *                       type: string
 *                       example: Kopi Hitam
 */
router.get('/produk/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('produk')
      .select('*')
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /produk:
 *   post:
 *     summary: Create a new produk
 *     tags: [Produk]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               namaproduk:
 *                 type: string
 *                 example: Kopi Hitam
 *               kategori:
 *                 type: string
 *                 example: Minuman
 *               subkategori:
 *                 type: string
 *                 example: Kopi
 *               supplier:
 *                 type: string
 *                 example: PT. Kopi Nusantara
 *               jmlstok:
 *                 type: integer
 *                 example: 50
 *               hargajual:
 *                 type: number
 *                 example: 15000
 *               hargamodal:
 *                 type: number
 *                 example: 10000
 *     responses:
 *       201:
 *         description: The produk was successfully created
 */
router.post('/produk', async (req, res) => {
  const { namaproduk, kategori, subkategori, supplier, jmlstok, fotoproduk, hargajual, hargamodal } = req.body;

  try {
    const { data, error } = await supabase
      .from('produk')
      .insert([
        { namaproduk, kategori, subkategori, supplier, jmlstok, fotoproduk, hargajual, hargamodal },
      ]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /produk/{id}:
 *   put:
 *     summary: Update a produk by ID
 *     tags: [Produk]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The produk ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               namaproduk:
 *                 type: string
 *                 example: Kopi Hitam
 *               kategori:
 *                 type: string
 *                 example: Minuman
 *               subkategori:
 *                 type: string
 *                 example: Kopi
 *               supplier:
 *                 type: string
 *                 example: PT. Kopi Nusantara
 *               jmlstok:
 *                 type: integer
 *                 example: 50
 *               hargajual:
 *                 type: number
 *                 example: 15000
 *               hargamodal:
 *                 type: number
 *                 example: 10000
 *     responses:
 *       200:
 *         description: The produk was successfully updated
 */
router.put('/produk/:id', async (req, res) => {
  const { id } = req.params;
  const { namaproduk, kategori, subkategori, supplier, jmlstok, fotoproduk, hargajual, hargamodal } = req.body;

  try {
    const { data, error } = await supabase
      .from('produk')
      .update({ namaproduk, kategori, subkategori, supplier, jmlstok, fotoproduk, hargajual, hargamodal })
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /produk/{id}:
 *   delete:
 *     summary: Delete a produk by ID
 *     tags: [Produk]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The produk ID
 *     responses:
 *       200:
 *         description: The produk was successfully deleted
 */
router.delete('/produk/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('produk')
      .delete()
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

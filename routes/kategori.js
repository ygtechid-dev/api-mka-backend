const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

/**
 * @swagger
 * tags:
 *   name: Kategori
 *   description: API for managing categories
 */

/**
 * @swagger
 * /kategori:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Kategori]
 *     responses:
 *       200:
 *         description: A list of categories
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
 *                       nama_kategori:
 *                         type: string
 *                         example: Snack
 */
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('kategori')
      .select('*'); // Select all categories

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /kategori:
 *   post:
 *     summary: Create a new category
 *     tags: [Kategori]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_kategori:
 *                 type: string
 *                 example: Snack
 *     responses:
 *       201:
 *         description: Category successfully created
 */
router.post('/', async (req, res) => {
  const { nama_kategori } = req.body;

  try {
    const { data, error } = await supabase
      .from('kategori')
      .insert([{ nama_kategori }]); // Insert new category

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /kategori/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Kategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_kategori:
 *                 type: string
 *                 example: Makanan
 *     responses:
 *       200:
 *         description: Category successfully updated
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_kategori } = req.body;

  try {
    const { data, error } = await supabase
      .from('kategori')
      .update({ nama_kategori }) // Update category
      .eq('id', id); // Where ID matches

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /kategori/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Kategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category successfully deleted
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('kategori')
      .delete()
      .eq('id', id); // Where ID matches

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

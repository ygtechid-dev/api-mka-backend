const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

/**
 * @swagger
 * tags:
 *   name: Subkategori
 *   description: API for managing subcategories
 */

/**
 * @swagger
 * /subkategori:
 *   get:
 *     summary: Retrieve all subcategories
 *     tags: [Subkategori]
 *     responses:
 *       200:
 *         description: A list of subcategories
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
 *                       nama_subkategori:
 *                         type: string
 *                         example: Snack
 */
router.get('/subkategori', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('subkategori')
      .select('*'); // Select all columns

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /subkategori/{id}:
 *   get:
 *     summary: Retrieve a subcategory by ID
 *     tags: [Subkategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subcategory
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A subcategory object
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
 *                     nama_subkategori:
 *                       type: string
 *                       example: Snack
 */
router.get('/subkategori/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('subkategori')
      .select('*')
      .eq('id', id); // Filter by ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /subkategori:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [Subkategori]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_subkategori:
 *                 type: string
 *                 example: Snack
 *     responses:
 *       201:
 *         description: Subcategory successfully created
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
 *                     nama_subkategori:
 *                       type: string
 *                       example: Snack
 */
router.post('/subkategori', async (req, res) => {
  const { nama_subkategori } = req.body;

  try {
    const { data, error } = await supabase
      .from('subkategori')
      .insert([{ nama_subkategori }]); // Insert data

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /subkategori/{id}:
 *   put:
 *     summary: Update a subcategory by ID
 *     tags: [Subkategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subcategory
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_subkategori:
 *                 type: string
 *                 example: Snack Updated
 *     responses:
 *       200:
 *         description: Subcategory successfully updated
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
 *                     nama_subkategori:
 *                       type: string
 *                       example: Snack Updated
 */
router.put('/subkategori/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_subkategori } = req.body;

  try {
    const { data, error } = await supabase
      .from('subkategori')
      .update({ nama_subkategori }) // Update the data
      .eq('id', id); // Filter by ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /subkategori/{id}:
 *   delete:
 *     summary: Delete a subcategory by ID
 *     tags: [Subkategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subcategory
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Subcategory successfully deleted
 */
router.delete('/subkategori/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('subkategori')
      .delete()
      .eq('id', id); // Filter by ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

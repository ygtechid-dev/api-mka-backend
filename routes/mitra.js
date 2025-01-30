const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

/**
 * @swagger
 * tags:
 *   name: Mitra
 *   description: API for managing mitra
 */

/**
 * @swagger
 * /mitra:
 *   get:
 *     summary: Retrieve all mitra
 *     tags: [Mitra]
 *     responses:
 *       200:
 *         description: A list of mitra
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
 *                       namamitra:
 *                         type: string
 *                         example: Mitra A
 *                       lokasimitra:
 *                         type: string
 *                         example: Jakarta
 *                       nomorhandphone:
 *                         type: string
 *                         example: "08123456789"
 *                       nama_pic:
 *                         type: string
 *                         example: John Doe
 *                       nik_pic:
 *                         type: string
 *                         example: "1234567890123456"
 */
router.get('/mitra', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mitra')
      .select('*'); // Select all columns

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /mitra/{id}:
 *   get:
 *     summary: Retrieve a mitra by ID
 *     tags: [Mitra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the mitra
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A mitra object
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
 *                     namamitra:
 *                       type: string
 *                       example: Mitra A
 *                     lokasimitra:
 *                       type: string
 *                       example: Jakarta
 *                     nomorhandphone:
 *                       type: string
 *                       example: "08123456789"
 *                     nama_pic:
 *                       type: string
 *                       example: John Doe
 *                     nik_pic:
 *                       type: string
 *                       example: "1234567890123456"
 */
router.get('/mitra/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('mitra')
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
 * /mitra:
 *   post:
 *     summary: Create a new mitra
 *     tags: [Mitra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               namamitra:
 *                 type: string
 *                 example: Mitra A
 *               lokasimitra:
 *                 type: string
 *                 example: Jakarta
 *               nomorhandphone:
 *                 type: string
 *                 example: "08123456789"
 *               nama_pic:
 *                 type: string
 *                 example: John Doe
 *               nik_pic:
 *                 type: string
 *                 example: "1234567890123456"
 *     responses:
 *       201:
 *         description: Mitra successfully created
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
 *                     namamitra:
 *                       type: string
 *                       example: Mitra A
 *                     lokasimitra:
 *                       type: string
 *                       example: Jakarta
 *                     nomorhandphone:
 *                       type: string
 *                       example: "08123456789"
 *                     nama_pic:
 *                       type: string
 *                       example: John Doe
 *                     nik_pic:
 *                       type: string
 *                       example: "1234567890123456"
 */
router.post('/mitra', async (req, res) => {
  const { namamitra, lokasimitra, nomorhandphone, nama_pic, nik_pic } = req.body;

  try {
    const { data, error } = await supabase
      .from('mitra')
      .insert([
        { namamitra, lokasimitra, nomorhandphone, nama_pic, nik_pic }, // Insert data
      ]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /mitra/{id}:
 *   put:
 *     summary: Update mitra by ID
 *     tags: [Mitra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the mitra
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
 *               namamitra:
 *                 type: string
 *                 example: Mitra A Updated
 *               lokasimitra:
 *                 type: string
 *                 example: Jakarta Updated
 *               nomorhandphone:
 *                 type: string
 *                 example: "08123456789"
 *               nama_pic:
 *                 type: string
 *                 example: Jane Doe
 *               nik_pic:
 *                 type: string
 *                 example: "1234567890123456"
 *     responses:
 *       200:
 *         description: Mitra successfully updated
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
 *                     namamitra:
 *                       type: string
 *                       example: Mitra A Updated
 *                     lokasimitra:
 *                       type: string
 *                       example: Jakarta Updated
 *                     nomorhandphone:
 *                       type: string
 *                       example: "08123456789"
 *                     nama_pic:
 *                       type: string
 *                       example: Jane Doe
 *                     nik_pic:
 *                       type: string
 *                       example: "1234567890123456"
 */
router.put('/mitra/:id', async (req, res) => {
  const { id } = req.params;
  const { namamitra, lokasimitra, nomorhandphone, nama_pic, nik_pic } = req.body;

  try {
    const { data, error } = await supabase
      .from('mitra')
      .update({ namamitra, lokasimitra, nomorhandphone, nama_pic, nik_pic }) // Update the data
      .eq('id', id); // Filter by ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /mitra/{id}:
 *   delete:
 *     summary: Delete mitra by ID
 *     tags: [Mitra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the mitra
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Mitra successfully deleted
 */
router.delete('/mitra/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('mitra')
      .delete()
      .eq('id', id); // Filter by ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

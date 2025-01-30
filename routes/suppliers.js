const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: API for managing suppliers
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Retrieve all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: A list of suppliers
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
 *                       nama_supplier:
 *                         type: string
 *                         example: MKA
 */
router.get('/suppliers', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('supplier')
      .select('*');

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Retrieve a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Supplier ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A supplier
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
 *                     nama_supplier:
 *                       type: string
 *                       example: MKA
 */
router.get('/suppliers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('supplier')
      .select('*')
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Add a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_supplier:
 *                 type: string
 *                 example: Kedai NgopiDuluKawan
 *     responses:
 *       201:
 *         description: Supplier successfully created
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
 *                     nama_supplier:
 *                       type: string
 *                       example: Kedai NgopiDuluKawan
 */
router.post('/suppliers', async (req, res) => {
  const { nama_supplier } = req.body;

  try {
    const { data, error } = await supabase
      .from('supplier')
      .insert([{ nama_supplier }]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Supplier ID
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
 *               nama_supplier:
 *                 type: string
 *                 example: Toko Kopi Baru
 *     responses:
 *       200:
 *         description: Supplier successfully updated
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
 *                     nama_supplier:
 *                       type: string
 *                       example: Toko Kopi Baru
 */
router.put('/suppliers/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_supplier } = req.body;

  try {
    const { data, error } = await supabase
      .from('supplier')
      .update({ nama_supplier })
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Supplier ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Supplier successfully deleted
 */
router.delete('/suppliers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('supplier')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

/**
 * @swagger
 * tags:
 *   name: Pengajuan
 *   description: API for managing pengajuan
 */

/**
 * @swagger
 * /pengajuan:
 *   get:
 *     summary: Retrieve all pengajuan
 *     tags: [Pengajuan]
 *     responses:
 *       200:
 *         description: A list of pengajuan
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
 *                       id_pemohon:
 *                         type: integer
 *                         example: 101
 *                       namaproduk:
 *                         type: string
 *                         example: Laptop
 *                       jumlah:
 *                         type: integer
 *                         example: 10
 *                       tanggal_pengajuan:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-25"
 *                       status:
 *                         type: string
 *                         example: "pending"
 */
router.get('/pengajuan', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .select('*');

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /pengajuan/{id}:
 *   get:
 *     summary: Retrieve a pengajuan by ID
 *     tags: [Pengajuan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the pengajuan
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A pengajuan object
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
 *                     id_pemohon:
 *                       type: integer
 *                       example: 101
 *                     namaproduk:
 *                       type: string
 *                       example: Laptop
 *                     jumlah:
 *                       type: integer
 *                       example: 10
 *                     tanggal_pengajuan:
 *                       type: string
 *                       format: date
 *                       example: "2025-01-25"
 *                     status:
 *                       type: string
 *                       example: "pending"
 */
router.get('/pengajuan/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('pengajuan')
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
 * /pengajuan:
 *   post:
 *     summary: Create a new pengajuan
 *     tags: [Pengajuan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_pemohon:
 *                 type: integer
 *                 example: 101
 *               namaproduk:
 *                 type: string
 *                 example: Laptop
 *               jumlah:
 *                 type: integer
 *                 example: 10
 *               tanggal_pengajuan:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-25"
 *               status:
 *                 type: string
 *                 example: "pending"
 *               tanggal_approve:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               id_mitra:
 *                 type: integer
 *                 example: 202
 *     responses:
 *       201:
 *         description: Pengajuan successfully created
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
 *                     id_pemohon:
 *                       type: integer
 *                       example: 101
 *                     namaproduk:
 *                       type: string
 *                       example: Laptop
 *                     jumlah:
 *                       type: integer
 *                       example: 10
 *                     tanggal_pengajuan:
 *                       type: string
 *                       format: date
 *                       example: "2025-01-25"
 *                     status:
 *                       type: string
 *                       example: "pending"
 */
router.post('/pengajuan', async (req, res) => {
  const { id_pemohon, namaproduk, jumlah, tanggal_pengajuan, status, tanggal_approve, id_mitra } = req.body;

  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .insert([{ id_pemohon, namaproduk, jumlah, tanggal_pengajuan, status, tanggal_approve, id_mitra }]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /pengajuan/{id}:
 *   put:
 *     summary: Update a pengajuan by ID
 *     tags: [Pengajuan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the pengajuan
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
 *               status:
 *                 type: string
 *                 example: "approved"
 *               tanggal_approve:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               id_mitra:
 *                 type: integer
 *                 example: 202
 *     responses:
 *       200:
 *         description: Pengajuan successfully updated
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
 *                     status:
 *                       type: string
 *                       example: "approved"
 *                     tanggal_approve:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-01"
 */
router.put('/pengajuan/:id', async (req, res) => {
  const { id } = req.params;
  const { status, tanggal_approve, id_mitra } = req.body;

  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .update({ status, tanggal_approve, id_mitra })
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /pengajuan/{id}:
 *   delete:
 *     summary: Delete a pengajuan by ID
 *     tags: [Pengajuan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the pengajuan
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Pengajuan successfully deleted
 */
router.delete('/pengajuan/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

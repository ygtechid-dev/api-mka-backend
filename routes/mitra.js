const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

// GET: Ambil semua data mitra
router.get('/mitra', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mitra')
      .select('*'); // Pilih semua kolom

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Ambil data mitra berdasarkan ID
router.get('/mitra/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('mitra')
      .select('*')
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST: Tambah data mitra baru
router.post('/mitra', async (req, res) => {
  const { namamitra, lokasimitra, id_pic_mitra, nomorhandphone } = req.body;

  try {
    const { data, error } = await supabase
      .from('mitra')
      .insert([
        { namamitra, lokasimitra, id_pic_mitra, nomorhandphone }, // Data yang dimasukkan
      ]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT: Update data mitra berdasarkan ID
router.put('/mitra/:id', async (req, res) => {
  const { id } = req.params;
  const { namamitra, lokasimitra, id_pic_mitra, nomorhandphone } = req.body;

  try {
    const { data, error } = await supabase
      .from('mitra')
      .update({ namamitra, lokasimitra, id_pic_mitra, nomorhandphone }) // Data yang diperbarui
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE: Hapus data mitra berdasarkan ID
router.delete('/mitra/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('mitra')
      .delete()
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

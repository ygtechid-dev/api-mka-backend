const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

// GET: Ambil semua data users
router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*'); // Pilih semua kolom

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Ambil data user berdasarkan ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST: Tambah data user baru
router.post('/users', async (req, res) => {
  const { username, role, mitra_id, password, namaLengkap } = req.body;

  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { username, role, mitra_id, password, namaLengkap }, // Data yang dimasukkan
      ]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT: Update data user berdasarkan ID
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, role, mitra_id, password, namaLengkap } = req.body;

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ username, role, mitra_id, password, namaLengkap }) // Data yang diperbarui
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE: Hapus data user berdasarkan ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

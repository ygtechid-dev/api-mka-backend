const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

// GET: Ambil semua data pengajuan
router.get('/pengajuan', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .select('*'); // Pilih semua kolom

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Ambil data pengajuan berdasarkan ID
router.get('/pengajuan/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .select('*')
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST: Tambah data pengajuan baru
router.post('/pengajuan', async (req, res) => {
  const { id_pemohon, namaproduk, jumlah, tanggal_pengajuan, status, tanggal_approve, id_mitra } = req.body;

  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .insert([
        { id_pemohon, namaproduk, jumlah, tanggal_pengajuan, status, tanggal_approve, id_mitra },
      ]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



// PUT: Update data pengajuan berdasarkan ID
router.put('/pengajuan/:id', async (req, res) => {
  const { id } = req.params;
  const { status, tanggal_approve, id_mitra } = req.body;

  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .update({ status, tanggal_approve, id_mitra })
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE: Hapus data pengajuan berdasarkan ID
router.delete('/pengajuan/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .delete()
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

// GET: Ambil semua data produk
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

// GET: Ambil produk berdasarkan ID
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

// POST: Tambah data produk baru
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

// PUT: Update data produk berdasarkan ID
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

// DELETE: Hapus data produk berdasarkan ID
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

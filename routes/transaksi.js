const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

// GET: Ambil semua transaksi dengan detail produk
router.get('/transaksi', async (req, res) => {
  try {
    // Ambil semua transaksi
    const { data: transaksi, error: transaksiError } = await supabase
      .from('transaksi')
      .select('id, tanggaltransaksi, pesanan, totalharga, metodepembayaran, statuspembayaran, modeserving, nomormeja');

    if (transaksiError) throw transaksiError;

    // Ambil detail produk berdasarkan ID produk yang ada di pesanan
    for (let t of transaksi) {
      const produkIds = t.pesanan;
      const { data: produkData, error: produkError } = await supabase
        .from('produk')
        .select('id, namaproduk, kategori, subkategori, supplier, jmlstok, fotoproduk, hargajual, hargamodal')
        .in('id', produkIds); // Mengambil produk yang ID-nya ada di array pesanan

      if (produkError) throw produkError;

      t.produk = produkData; // Menambahkan data produk ke transaksi
    }

    res.status(200).json({ success: true, data: transaksi });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Ambil data transaksi berdasarkan ID
router.get('/transaksi/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Ambil transaksi berdasarkan ID
    const { data: transaksi, error: transaksiError } = await supabase
      .from('transaksi')
      .select('id, tanggaltransaksi, pesanan, totalharga, metodepembayaran, statuspembayaran, modeserving, nomormeja')
      .eq('id', id);

    if (transaksiError) throw transaksiError;

    // Ambil detail produk berdasarkan ID produk yang ada di pesanan
    const produkIds = transaksi[0].pesanan;
    const { data: produkData, error: produkError } = await supabase
      .from('produk')
      .select('id, namaproduk, kategori, subkategori, supplier, jmlstok, fotoproduk, hargajual, hargamodal')
      .in('id', produkIds);

    if (produkError) throw produkError;

    transaksi[0].produk = produkData; // Menambahkan data produk ke transaksi

    res.status(200).json({ success: true, data: transaksi[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST: Tambah transaksi baru
router.post('/transaksi', async (req, res) => {
  const { pesanan, totalharga, metodepembayaran, statuspembayaran, modeserving, nomormeja } = req.body;

  try {
    const { data, error } = await supabase
      .from('transaksi')
      .insert([
        { 
          pesanan, 
          totalharga, 
          metodepembayaran, 
          statuspembayaran, 
          modeserving, 
          nomormeja 
        }, // Data transaksi yang dimasukkan
      ]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT: Update transaksi berdasarkan ID
router.put('/transaksi/:id', async (req, res) => {
    const { id } = req.params;
    const { statuspembayaran, modeserving, nomormeja } = req.body;  // Hanya mengambil kolom yang ingin diupdate
  
    try {
      const { data, error } = await supabase
        .from('transaksi')
        .update({
          statuspembayaran, 
          modeserving, 
          nomormeja 
        }) // Hanya kolom tertentu yang diperbarui
        .eq('id', id); // Filter berdasarkan ID
  
      if (error) throw error;
  
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  
// DELETE: Hapus transaksi berdasarkan ID
router.delete('/transaksi/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('transaksi')
      .delete()
      .eq('id', id); // Filter berdasarkan ID

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

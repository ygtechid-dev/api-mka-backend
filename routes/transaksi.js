const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase Client

/**
 * @swagger
 * tags:
 *   name: Transaksi
 *   description: API for managing transaksi
 */

/**
 * @swagger
 * /transaksi:
 *   get:
 *     summary: Retrieve all transaksi with detailed produk
 *     tags: [Transaksi]
 *     responses:
 *       200:
 *         description: A list of transaksi
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
 *                       tanggaltransaksi:
 *                         type: string
 *                         format: date-time
 *                       pesanan:
 *                         type: array
 *                         items:
 *                           type: integer
 *                       totalharga:
 *                         type: number
 *                         format: float
 *                       produk:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             namaproduk:
 *                               type: string
 *                               example: Kopi Hitam
 */
router.get('/transaksi', async (req, res) => {
  try {
    const { data: transaksi, error: transaksiError } = await supabase
      .from('transaksi')
      .select('id, tanggaltransaksi, pesanan, totalharga, metodepembayaran, statuspembayaran, modeserving, nomormeja, namapemesan, nomorpemesan, id_pemesan');

    if (transaksiError) throw transaksiError;

    for (let t of transaksi) {
      const produkIds = t.pesanan;
      const { data: produkData, error: produkError } = await supabase
        .from('produk')
        .select('id, namaproduk, kategori, subkategori, supplier, jmlstok, fotoproduk, hargajual, hargamodal')
        .in('id', produkIds);

      if (produkError) throw produkError;

      t.produk = produkData;
    }

    res.status(200).json({ success: true, data: transaksi });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /transaksi/{id}:
 *   get:
 *     summary: Retrieve a transaksi by ID with detailed produk
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the transaksi
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A transaksi with detailed produk
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
 *                     tanggaltransaksi:
 *                       type: string
 *                       format: date-time
 *                     pesanan:
 *                       type: array
 *                       items:
 *                         type: integer
 *                     totalharga:
 *                       type: number
 *                       format: float
 *                     produk:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           namaproduk:
 *                             type: string
 *                             example: Kopi Hitam
 */
router.get('/transaksi/:id_pemesan', async (req, res) => {
  const { id_pemesan } = req.params;

  try {
    const { data: transaksi, error: transaksiError } = await supabase
      .from('transaksi')
      .select(
        'id, tanggaltransaksi, pesanan, totalharga, metodepembayaran, statuspembayaran, modeserving, nomormeja, namapemesan, nomorpemesan'
      )
      .eq('id_pemesan', id_pemesan); // Filter by customer ID

    if (transaksiError) throw transaksiError;

    if (!transaksi.length) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    const produkIds = transaksi[0].pesanan;
    const { data: produkData, error: produkError } = await supabase
      .from('produk')
      .select(
        'id, namaproduk, kategori, subkategori, supplier, jmlstok, fotoproduk, hargajual, hargamodal'
      )
      .in('id', produkIds); // Filter by product IDs

    if (produkError) throw produkError;

    transaksi[0].produk = produkData;

    res.status(200).json({ success: true, data: transaksi[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /transaksi:
 *   post:
 *     summary: Create a new transaksi
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pesanan:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_produk:
 *                       type: string
 *                     nama_produk:
 *                       type: string
 *                     qty:
 *                       type: integer
 *                     harga:
 *                       type: number
 *                       format: float
 *               totalharga:
 *                 type: number
 *                 format: float
 *               metodepembayaran:
 *                 type: string
 *               statuspembayaran:
 *                 type: string
 *               modeserving:
 *                 type: string
 *               nomormeja:
 *                 type: string
 *               namapemesan:
 *                 type: string
 *               nomorpemesan:
 *                 type: string
 *               id_pemesan:
 *                 type: string
 *               id_mitra:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaksi successfully created
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
 *                     pesanan:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id_produk:
 *                             type: string
 *                             example: "P001"
 *                           nama_produk:
 *                             type: string
 *                             example: "Kopi"
 *                           qty:
 *                             type: integer
 *                             example: 2
 *                           harga:
 *                             type: number
 *                             format: float
 *                             example: 25000
 *                     totalharga:
 *                       type: number
 *                       format: float
 *                       example: 50000
 *                     metodepembayaran:
 *                       type: string
 *                       example: "Cash"
 *                     statuspembayaran:
 *                       type: string
 *                       example: "Lunas"
 *                     modeserving:
 *                       type: string
 *                       example: "Dine-in"
 *                     nomormeja:
 *                       type: string
 *                       example: "A1"
 *                     namapemesan:
 *                       type: string
 *                       example: "Budi"
 *                     nomorpemesan:
 *                       type: string
 *                       example: "08123456789"
 *                     id_pemesan:
 *                       type: string
 *                       example: "user123"
 *                     id_mitra:
 *                       type: string
 *                       example: "mitra456"
 */
router.post('/transaksi', async (req, res) => {
  const { pesanan, totalharga, metodepembayaran, statuspembayaran, modeserving, nomormeja, namapemesan, nomorpemesan, id_pemesan, id_mitra } = req.body;

  if (!Array.isArray(pesanan) || pesanan.length === 0) {
    return res.status(400).json({ success: false, error: 'Pesanan harus berupa array dan tidak boleh kosong.' });
  }

  try {
    // 🚀 Ambil detail produk sebelum disimpan
    const pesananLengkap = await Promise.all(pesanan.map(async (id_produk) => {
      const { data: produk, error: errorProduk } = await supabase
        .from('produk')
        .select('nama_produk, hargajual, qty')
        .eq('id_produk', id_produk)
        .single();

      if (errorProduk) throw errorProduk;
      if (!produk) throw new Error(`Produk dengan ID ${id_produk} tidak ditemukan.`);

      return {
        id_produk,
        nama_produk: produk.nama_produk,
        qty: 1,  // Default qty = 1 (bisa diubah dari frontend)
        harga: produk.hargajual
      };
    }));

    // 🚀 Insert data transaksi ke Supabase
    const { data, error } = await supabase
      .from('transaksi')
      .insert([{ 
        pesanan: JSON.stringify(pesananLengkap), // Simpan sebagai JSONB
        totalharga, 
        metodepembayaran, 
        statuspembayaran, 
        modeserving, 
        nomormeja, 
        namapemesan, 
        nomorpemesan, 
        id_pemesan, 
        id_mitra 
      }]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


/**
 * @swagger
 * /transaksi/{id}:
 *   put:
 *     summary: Update an existing transaksi by ID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the transaksi to update
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
 *               statuspembayaran:
 *                 type: string
 *               modeserving:
 *                 type: string
 *               nomormeja:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaksi successfully updated
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
 *                     statuspembayaran:
 *                       type: string
 *                       example: paid
 *                     modeserving:
 *                       type: string
 *                       example: dine-in
 */
router.put('/transaksi/:id_pemesan', async (req, res) => {
  const { id_pemesan } = req.params;
  const { statuspembayaran, modeserving, nomormeja, metodepembayaran } = req.body;

  try {
    // Konversi id_pemesan dan nomormeja ke string
    const idPemesanStr = String(id_pemesan);
    const nomormejaStr = nomormeja ? String(nomormeja) : null; // Jika null, tetap null

    console.log(`Updating transaksi for id_pemesan: ${idPemesanStr}`); // Debugging

    const { data, error } = await supabase
      .from('transaksi')
      .update({
        statuspembayaran,
        modeserving,
        nomormeja: nomormejaStr, // Pastikan nomormeja sebagai string atau null
        metodepembayaran,
      })
      .eq('id_pemesan', idPemesanStr)
      .select(); // Gunakan select() agar data yang diperbarui dikembalikan

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Update Error:', err.message); // Logging error
    res.status(500).json({ success: false, error: err.message });
  }
});




/**
 * @swagger
 * /transaksi/{id}:
 *   delete:
 *     summary: Delete a transaksi by ID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the transaksi to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Transaksi successfully deleted
 */
router.delete('/transaksi/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('transaksi')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

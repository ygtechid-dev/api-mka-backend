const express = require('express');
const cors = require('cors'); // Import CORS package
const app = express();
const userRoutes = require('./routes/user'); // Import routes untuk user
const mitraRoutes = require('./routes/mitra'); // Import routes untuk mitra
const produkRoutes = require('./routes/produk');
const transaksiRoutes = require('./routes/transaksi');
const pengajuanRoutes = require('./routes/pengajuan');


// Middleware untuk CORS (Menerima semua origin)
app.use(cors()); // Tidak ada opsi, artinya menerima semua origin

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan routes untuk `user` dan `mitra`
app.use('/api/users', userRoutes);  // Semua endpoint user diawali dengan `/api/users`
app.use('/api/mitra', mitraRoutes); // Semua endpoint mitra diawali dengan `/api/mitra`
app.use('/api', produkRoutes);
app.use('/api', transaksiRoutes);
app.use('/api', pengajuanRoutes);
// Jalankan server
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

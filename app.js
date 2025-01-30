const express = require('express');
const cors = require('cors'); // Import CORS package
const swaggerUi = require('swagger-ui-express'); // Import Swagger UI
const swaggerJsDoc = require('swagger-jsdoc'); // Import Swagger JSDoc
const app = express();
const userRoutes = require('./routes/user'); // Import routes untuk user
const mitraRoutes = require('./routes/mitra'); // Import routes untuk mitra
const produkRoutes = require('./routes/produk');
const transaksiRoutes = require('./routes/transaksi');
const pengajuanRoutes = require('./routes/pengajuan');
const kategoriRoutes = require('./routes/kategori');
const subkategoriRoutes = require('./routes/subkategori');
const loginRoutes = require('./routes/login');
const suppliersRoutes = require('./routes/suppliers');




const qrCodeRoutes = require('./routes/qrcodegenerate');

const QRCode = require('qrcode');


// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the project',
    },
    servers: [
      {
        url: 'http://localhost:9001', // Replace with your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware untuk Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware untuk CORS (Menerima semua origin)
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan routes untuk `user` dan `mitra`
app.use('/api', userRoutes);
app.use('/api', mitraRoutes);
app.use('/api', produkRoutes);
app.use('/api', transaksiRoutes);
app.use('/api', pengajuanRoutes);
app.use('/api', qrCodeRoutes);
app.use('/api', subkategoriRoutes);
app.use('/api', loginRoutes);
app.use('/api', suppliersRoutes);


app.use('/api/kategori', kategoriRoutes);



// Jalankan server
const PORT = process.env.PORT || 9001;
console.log('PORT:', process.env.PORT); // Debugging
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

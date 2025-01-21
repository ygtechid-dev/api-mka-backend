const { createClient } = require('@supabase/supabase-js');

// Ganti dengan kredensial Supabase Anda
const supabaseUrl = 'https://brxdwiefnwipsbgkfybi.supabase.co'; // Ganti dengan URL Supabase Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyeGR3aWVmbndpcHNiZ2tmeWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMDY4NTEsImV4cCI6MjA1MTg4Mjg1MX0.Xwo_eR1USjBVVRMgiCxGvBL7vgGszuuy_Y94zatSY8U'; // Ganti dengan API Key Supabase Anda

// Inisialisasi Supabase Client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

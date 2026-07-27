const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 1. Configurar la conexión con MySQL (XAMPP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Usuario por defecto en XAMPP
  password: '',      // Contraseña por defecto en XAMPP (vacía)
  database: 'fogon_criollo'
});

// 2. Conectar a la Base de Datos
db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a la Base de Datos:', err);
  } else {
    console.log('✅ Conectado exitosamente a la Base de Datos MySQL');
  }
});

// 3. Ruta para obtener todos los platos desde la BD
app.get('/api/platos', (req, res) => {
  const sql = 'SELECT * FROM platos';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.json(results);
    }
  });
});

// 4. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
const mysql = require('mysql2'); // o 'mysql'
 const connection = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT || 3306
});
module.exports = connection;
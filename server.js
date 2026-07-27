const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
// Render asigna un puerto dinámico mediante process.env.PORT
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Servir archivos estáticos (HTML, JS, CSS, imágenes) desde la raíz
app.use(express.static(__dirname));

// Entregar el index.html en la ruta principal '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// 1. Configurar la conexión con MySQL usando las Variables de Entorno
const db = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST || 'localhost',
  user: process.env.MYSQL_ADDON_USER || 'root',
  password: process.env.MYSQL_ADDON_PASSWORD || '',
  database: process.env.MYSQL_ADDON_DB || 'fogon_criollo',
  port: process.env.MYSQL_ADDON_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// 2. Probar que la base de datos responda
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error al conectar a la Base de Datos:', err);
  } else {
    console.log('✅ Conectado exitosamente a la Base de Datos MySQL');
    connection.release(); // Liberamos la conexión de prueba
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
  console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});
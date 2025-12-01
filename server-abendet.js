const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('../firebase/abendet-ba808-962b5b06773a.json');

// Inicializar la aplicación de Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://abendet-ba808-default-rtdb.firebaseio.com"
});

const app = express();
const port = 5000;

// Middleware CORS para permitir solicitudes el frontend
app.use(cors({
  origin: "https://abendet6.netlify.app/"
}));



// Ruta para la URL raíz
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente.');
});

// Ruta para listar todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map(userRecord => ({
      uid: userRecord.uid,
      email: userRecord.email,
    }));
    res.json(users);
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({ error: 'Failed to list users' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

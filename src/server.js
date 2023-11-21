const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/igroomer', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

// const itemRoutes = require('./routes/itemRoutes');
// app.use('/api/items', itemRoutes);

// Importar e usar as rotas para usuários
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
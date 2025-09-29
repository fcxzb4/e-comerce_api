// server.js

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // Importa o roteador

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); 
app.use(express.json()); // ESSENCIAL para ler o corpo das requisições POST

// ----------------------
// Montagem das Rotas
// Qualquer rota que comece com /api/products será tratada pelo productRoutes
// Ex: GET http://localhost:3001/api/products
// Ex: POST http://localhost:3001/api/products
// ----------------------
app.use('/api/products', productRoutes);

// Rota de Teste (Raiz)
app.get('/', (req, res) => {
    res.send('API de E-commerce rodando. Acesse /api/products');
});

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`🚀 Back-end (JS Express) rodando em http://localhost:${PORT}`);
});
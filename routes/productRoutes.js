// routes/productRoutes.js

import express from 'express';
const router = express.Router();
// Importa os dados (o "banco de dados" e o carrinho)
import PRODUCTS  from './../module/data/products.js';

router.get('/', (req, res) => {
    console.log('GET /api/products solicitado.');
    // 🚨 CORREÇÃO MAIS IMPORTANTE: Retornar o ARRAY de produtos DIRETAMENTE
    return res.status(200).json(PRODUCTS);
});

// ----------------------
// Rota POST: Criar um novo cartão
// URL: /api/products
// ----------------------
router.post('/', (req, res) => {
    const newProduct = req.body;
    const newId = PRODUCTS.length > 0 ? PRODUCTS[PRODUCTS.length - 1].id + 1 : 1;
    
    const productWithId = { 
        id: newId, 
        ...newProduct, 
        image: newProduct.image || "https://via.placeholder.com/300x200?text=Novo+Produto"
    };

    PRODUCTS.push(productWithId);
    console.log(`POST: Novo produto criado: ${productWithId.title}`);
    return res.status(201).json(productWithId);
});

// ----------------------
// Rota PUT: Editar um cartão
// URL: /api/products/:id
// ----------------------
router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id); 
    const updatedData = req.body;
    
    const productIndex = PRODUCTS.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Produto não encontrado para atualização.' });
    }

    const updatedProduct = {
        ...PRODUCTS[productIndex],
        ...updatedData, 
        id: productId
    };

    PRODUCTS[productIndex] = updatedProduct;
    console.log(`PUT: Produto ID ${productId} atualizado.`);
    return res.status(200).json(updatedProduct);
});

// ----------------------
// Rota DELETE: Excluir um cartão
// URL: /api/products/:id
// ----------------------
router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id); 
    const productIndex = PRODUCTS.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: `Produto ID ${productId} não encontrado para exclusão.` });
    }

    PRODUCTS.splice(productIndex, 1);
    console.log(`DELETE: Produto ID ${productId} excluído.`);
    // 204 No Content indica exclusão bem sucedida
    return res.status(204).send(); 
});


export default router;
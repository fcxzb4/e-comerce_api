// routes/productRoutes.js

import express from 'express';
const router = express.Router();
// Importa os dados (o "banco de dados" e o carrinho)
import PRODUCTS from './../module/data/products.js';

router.put('/:id', (req, res) => {
    // Pega o ID do produto da URL (parâmetro de rota)
    const productId = parseInt(req.params.id); 
    const updatedData = req.body;
    
    // 1. Encontra o índice do produto no array
    const productIndex = PRODUCTS.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        // Se o produto não for encontrado, retorna 404
        return res.status(404).json({ message: 'Produto não encontrado para atualização.' });
    }

    // 2. Cria o objeto atualizado (mantém o ID e substitui os outros campos)
    const updatedProduct = {
        ...PRODUCTS[productIndex], // Mantém dados antigos
        ...updatedData,             // Sobrescreve com dados novos
        id: productId               // Garante que o ID não mude
    };

    // 3. Atualiza o array no índice encontrado
    PRODUCTS[productIndex] = updatedProduct;
    
    console.log(`Produto ID ${productId} atualizado.`);
    return res.status(200).json(updatedProduct); // Retorna o produto atualizado
});

router.delete('/:id', (req, res) => {
    // Pega o ID do produto da URL (parâmetro de rota)
    const productId = parseInt(req.params.id); 
    
    // 1. Encontra o índice do produto
    const productIndex = PRODUCTS.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        // Se o produto não for encontrado, retorna 404
        return res.status(404).json({ message: `Produto ID ${productId} não encontrado para exclusão.` });
    }

    // 2. Remove o produto do array usando splice()
    PRODUCTS.splice(productIndex, 1);
    
    console.log(`Produto ID ${productId} excluído com sucesso.`);
    // Retorna 204 (No Content) para indicar sucesso na exclusão, mas sem corpo de resposta
    return res.status(204).send(); 
});


export default router;
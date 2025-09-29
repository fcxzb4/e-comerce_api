// routes/productRoutes.js

const express = require('express');
const router = express.Router();
// Importa os dados (o "banco de dados" e o carrinho)
const { PRODUCTS, CART } = require('../module/data/products');

// ----------------------
// Rota GET: Obter todos os cartões/produtos
// URL: /api/products
// ----------------------
router.get('/', (req, res) => {
    return res.status(200).json(PRODUCTS);
});

// ----------------------
// Rota POST: Criar um novo produto (novo cartão)
// URL: /api/products
// Body: { title, description, price, image }
// ----------------------
router.post('/', (req, res) => {
    const newProduct = req.body;
    
    // Simula a geração de um novo ID
    const newId = PRODUCTS.length > 0 ? PRODUCTS[PRODUCTS.length - 1].id + 1 : 1;
    
    const productWithId = { 
        id: newId, 
        ...newProduct, 
        // Garantindo que a imagem não seja nula
        image: newProduct.image || "https://via.placeholder.com/300x200?text=Novo+Produto"
    };

    PRODUCTS.push(productWithId);
    
    console.log(`Novo produto criado: ${productWithId.title}`);
    return res.status(201).json(productWithId); // Retorna o produto criado com status 201 (Created)
});


// ----------------------
// Rota POST: Simular a adição de um produto ao carrinho
// URL: /api/products/add-to-cart
// Body: { productId, quantity }
// ----------------------
router.post('/add-to-cart', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    // Simula a lógica de adicionar/atualizar no carrinho
    const existingItem = CART.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        CART.push({ id: productId, title: product.title, quantity });
    }

    console.log(`Produto ${product.title} adicionado ao carrinho.`);
    // O ideal seria retornar o carrinho, mas aqui só retornamos sucesso.
    return res.status(200).json({ message: 'Produto adicionado ao carrinho com sucesso!', cart: CART }); 
});


module.exports = router;
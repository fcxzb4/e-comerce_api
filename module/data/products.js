// data/products.js

// Usamos 'let' para que a lista possa ser modificada (adicionar novos produtos via POST)
const PRODUCTS = [
    {
        id: 1,
        title: "braia de tarbalho",
        description: "Conforto para os trabalhos mais arduos de sua casa.",
        price: "199,90",
        image: "https://via.placeholder.com/300x200?text=Trabalho"
    },
    {
        id: 2,
        title: "braia de instrumento",
        description: "A escolha perfeita para os fins de semana.",
        price: "69,90",
        image: "https://via.placeholder.com/300x200?text=Instrumento"
    },
    // ... adicione mais produtos se quiser
];

export default PRODUCTS;
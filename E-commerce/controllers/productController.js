const productService = require('../services/productService');

class ProductController {
    async createProduct(req, res) {
        try {
            const productData = req.body;
            const productId = await productService.createProduct(productData);
            res.status(201).json({ message: 'Producto creado exitosamente', productId });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getProduct(req, res) {
        try {
            const productId = req.params.id;
            const product = await productService.getProduct(productId);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const productData = req.body;
            await productService.updateProduct(productId, productData);
            res.json({ message: 'Producto actualizado exitosamente' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            await productService.deleteProduct(productId);
            res.json({ message: 'Producto eliminado exitosamente' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async searchProducts(req, res) {
        try {
            const { query } = req.query; // Asumiendo que la búsqueda viene en la query
            const products = await productService.searchProducts(query);
            res.json(products);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new ProductController();

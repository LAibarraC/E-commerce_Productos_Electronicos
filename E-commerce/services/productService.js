const ProductRepository = require('../repository/productRepository');

class ProductService {
    async createProduct(productData) {
        return await ProductRepository.createProduct(productData);
    }

    async getAllProducts() {
        return await ProductRepository.findAllProducts();
    }

    async getProduct(id) {
        return await ProductRepository.findById(id);
    }

    async updateProduct(id, productData) {
        return await ProductRepository.updateProduct({ id, ...productData });
    } 

    async deleteProduct(id) {
        return await ProductRepository.deleteProduct(id);
    }

    async searchProducts(query) {
        return await ProductRepository.searchProducts(query);
    }
}

module.exports = new ProductService();

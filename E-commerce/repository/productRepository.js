const Product = require('../models/product');
const { Op } = require('sequelize');

class ProductRepository {
    static async createProduct(product) {
        const newProduct = await Product.create(product);
        return newProduct.id;
    }

    static async findAllProducts() {
        return await Product.findAll();
    }
 
    static async findById(id) {
        return await Product.findByPk(id);
    }

    static async updateProduct(product) {
        await Product.update(product, {
            where: { id: product.id }
        });
    }

    static async deleteProduct(id) {
        await Product.destroy({ where: { id } });
    }

    static async searchProducts(query) {
        return await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { brand: { [Op.like]: `%${query}%` } },
                    { tags: { [Op.contains]: query } } // Para búsqueda en etiquetas
                ]
            }
        });
    }

}


module.exports = ProductRepository;

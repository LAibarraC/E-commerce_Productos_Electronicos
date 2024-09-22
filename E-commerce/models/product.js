const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    length: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    width: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    warranty: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
});

module.exports = Product;


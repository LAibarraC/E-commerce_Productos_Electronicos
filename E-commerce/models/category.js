// models/category.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Category extends Model {
    // Método para actualizar la información de la categoría
    updateCategory(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.updateAt = new Date();
    }
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    updateAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize, // Conexión de Sequelize
    modelName: 'Category', // Nombre del modelo
    tableName: 'category', // Nombre de la tabla
    timestamps: false // Desactivar timestamps automáticos de Sequelize
});

module.exports = Category;


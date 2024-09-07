const UserRepository = require('../repository/userRepository');
const User = require('../models/user');

class UserService {
    async login(username, password) {
        const user = await UserRepository.findByUsername(username);
        if (user && user.password === password) {
            return user; // O devolver un token JWT en un escenario más avanzado
        }
        throw new Error('Usuario o contraseña incorrectos');
    }

    async register(userData) {
        const user = {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            updateAt: new Date(),
            image: userData.image,
            role: userData.role
        };
        return await UserRepository.createUser(user);
    }

    async getAllUsers() {
        return await UserRepository.findAllUsers();
    }

    async editUser(id, userData) {
        const user = {
            id: id,
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            updateAt: new Date(),
            image: userData.image,
            role: userData.role
        };
        return await UserRepository.updateUser(user);
    }

    async deleteUser(id) {
        return await UserRepository.deleteUser(id);
    }

    async getUser(id) {
        return await UserRepository.findById(id);
    }
}

module.exports = new UserService();


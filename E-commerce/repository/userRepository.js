const User = require('../models/user');

class UserRepository {
    static async findByUsername(username) {
        return await User.findOne({ where: { username } });
    }

    static async createUser(user) {
        const newUser = await User.create(user);
        return newUser.id;
    }

    static async findAllUsers() {
        return await User.findAll();
    }

    static async updateUser(user) {
        await User.update({
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            updateAt: user.updateAt,
            image: user.image,
            role: user.role
        }, {
            where: { id: user.id }
        });
    }

    static async deleteUser(id) {
        await User.destroy({ where: { id } });
    }

    static async findById(id) {
        return await User.findByPk(id);
    }
}

module.exports = UserRepository;


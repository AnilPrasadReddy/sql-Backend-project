const db = require('../utils/databaseUtil');
const bcrypt = require('bcryptjs');

const User = {
    createUser: async (name, email, password, role) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO `users` (name, email, password, role) VALUES (?, ?, ?, ?)';
            const [result] = await db.execute(query, [name, email, hashedPassword, role]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    findByEmail: async (email) => {
        try {
            const query = 'SELECT * FROM `users` WHERE email = ?';
            const [result] = await db.execute(query, [email]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = User;

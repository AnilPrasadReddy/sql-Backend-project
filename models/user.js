const db = require('../utils/databaseUtil');
const bcrypt = require('bcryptjs')
const user = {
    createUser: async (name, email, password, role) => {
        try {
            const hashPassword = await bcryt.hash(password, 10);
            const query = 'INSERT INTO USER (name,email,password,role) values(?,?,?,?)';
            const [result] = await db.execute(query, [name, email, hashPassword, role]);
            return result
        } catch (error) {
            throw error;
        }
    },
    findByEmail: async (email) => {
        try {
            const query = 'SELECT * FROM USER WHERE email = ?';
            const [result] = await db.execute(query, [email]);
            if (result.length > 0) {
                return result[0]
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    },
    
}
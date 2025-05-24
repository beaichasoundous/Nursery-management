import pool from '../config/databaseConf.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class User {
  //-----------------------searching the user by his EMAIL----------------------
    static async findByEmail(email) {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    }

  //--------------------creating user in the database--------------------------
    static async create({ full_name, email, password, role = 'parent', phone, is_approved = 0 }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.query(
        'INSERT INTO users (full_name, email, password, role, phone, is_approved) VALUES (?, ?, ?, ?, ?, ?) ',
        [full_name, email, hashedPassword, role, phone, is_approved]
      );
      return { id: result.insertId, full_name, email, role, phone, is_approved };
    }

  //--------------------GENERATES JWT-------------------
    static generateJWT(user) {
    const payload = { userId: user.id, email: user.email, role: user.role };  

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  }

export default User;
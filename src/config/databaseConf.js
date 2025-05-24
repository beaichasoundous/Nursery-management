import mysql from 'mysql2'

//Database Connecting
    const pool = mysql.createPool({
        host: process.env.DB_HOST ,
        user: process.env.DB_USER ,
        password: process.env.DB_PASSWORD ,
        database: process.env.DB_NAME ,
        port: process.env.DB_PORT || 3306,
        }).promise();

    
    // Test the connection
    async function testConnection() {
        let connection;
        try {
        connection = await pool.getConnection();
        console.log('Successfully connected to the database!');
        } catch (err) {
        console.error('Database connection failed:', err);
        } 
    }
    //Call the connection function
        testConnection();
    
export default pool;
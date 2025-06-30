const mysql = require('mysql2/promise');
const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  let ip;
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response.data.ip;
  } catch (err) {
    console.error('Error fetching IP:', err);
    return res.status(500).json({ error: 'Failed to get IP' });
  }

  try {
    const connection = await mysql.createConnection({
      host: 'sql12.freesqldatabase.com',
      user: 'sql12787456',
      password: '1LbqpQMwlf',
      database: 'sql12787456',
      port: 3306,
    });

    const [result] = await connection.execute(
      'INSERT INTO user_info (name, ip) VALUES (?, ?)',
      [name, ip]
    );

    await connection.end();

    res.status(200).json({ success: true, insertedId: result.insertId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
};

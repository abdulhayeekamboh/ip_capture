const mysql = require('mysql2/promise');
const axios = require('axios');

module.exports = async (req, res) => {
  // Handle CORS preflight request
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, or specify your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Respond to preflight request
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  let ip;
  try {
    // Fetch public IP address
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response.data.ip;
  } catch (error) {
    console.error('Failed to get IP:', error);
    return res.status(500).json({ error: 'Failed to get IP address' });
  }

  try {
    // Connect to DB (hardcoded credentials)
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
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};

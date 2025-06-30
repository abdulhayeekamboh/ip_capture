const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { default: axios } = require('axios');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());


const db = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12787456',
    password: '1LbqpQMwlf',
    database: 'sql12787456',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// db.connect((err) => {
//     if (err) {
//         console.error('❌ Database connection failed:', err);
//     } else {
//         console.log('✅ Connected to MySQL database.');
//     }
// });


app.post('/api',async(req,res)=>{
    let ip = null;
    const {name} = req.body;
    console.log(name);

    try {
        const resposne = await axios.get('https://api.ipify.org/');
        console.log(resposne.data);
        ip = resposne.data;
        console.log(ip);
    } catch (error) {
        console.log(error);
    }


    const query = "insert into user_info(name,ip) values(?,?)";
    db.query(query, [name,ip],(e,reuslt)=>{
        if (e){
            return console.log('error',e);
        } console.log(reuslt);
    })
})



// ✅ Start server
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mariadb = require('mariadb');

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// Connect to database
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 5
    }
);

// log the connection login info
console.log('DB_HOST: ' + process.env.DB_HOST);
console.log('DB_USER: ' + process.env.DB_USER);
console.log('DB_PASS: ' + process.env.DB_PASS);
console.log('DB_NAME: ' + process.env.DB_NAME);


// Test database connection
pool.getConnection()
    .then(conn => {
        console.log('Connected to database');
        conn.release();
        }
    )
    .catch(err => {
        console.log('Error connecting to database');
        console.log(err);
        }
    );

app.get('/', (req, res) => {
    let users = [];
    pool.getConnection()
        .then(conn => {
            conn.query('SELECT * FROM accounts')
                .then(rows => {
                    users = rows;
                    conn.release();
                    res.send(users);
                    }
                )
                .catch(err => {
                    console.log('Error querying database');
                    }
                );
            }
        )
        .catch(err => {
            console.log('Error connecting to database');
            });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    }
);
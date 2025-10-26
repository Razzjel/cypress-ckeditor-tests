const express = require ("express");
const jwt = require ("jsonwebtoken");

const dotenv = require('dotenv').config();

// Make accessKey and environmentID variables in .env file
const accessKey = `${process.env.accessKey}`;
const environmentID = `${process.env.environmentID}`;

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
})

app.get('/', (req, res) =>{
    const payload = {
        aud: environmentID,
        sub: "Test user 1",
        user: {
            name: "aaaa",
            email: "aaaa@gmail.com"
        },
        auth: {
            'collaboration': {
                '*': {
                    'role': 'writer'
                }
            }
        }
    };

    const token = jwt.sign(payload, accessKey, {algorithm: 'HS256', expiresIn:'24h'});
    res.send(token);
});

app.listen(1337, ()=> {
    console.log("Token endpoint running on port 1337");
});
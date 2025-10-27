const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();
const generateSignature = require('./generateSignature');


const app = express();
const port = 9001;

const API_SECRET = process.env.API_SECRET;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID;
const ENVIRONMENT_ID = process.env.ENVIRONMENT_ID;

const BASE_API_URL = `https://${ORGANIZATION_ID}.cke-cs.com/api/v5/${ENVIRONMENT_ID}`;

app.use(express.json());

async function sendRequest(method, url, params = {}) {
    const timestamp = Date.now();
    const fullURL = new URL(url);

    Object.keys(params).forEach(key => fullURL.searchParams.append(key, params[key]))

    const signature = generateSignature(API_SECRET, method, fullURL.toString(), timestamp, null)

    const headers = {
        'X-CS-Timestamp': timestamp,
        'X-CS-Signature': signature,
        'Content-Type': 'application/json'        
    };

    try {
        const response = await axios({
           method: method,
           url: fullURL.toString(),
           headers: headers 
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        return {
            status: error.response?.status,
            data: error.response?.data
        };
    }
}


app.get('/flush', async (req,res) => {
    const {document_id} = req.query;

    if (!document_id) {
        return res.status(400).json({ message: 'Parametr "document_id" jest wymagany.'})
    }

    const url = `${BASE_API_URL}/collaborations/${document_id}`;
    const {status, data} = await sendRequest('DELETE', url);
    res.status(status).json(data);
});

app.get('/users', async (req,res) => {
    const {document_id} = req.query;

    if (!document_id) {
        return res.status(400).json({ message: 'Parametr "document_id" jest wymagany.'})
    }

    const url = `${BASE_API_URL}/collaborations/${document_id}/users`;
    const {status, data} = await sendRequest('GET', url);
    res.status(status).json(data);
});

app.get('/comments', async (req,res) => {
    const url = `${BASE_API_URL}/comments`;
    const {status, data} = await sendRequest('GET', url);
    res.status(status).json(data);
});


app.listen(port, () => {
    console.log(`Proxy to Cloud Services working on port: ${port}`)

});
const express = require('express');
const connectToDatabase = require('./database');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/data', async (req, res) => {
    const { client, collection } = await connectToDatabase();
    try {
        const data = await collection.find().toArray();
        res.status(200).json(data);
    } finally {
        client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

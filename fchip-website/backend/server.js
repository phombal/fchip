const express = require('express');
const cors = require('cors'); // To handle Cross-Origin Resource Sharing
const testQuery = require('./testQuery'); // Import your testQuery file

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route to get first five items
app.get('/api/firstFiveItems', async (req, res) => {
    try {
        const items = await testQuery.getFirstFiveItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get items by city name
app.get('/api/itemsByCity/:cityName', async (req, res) => {
    const { cityName } = req.params;
    try {
        const items = await testQuery.getItemsByCityName(cityName);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get items by zip code
app.get('/api/itemsByZip/:zip', async (req, res) => {
    const { zip } = req.params;
    try {
        const items = await testQuery.getItemsByZipCode(zip);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

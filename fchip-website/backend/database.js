const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb://localhost:27017'; // or your MongoDB Atlas connection string

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to database');
        const database = client.db('myDatabase'); // Replace with your database name
        const collection = database.collection('myCollection'); // Replace with your collection name
        return { client, collection };
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

module.exports = connectToDatabase;

const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://ericz27:PeidIGbThoiOCKfE@cluster0.s3zv6ft.mongodb.net/'; // or your MongoDB Atlas connection string

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function getFirstFiveItems() {
    try {
        await client.connect();
        console.log('Connected to database');
        const database = client.db('FCHIP_database'); // Replace with your database name
        const collection = database.collection('Provider_Directory'); // Replace with your collection name

        const firstFiveItems = await collection.find().limit(5).toArray();
        console.log('First 5 Items:', firstFiveItems);
        console.log(firstFiveItems[0])
    } catch (error) {
        console.error('Error retrieving items:', error);
    } finally {
        await client.close();
    }
}

getFirstFiveItems();

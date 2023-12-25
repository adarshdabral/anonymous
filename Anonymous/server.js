const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'anonymousMessages';

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-message', async (req, res) => {
    const name = req.body.name;
    const message = req.body.message;

    try {
        const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
        const db = client.db(dbName);

        // Store the message in a "messages" collection
        await db.collection('messages').insertOne({ name, message });

        client.close();

        res.json({ success: true, message: 'Message received and stored successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error storing the message.' });
    }
});

app.get('/view', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
        const db = client.db(dbName);

        // Retrieve messages from the "messages" collection
        const messages = await db.collection('messages').find({}).toArray();

        client.close();

        res.json({ success: true, messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving messages.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

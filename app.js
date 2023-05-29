const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());



const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb+srv://liben:5600@cluster0.ahnwckj.mongodb.net/test';
const dbName = 'Portfolio'; // Replace with your database name




// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  // Specify the database and collection
  const db = client.db(dbName);
  const collection = db.collection('Profile'); // Replace with your collection name
 
  // Define the API endpoint for getting data
  app.get('/Profile', (req, res) => {
    // Fetch data from MongoDB collection
    collection.find().toArray((findErr, data) => {
      if (findErr) {
        console.error('Error retrieving data from MongoDB:', findErr);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log(data);
      // Return the data as a JSON response
      res.json(data);
    });
  });
    
  app.get('/Projects', (req, res) => {
    // Fetch data from MongoDB collection
    const collection = db.collection('Project'); // Replace with your collection name
    collection.find().toArray((findErr, data) => {
      if (findErr) {
        console.error('Error retrieving data from MongoDB:', findErr);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log(data);
      // Return the data as a JSON response
      res.json(data); 
    });
  });

  app.get('/Skill', (req, res) => {
    // Fetch data from MongoDB collection
    const collection = db.collection('Skill'); // Replace with your collection name
    collection.find().toArray((findErr, data) => {
      if (findErr) {
        console.error('Error retrieving data from MongoDB:', findErr);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log(data);
      // Return the data as a JSON response
      res.json(data);
    });
  });
  
  app.get('/Experience', (req, res) => {
    // Fetch data from MongoDB collection
    const collection = db.collection('Experience'); // Replace with your collection name
    collection.find().toArray((findErr, data) => {
      if (findErr) {
        console.error('Error retrieving data from MongoDB:', findErr);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log(data);
      // Return the data as a JSON response
      res.json(data);
    });
  });


  console.log(collection.listIndexes());
  const port= 3001;
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  });

app.post('/display', (req, res) => {
  // Fetch data from MongoDB collection
  collection.find().toArray((findErr, data) => {
    if (findErr) {
      console.error('Error retrieving data from MongoDB:', findErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render the data as JSON on a web page
    const jsonData = JSON.stringify(data, null, 2);
    const html = `<pre>${jsonData}</pre>`;
    res.send(html);
  });
});

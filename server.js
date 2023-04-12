const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3000;

const uri = 'mongodb+srv://kingcharlesvi:EqEvMCqmWCMqJNHZ@kccounter.sdfxap5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });

let counter = 0;

client.connect((err) => {
  if (err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
  } else {
    console.log('Connected to MongoDB Atlas successfully!');

    const db = client.db('KCCounter');
    const collection = db.collection('counters');

    collection.findOne({}, (err, result) => {
      if (err) {
        console.log('Error occurred while finding counter...\n', err);
      } else if (result) {
        console.log('Counter found:', result.value);
        counter = result.value;
      } else {
        console.log('No counter found. Creating a new one...');
        collection.insertOne({ value: counter }, (err, result) => {
          if (err) {
            console.log('Error occurred while creating a new counter...\n', err);
          } else {
            console.log('New counter created:', result.ops[0].value);
          }
        });
      }
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/count', (req, res) => {
  res.json({ count: counter });
});

app.post('/increment', (req, res) => {
  counter++;
  const collection = client.db('KCCounter').collection('counters');
  collection.updateOne({}, { $set: { value: counter } }, (err, result) => {
    if (err) {
      console.log('Error occurred while updating counter...\n', err);
      res.send('Error occurred while updating counter');
    } else {
      console.log('Counter updated successfully!');
      res.send({ count: counter });
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at https://kayajancounter.kingcharlesvi.dev/`);
});

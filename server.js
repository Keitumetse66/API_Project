/* server code */

require('dotenv').config()
/*pulls the express library */
const express = require('express');

/*pulls in the mongoose library */
const mongoose = require('mongoose');

/* configs server */
const app = express();

/* connects mongoose library with mongodb */
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
/* error detection function on db */
db.on('error', (error) => console.error('error'));

/* function specifying the error type when connecting to db */
const connect = async () => {
    try {
        const MongoClient = require('mongodb').MongoClient;
        const uri = "MongoDB Atlas url for node.js";
        MongoClient.connect(uri, { useNewUrlParser: true });

        const collection = client.db('feedback').collection('itenary');
        client.close();

    } catch (error) {
        console.log('Error', error);
    }

    connect().then(() => {
        console.log('handle success here');
    }).catch((exception) => {
        console.log('handle error here:', exception);
    })
}

/* conects to db if no error detected */
db.once('open', () => console.log('Connected to database'));

/* sets up server to accept json. ii) allows us to use middleware in the exchange of data btwn db and app */
app.use(express.json());

/*Routes all client information */
const clientsRouter = require('./routes/clients');

    /*used whenever clients is queried */
app.use('/clients', clientsRouter);

    
/* create server port listener */
app.listen(3000, () => console.log('server is listening on port 3000'));
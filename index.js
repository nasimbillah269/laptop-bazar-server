const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000

// midlware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.20te8rd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoriesCollection = client.db('laptopBazar').collection('categories');
        const productsCollection = client.db('laptopBazar').collection('products');
        const bookingsCollection = client.db('laptopBazar').collection('bookings');
        const addProductsCollection = client.db('laptopBazar').collection('addProducts');

        app.get('/categories', async (req, res) => {
            const query = {}
            const result = await categoriesCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id
            const query = { categoryId: id }
            const result = await productsCollection.find(query).toArray();
            res.send(result)
        })

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result)
        });

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings)
        })

        app.post('/addProducts', async (req, res) => {
            const addProduct = req.body;
            const result = await addProductsCollection.insertOne(addProduct);
            res.send(result)
        });

    }
    finally {

    }
}
run().catch(console.log());



app.get('/', async (req, res) => {
    res.send('laptop bazar server running')
})

app.listen(port, () => {
    console.log(`laptop bazar server running on: ${port}`);
})
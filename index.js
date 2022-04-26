const express = require('express');
const cors = require('cors');

require('dotenv').config();

// for JWT

const jwt = require('jsonwebtoken')

const app = express();
const port = process.env.PORT || 5000


// middleware
app.use(cors());
app.use(express.json());


// Verify JWT TOKEN

function vefifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'UnAuthorized Access' })
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).send({ message: 'Forbidden access' });
    
    // console.log(decoded)
    
    req.decoded = decoded;
    next();

  })
  // console.log('inside verifyJWT', authHeader);
}


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// 




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mwock.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object

//     console.log("Genius Car DB connected")

//   client.close();
// });

async function run() {

  try {

    await client.connect();
    const serviceCollection = client.db("geniusCar").collection("service")
    const orderCollection = client.db("geniusCar").collection("orders")
    // do something is api


    // AUTH (JWT)
    app.post('/login', async (req, res) => {

      const user = req.body
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
      res.send({ accessToken })

    })




    // SERVICES API

    // get all services
    app.get('/service', async (req, res) => {

      const query = {};

      const cursor = serviceCollection.find(query);

      // console.log(cursor);

      const services = await cursor.toArray();

      // console.log(services);

      res.send(services);

    })

    // get single service by id
    app.get('/service/:id', async (req, res) => {

      const id = req.params.id;
      const query = {
        _id: ObjectId(id)
      };

      const service = await serviceCollection.findOne(query);



      // console.log(services);

      res.send(service);

    })

    // post 
    app.post('/service', async (req, res) => {
      const newService = req.body;

      const result = await serviceCollection.insertOne(newService);

      res.send(result)
    })


    //DELETE
    app.delete('/service/:id', async (req, res) => {

      const id = req.params.id;
      const query = {
        _id: ObjectId(id),
      }

      const result = await serviceCollection.deleteOne(query);

      res.send(result);

    })

    // OrderCollection API

    // get orders by user
    app.get('/orders', vefifyJWT, async (req, res) => {

      // const authHeader = req.headers.authorization
      // console.log(authHeader);
      const decodedEmail = req.decoded.email;
      const email = req.query.email

      if (email == decodedEmail) {
        query = {
          userEmail: email
        };
        const cursor = await orderCollection.find(query);
        const orders = await cursor.toArray();
        res.send(orders);

      }
      else{
        res.status(403).send({message:"Forbidden access"})
      }

    })


    // create an order
    app.post('/order', async (req, res) => {
      orderData = req.body;
      const result = await orderCollection.insertOne(orderData);
      res.send(result);
    })


  }
  finally {

  }

}

run().catch(console.dir)











app.get('/', (req, res) => {
  res.send("Runnig genius server");
})


app.listen(port, () => {

  console.log("Listening to port")
});
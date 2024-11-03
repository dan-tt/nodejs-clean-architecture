
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGODB_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   connectTimeoutMS: 30000, // Optional: Increase timeout if necessary
//   serverSelectionTimeoutMS: 30000, // Increase server selection timeout
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     //
//     // Create a new database
//     const database = client.db('my_database');
//     // Send a ping to confirm a successful connection
//     await database.command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// const connectMongoDB = async () => {
//   run().catch(console.dir);
// };

// module.exports = { connectMongoDB };

const mongoose = require('mongoose');

async function connectDB() {
  try {
      await mongoose.connect(process.env.MONGODB_URI, {
          connectTimeoutMS: 30000, // Optional: Increase timeout if necessary
          serverSelectionTimeoutMS: 30000, // Increase server selection timeout
      });
      console.log('MongoDB connected successfully');
  } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit the process with failure
  }
}

const connectMongoDB = async () => {
  connectDB().catch(console.dir);
};

module.exports = { connectMongoDB };

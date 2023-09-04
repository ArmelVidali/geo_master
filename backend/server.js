const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  getAllCollections,
  getOneCollection,
  getAllDocuments,
} = require("./routes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
const mongo_uri = "mongodb://localhost:27017/geo_master";
const port = 3001;
app.listen(port, () => {
  console.log("Listening on port 3001");
});

// mongoclient to be reused
const mongoClient = new MongoClient(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    await mongoClient.connect();
    app.locals.mongoClient = mongoClient;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();

app.get("/all_collections", getAllCollections);
app.get("/one_collection", getOneCollection);
app.get("/getAllDocuments", getAllDocuments);

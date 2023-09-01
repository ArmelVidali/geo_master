const getAllCollections = async (req, res) => {
  const db = req.app.locals.mongoClient.db();
  //get all collections
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((collection) => collection.name);
  res.status(200).json({ collections: collectionNames });
};

const getOneCollection = async (req, res) => {
  const db = req.app.locals.mongoClient.db();
  const collectionName = req.query.collectionName;

  const collection = db.collection(collectionName);

  const documents = await collection.find({}).toArray();

  // Respond with the documents or perform other operations as needed
  res.status(200).json({ documents });
};

module.exports = { getAllCollections, getOneCollection };

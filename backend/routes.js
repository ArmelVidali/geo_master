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

  res.status(200).json({ documents });
};

const getAllDocuments = async (req, res) => {
  const db = req.app.locals.mongoClient.db();
  const collections = await db.listCollections().toArray();
  var output = [];
  for (let col of collections) {
    const collection = db.collection(col.name);

    let documents = await collection.find({}).toArray();

    if (Array.from(documents).length != 0) {
      output.push(documents);
    }
  }

  res.status(200).json({ output });
};

module.exports = { getAllCollections, getOneCollection, getAllDocuments };

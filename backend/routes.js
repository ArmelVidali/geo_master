const getAllCollections = async (req, res) => {
  const db = req.app.locals.mongoClient.db();
  //get all collections
  const collections = await db.listCollections().toArray();
  let test = new Set();
  for (let object of collections) {
    test.add(object.name.match(/dep_(\d+)/)[0]);
  }
  const customSort = (a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    return numA - numB;
  };
  test = Array.from(test).sort(customSort);

  res.status(200).json(Array.from(test));
};

const getOneCollection = async (req, res) => {
  const db = req.app.locals.mongoClient.db();
  const collectionName = req.query.collectionName;
  const categoryName = req.query.category;
  if (collectionName === "" && categoryName === "") {
    return res.status(400).json({ error: "Empty query parameters" });
  }
  var output = [];
  // If no category is provided, fetch data for all categories

  const categories = [
    "administratif",
    "adresses",
    "bati",
    "hydrographie",
    "lieux_nommes",
    "occupation_sol",
    "service_activites",
    "transports",
    "zone_reglementes",
  ];
  const category_provided = categories.includes(req.query.category);
  // fetch data for all categories of a given departement
  if (category_provided == false) {
    for (let categ of categories) {
      const collection = db.collection(collectionName + "_" + categ);
      const document = await collection.find({}).toArray();
      if (document.length != 0) {
        output.push(document);
      }
    }
  } else {
    const collection = db.collection(collectionName + "_" + categoryName);
    const document = await collection.find({}).toArray();
    if (document.length != 0) {
      output.push(document);
    }
  }
  res.status(200).json({ output });
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

import os
import sys
import json
from pymongo import MongoClient


def main(scale="", insee_id="", bdtopo_categ="", geom_type=[], filter={}):
    """
    Fetch data from the database.

    Returns : list of JSON files.

    Args :
        scale (str)  : geographical scale (region, dep...). Default : largest of the database (currently : dep)

        insee_id (str) : insee id of the scale item (ex : region code)

        bdtopo_categ (str) : bdtopo category like administratif, adress, bati ...

        geo_type (list): fetch only certain type, ex : Point, Polygon, Line..

        filter (objet) : 
            field : the field check for values
            operator : operation to apply (ie : == , > , < ..)
            value : value to compare
    """
    client = MongoClient("mongodb://localhost:27017")
    database = client["geo_master"]
    db_collection = database[collection_name]
    insertion_count = 0

    client.close()


if __name__ == "__main__":
    # type python3 main.py + arguments seperated by spaces to execute
    main(sys.argv[1], sys.argv[2])

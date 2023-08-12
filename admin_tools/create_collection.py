import os
import sys
import json
from pymongo import MongoClient


def main(prefix, number_of_collections):
    """
    Creates collections for the given range and for each categories from the bdtopo structure.
    Args: 
        prefix (str) : the prefix to add. Written originally to set a collection per geographical scale (ie : dep_94_batis)


        number_of_collections (int) :  the amount of collection to create. This was written to create a collection per french department, i will then range from 1 to nnumber_of_collections lenght
    """
    print(" ... creating collection ...")
    client = MongoClient("mongodb://localhost:27017")
    database = client["geo_master"]

    bdtopo_categories = ["administratif", "adresses", "bati", "hydrographie", "lieux_nommes",
                         "occupation_sol", "service_activites", "transports", "zone_reglementes"]

    try:
        for i in range(1, int(number_of_collections) + 1):
            for categorie in bdtopo_categories:
                new_collection = database[f"{prefix}_{str(i)}_{categorie}"]
                new_collection.create_index(
                    [("location", "2dsphere"), ("polygon", "2dsphere")])
        print(int(number_of_collections) + 1, " collections created")

    except NameError:
        print("An error occurred int the collections creation, key error : ", NameError)

    client.close()


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])

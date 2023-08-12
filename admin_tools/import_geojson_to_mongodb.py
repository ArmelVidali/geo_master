import os
import sys
import json
from pymongo import MongoClient


def main(files, collection_name):
    """
    Inserts a file or every file for a given folder into the given collection in the database

    Args :
        files (str) : absolute path of the file or folder
        collection_name (str) : name of the collection
    """
    print(" ...inserting files in the database...")
    client = MongoClient("mongodb://localhost:27017")
    database = client["geo_master"]
    db_collection = database[collection_name]
    insertion_count = 0

    try:
        if os.path.isdir(files):
            print("A folder was provided, inserting each file")
            for file in os.listdir(files):
                print(file)
                file_path = os.path.join(files, file)
                if os.path.isfile(file_path) & file.endswith("geojson"):
                    with open(file_path, "r") as document:
                        data = json.load(document)
                        data["name"] = str(file).replace(
                            ".geojson", "") + "_" + collection_name[:collection_name.rfind("_")]
                        insertion = db_collection.insert_one(data)
                        if insertion.acknowledged == True:
                            insertion_count += 1

        elif os.path.isfile(files) & files.endswith("geojson"):
            print("A single file was provided, inserting file")
            with open(files, "r") as document:
                data = json.load(document)
                data["name"] = str(file).replace(
                    ".geojson", "") + "_" + collection_name[:collection_name.rfind("_")]
                insertion = db_collection.insert_one(data)
                if insertion.acknowledged == True:
                    insertion_count += 1
        print(
            f"Insertion complete without error, {insertion_count} inserted elements")

    except NameError:
        print("An error occured : ", NameError)

    client.close()


if __name__ == "__main__":
    # type python3 main.py + arguments seperated by spaces to execute
    main(sys.argv[1], sys.argv[2])

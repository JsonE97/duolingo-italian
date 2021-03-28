# Flashcards.py is a python module for dealing with flashcard data in .csv format

import os

# some index's that will be used for the functions

INDEX_TOKEN = 0
INDEX_TRANSLATION = 1
INDEX_TOKEN_TYPE = 2
INDEX_TOKEN_EXAMPLE = 3

# parse_csv_file
# Description - takes the filename of flashcard data to load from
# Args        - fileName - the fileName of the csv file to load (will assume in same directory)
# returns     - a list of csv data in dic format {id, token, translation, token_type, token_example}


def parse_csv_file(fileName):
    scriptDir = os.path.dirname(__file__)
    relPath = "flashcards/{0}".format(fileName)
    absFilePath = os.path.join(scriptDir, relPath)
    flashcards = []

    if not os.path.exists(absFilePath):
        raise IOError(absFilePath + " - does not exist!")

    with open(absFilePath, "r") as f:
        for id, line in enumerate(f.readlines()):
            lineData = line.strip('\n').split(",")
            flashcards.append({
                'id': id,
                'token': lineData[INDEX_TOKEN],
                'translation': lineData[INDEX_TRANSLATION],
                'token_type': lineData[INDEX_TOKEN_TYPE],
                'token_example': lineData[INDEX_TOKEN_EXAMPLE]
            })
    return flashcards

# example usage
# if __name__ == '__main__':
#     print(parse_csv_file("flashCards1.csv"))

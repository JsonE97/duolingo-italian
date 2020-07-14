# Flashcards.py is a python module for dealing with flashcard data in .csv format

import os

# some index's that will be used for the functions

INDEX_TOKEN = 0
INDEX_TRANSLATION = 1
INDEX_TOKEN_TYPE = 2
INDEX_TOKEN_EXAMPLE = 3

# parse_csv_file
# args - fileName - the fileName of the csv file to load (must be abs path)
# returns - a list of csv data in dic format {id, token, translation, token_type, token_example}

def parse_csv_file(fileName):
    flashcards = []
    with open(fileName, "r") as f:
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


if __name__ == '__main__':
    script_dir = os.path.dirname(__file__)  # <-- absolute dir the script is in
    rel_path = "flashcards/flashcards1.csv"
    abs_file_path = os.path.join(script_dir, rel_path)
    print(parse_csv_file(abs_file_path))

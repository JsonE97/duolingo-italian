import time
from flask import Flask, request
import os

from parseWords import obtain_spacy_translations

# Main Flask app created here

app = Flask(__name__, static_folder="./build", static_url_path="/")

# APIFunctions class
# Description - used to store functions which will be called from react
class APIFunctions:

    # parse_input_text
    # Description - takes a block of text and retrives the verbs and nouns from it
    # Args        - args - an object containing the 'text' field for the function
    # Returns     - an object of nouns and verbs parsed
    def parse_input_text(args):
        text = args['text']
        finalParse = obtain_spacy_translations(text)
        return finalParse

    # global class function storage dictionary

    functions = {
        'parse_input_text': parse_input_text
    }

# executeBackendFunction
# Description - main function to be called from react in the convention where the request.args
#               should be an object of key->value arguments. Must include 'funcName'-><name> and
#               has an optional 'args'-><args>
# Returns     - an object of the result of the function call, if successful. otherwise an object
#               with success->false
@app.route('/api/executeBackendFunction')
def execute_backend_function():
    args = request.args
    func_name = args['funcName']
    func_args = {}
    for key in args.keys():
        if key != 'funcName':
            func_args[key] = args[key]
    func = APIFunctions.functions[func_name]
    res = {}
    if func:
        res = func(args)
    return {'result': res, 'success': True}

@app.route('/')
def index():
    return app.send_static_file('index.html')
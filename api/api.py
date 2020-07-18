import time
from flask import Flask, request
from googletrans import Translator
from parseWords import obtain_nouns_verbs

app = Flask(__name__)

translator = Translator()


class APIFunctions:
    def parse_input_text(args):
        text = args['text']
        translation = translator.translate(text, src="it", dest="en")
        finalParse = obtain_nouns_verbs(translation.text)
        return finalParse

    functions = {
        'parse_input_text': parse_input_text
    }


@app.route('/executeBackendFunction')
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
    return res
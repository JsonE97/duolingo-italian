import time
from flask import Flask, request
from googletrans import Translator
from parseWords import obtain_nouns_verbs

app = Flask(__name__)

translator = Translator()


@app.route('/parseText')
def parse_input_text():
    text = request.args["text"]
    translation = translator.translate(text, src="it", dest="en")
    finalParse = obtain_nouns_verbs(translation.text)
    return finalParse

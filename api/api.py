import time
from flask import Flask, request
from googletrans import Translator

app = Flask(__name__)

translator = Translator()

@app.route('/parseText')
def parse_input_text():
    text = request.args["text"]
    translation = translator.translate(text, src="it", dest="en")
    finalText = translation.text
    return {'args': finalText}
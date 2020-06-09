import time
from flask import Flask

app = Flask(__name__)

@app.route('/parseText/<args>')
def parse_input_text(args):
    
    return {'time': args}
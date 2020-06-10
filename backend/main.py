from flask import Flask, render_template
from api import api_blueprint

app = Flask(__name__, static_folder = '../frontend/dist/static', template_folder = '../frontend/dist')
app.register_blueprint(api_blueprint)

@app.route('/', defaults = {'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 8000, debug = True)

from flask import Flask, request
from flask_cors import CORS
import time

import biz


app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/api/', methods=['GET'])
def index():
    kw = request.args.get('kw', '')
    in_title = request.args.get('in_title', '')
    in_abs = request.args.get('in_abs', '')
    in_kws = request.args.get('in_kws', '')
    app.logger.info('查询参数 {} {} {} {}'.format(kw, in_title, in_abs, in_kws))
    data = biz.search(kw, in_title, in_abs, in_kws)
    return {'status': 200, 'kw':kw, 'data': data}

@app.route('/api/article/<id>', methods=['GET'])
def articleGet(id:str):
    data = biz.getArticle(id)
    return {'status': 200, 'data': data}

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=33333, debug=True)

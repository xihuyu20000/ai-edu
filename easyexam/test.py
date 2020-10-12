import threading

import bottle

import modules.api


@bottle.route('/')
def hello():
    return "Hello World!"


bottle.run(host='localhost', port=8084, debug=True)
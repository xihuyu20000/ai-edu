import threading

import bottle
import eel

import modules.api

class ServerThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)

    def run(self):
        bottle.run(host='localhost', port=8084, debug=True)


t = ServerThread()
t.setDaemon(True)
t.start()



if __name__ == '__main__':
    eel.init('web')
    eel.start('index.html', close_callback=modules.api.websocketClosed)

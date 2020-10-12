import json

from bottle import route, get, post
import bottle
import eel


@route('/hello')
def hello():
    return "Hello World!"


###########  参考  https://www.toptal.com/bottle/building-a-rest-api-with-bottle-framework

@bottle.hook('after_request')
def enable_cors():
    _allow_origin = '*'
    _allow_methods = 'PUT, GET, POST, DELETE, OPTIONS'
    _allow_headers = 'Authorization, Origin, Accept, Content-Type, X-Requested-With'

    bottle.response.headers['Access-Control-Allow-Origin'] = _allow_origin
    bottle.response.headers['Access-Control-Allow-Methods'] = _allow_methods
    bottle.response.headers['Access-Control-Allow-Headers'] = _allow_headers

@eel.expose
def websocketClosed(path, socketList):
    print("GUI Eel Socket Close", path, socketList)
    print('窗口关闭了')
    exit(0)



@get('/api/topics')
def topics():
    print('终于调用成功了')
    data = [
        {
            "title": "把生态文明建设纳入中国特色社会主义事业总体布局的是（）",
            "style": "单选题",
            "options": ["党的十八大", "党的十八届三中全会", "党的十九大"]
        },
        {
            "title": "2016 年 7 月 1 日，在庆祝中国共产党成立 95 周年大会上的讲话，习近平总书记指出，（）是党执政兴国的第一要务，是解决中国所有问题的关键。",
            "style": "单选题",
            "options": ["改革", "发展", "稳定"]
        },
        {
            "title": "（）是深化行政体制改制改革的核心，实质上要解决的是政府应该做什么、不应该做什么，重点是政府、市场、社会的关系。",
            "style": "单选题",
            "options": ["精简机构","转变政府职能","提高行政效率"]
        },

    ]

    return {'data':json.dumps(data, ensure_ascii=False)}

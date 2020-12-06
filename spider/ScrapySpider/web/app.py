# 第一步，安装模块 pip  install flask

from flask import Flask, render_template, request
from elasticsearch import Elasticsearch

INDEX_NAME = 'scirp-init'

es = Elasticsearch()


# 创建一个Flask实例
#template_folder的含义是html页面在哪个文件夹下，默认值是templates
# static_fold的含义是css、js、image等在哪个文件夹下，默认值是static
app = Flask(__name__, template_folder='', static_folder='', static_url_path='')

@app.route('/')     #单引号里面是访问路径
def index():
    return render_template('index.html')          # index.html默认的位置是在app.py同级的文件夹templates中的，返回给客户端

@app.route('/search')
def search():
    kw = request.args.get("kw")
    print('关键词', kw)
    ## 在这里，调用python代码，访问es，获取查询结果
    ## 下面result中对象的字段，一定与html页面的字段对应
    result = searchES(kw)
    return render_template('index.html', kw=kw, result=result)


def searchES(value):
    """
    全文检索
    :param value:
    :return:
    """
    ret = es.search(index=INDEX_NAME, doc_type='_doc', body={
        '_source':{
            'includes':['title','abstract']
        },
        'query':{
            'multi_match':{
                'query':value,
                'fields':['title', 'abstract', 'content']
            }
        },
        "highlight": {
            "require_field_match": False,
            "fields": {
                "*": {
                    "pre_tags": [
                        "<font color='red'>"
                    ],
                    "post_tags": [
                        "</font>"
                    ]
                }
            }
        }
    })
    # 无论是否查询到，都成立
    ret = ret['hits']['hits']
    print(ret)
    ret_new =[]
    if ret:
        for art in ret:
            art1 = art['_source']
            if 'highlight' in dict(art).keys() and art['highlight']:
                if 'title' in art['highlight'].keys():
                    art1['title'] = art['highlight']['title'][0]
                if 'abstract' in art['highlight'].keys():
                    art1['abstract'] = art['highlight']['abstract'][0]
            ret_new.append(art1)
    for art in ret_new:
        print('标题：'+art['title'])
        print('摘要：'+art['abstract'])
    return ret_new
# print(searchES('bioinformatics'))



if __name__ == '__main__':
    app.run(debug=True, port=5000) # 启动一个flask服务器，默认端口是5000

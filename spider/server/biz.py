from elasticsearch import Elasticsearch

es = Elasticsearch()

INDEX = 'scirp-init'


def search(value, in_title, in_abs, in_kws):
    """
    全文检索
    :param name:
    :return:
    """
    fields = []
    if in_title:
        fields.append('title')
    if in_abs:
        fields.append('abstract')
    if in_kws:
        fields.append('kws')

    body = {
        '_source': ['m_id', 'title', 'authors', 'journal_name', 'pub_year', 'pub_month'],
        'query': {
            'multi_match': {
                'query': value,
                'fields': fields
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

    }
    print('es查询条件', body)
    ret = es.search(index=INDEX, doc_type='_doc', body=body)
    ret = ret['hits']['hits']
    ret_new = []
    ret = ret['hits']['hits']
    ret_new = []
    if ret:
        for art in ret:
            art1 = art['_source']

            if 'highlight' in dict(art).keys() and art['highlight']:
                if 'title' in art['highlight'].keys():
                    art1['title'] = art['highlight']['title'][0]
                if 'content' in art['highlight'].keys():
                    art1['content'] = art['highlight']['content'][0]
            ret_new.append(art1)
    for art in ret_new:
        print('标题：'+art['title'])
        print('正文：'+art['content'])
    return ret_new


def getArticle(id):
    body = {
        'query': {
            'term': {
                'm_id': id
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

    }
    print('es查询条件', body)
    ret = es.search(index=INDEX, doc_type='_doc', body=body)
    ret = ret['hits']['hits']
    ret_new = ret[0]['_source']
    # ret_new['refs'] = ''.join(ret_new['refs']).replace('\r\n','')
    print('es结果', ret_new)
    return ret_new

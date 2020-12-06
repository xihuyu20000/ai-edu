# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import time

import pymongo
from elasticsearch import Elasticsearch


class SpiderPipeline:
    def process_item(self, item, spider):
        return item

class MongoDBPipeline(object):

    def open_spider(self, spider):
        self.errorFile = open('logs/'+spider.name + '-mongodb-error.txt', 'a', encoding='utf-8')
        conn = pymongo.MongoClient('localhost', 27017)
        db = conn[spider.name]
        self.collection = db['_doc']


    def process_item(self, item, spider):
        try:
            self.collection.insert(dict(item))
        except Exception as e:
            spider.logger.error('写入mongodb出错'+'\r\n')
            self.errorFile.write(str(e)+'\r\n')
            self.errorFile.flush()
        return item


class ElasticSearchPipeline:
    def open_spider(self, spider):
        self.errorFile = open('logs/'+spider.name + '-es-error.txt', 'a', encoding='utf-8')
        self.es = Elasticsearch()
        if not self.es.indices.exists(index=spider.name):
            self.create_index(spider.name)

    def process_item(self, item, spider):
        try:
            body = dict(item)
            self.es.index(index=spider.name, doc_type='_doc', body=body)
        except Exception as e:
            spider.logger.error('写入es出错'+'\r\n'+e.message+'\r\n')
            self.errorFile.flush()
        return item

    def create_index(self, index_name):
        '''
        创建索引，并且指定分词器
        :param name:  索引名
        :return:
        '''
        ret = self.es.indices.create(index=index_name, body={
            "settings": {
                "analysis": {
                    "analyzer": {
                        "en_analyzer": {
                            "type": "custom",
                            "tokenizer": "standard",
                            "stopwords": "_english_",
                            "char_filter": [
                                "html_strip"
                            ],
                            "filter": [
                                "lowercase",
                                "asciifolding"
                            ]
                        }
                    }
                }
            },
            "mappings": {
                "properties": {
                    "m_id": {
                        "type": "keyword"
                    },
                    "create_date": {
                        "type": "date",
                        "format": "YYYY-MM-DD HH:mm:ss"
                    },
                    "url": {
                        "type": "keyword"
                    },
                    "journal_name": {
                        "type": "text"
                    },
                    "journal_url": {
                        "type": "keyword"
                    },
                    "volume": {
                        "type": "keyword"
                    },
                    "pubdate": {
                        "type": "date"
                    },
                    "title": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "authors": {
                        "type": "keyword"
                    },
                    "authors_html": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "orgs": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "orgs_html": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "doi": {
                        "type": "keyword"
                    },
                    "pdf_url": {
                        "type": "keyword"
                    },
                    "html_url": {
                        "type": "keyword"
                    },
                    "xml_url": {
                        "type": "keyword"
                    },
                    "abstract": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "abstract_html": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "kws": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "content": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "content_html": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "refs": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    },
                    "refs_html": {
                        "type": "text",
                        "analyzer": "en_analyzer"
                    }
                }
            }
        })
        print('创建索引', ret)

import re

import requests
from scrapy import Selector
from io import StringIO
from html.parser import HTMLParser


import logging

class Crawler(object):
    name = None

    def __init__(self):
        self.name = __name__
        self.error = open(self.name+'-error.log', 'a', encoding='utf-8')

    def __delete__(self, instance):
        self.error.close()

    def parse_pager(self):
        '''
        解析分页
        :return:
        '''
        pass

    def parse_detail(self):
        '''
        解析明细
        :return:
        '''
        pass



class Article(object):
    def __init__(self):
        # 插入时间
        self.create_date = None
        # 论文网址
        self.url = None
        # 期刊名称
        self.journal_name = None
        # 期刊网址
        self.journal_url = None
        # 卷期
        self.volume = None
        # 出版日期，格式是2000-10
        self.pubdate = None
        # 标题
        self.title = None
        # 作者
        self.authors = None
        self.authors_html = None
        # 作者单位
        self.orgs = None
        self.orgs_html = None
        # DOI
        self.doi = None
        # pdf下载地址
        self.pdf_url = None
        # html下载地址
        self.html_url = None
        # xml下载地址
        self.xml_url = None
        # 摘要
        self.abstract = None
        self.abstract_html = None
        # 关键词
        self.kws = None
        # 正文
        self.content = None
        self.content_html = None
        # 参考文献
        self.refs = None
        self.refs_html = None


class MLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs= True
        self.text = StringIO()
    def handle_data(self, d):
        self.text.write(d)
    def get_data(self):
        return self.text.getvalue()



class Util():

    @staticmethod
    def get(url):
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'}
        resp = requests.get(url, headers=headers)
        return Selector(text=resp.text)

    @staticmethod
    def parse_date1(s):
        '''
        解析 形如 February 2009 的格式
        :param s:
        :return:
        '''
        try:
            s = str(s).lower()
            month = '00'
            if s.find('january') > -1:
                month = '01'
            elif s.find('february') > -1:
                month = '02'
            elif s.find('march') > -1:
                month = '03'
            elif s.find('april') > -1:
                month = '04'
            elif s.find('may') > -1:
                month = '05'
            elif s.find('june') > -1:
                month = '06'
            elif s.find('july') > -1:
                month = '07'
            elif s.find('august') > -1:
                month = '08'
            elif s.find('september') > -1:
                month = '09'
            elif s.find('october') > -1:
                month = '10'
            elif s.find('november') > -1:
                month = '11'
            elif s.find('december') > -1:
                month = '12'

            year = re.sub(r'\D', '', s)

            return str(year)+'-'+str(month)
        except Exception as e:
            return s

    @staticmethod
    def removeWhiteSpce(ss, *args):
        '''
        删除空白及其他符号
        :param ss:
        :param args: 其他符号
        :return:
        '''
        ss = [s.strip() for s in ss if s.strip()]
        if args:
            for sign in args:
                ss = [s.replace(sign, '').strip() for s in ss]
                ss = [s.strip() for s in ss if s.strip()]
        return ss

    @staticmethod
    def strip_tags(html):
        s = MLStripper()
        s.feed(html)
        return s.get_data().replace('\r\n', '').replace('\r','').replace('\n','')
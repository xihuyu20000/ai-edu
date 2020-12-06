import re

from scrapy import Selector
from io import StringIO
from html.parser import HTMLParser

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
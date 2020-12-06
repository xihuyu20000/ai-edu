import scrapy,os
from scrapy import Request

URL_PATH = r'G:\workspace\workspace-js\ai-edu\spider\ScrapySpider\ScrapySpider\hindawi_urls.txt'

class HindawiSpider(scrapy.Spider):
    name = 'hindawi'

    def start_requests(self):
        with open(URL_PATH, encoding='utf-8') as f:
            for url in f.readlines():
                url = url.strip()
                if url:
                    yield Request(url)

    def parse(self, response):
        pass

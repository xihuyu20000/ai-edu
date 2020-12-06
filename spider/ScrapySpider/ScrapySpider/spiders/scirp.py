import logging

import scrapy
from scrapy import Request

from ScrapySpider.utils.scirp import ScirpUtil

class ScirpSpider(scrapy.Spider):
    name = 'scirp'

    def __init__(self):
        super()
        self.parseErrorFile = open('logs/'+self.name+'-parse-error.txt', 'a', encoding='utf-8')


    def start_requests(self):
        for id in range(1, 103): #103170
            yield Request('https://www.scirp.org/journal/paperinformation.aspx?paperid={}'.format(id))

    def parse(self, response):
        try:
            item = ScirpUtil.parse_detail(response.url, response)
            yield item
        except Exception as e:
            self.logger.error('解析出错 %s', response.request.url)
            self.parseErrorFile.write(response.url+'\r\n')
            self.parseErrorFile.write(e.message+'\r\n')
            self.parseErrorFile.flush()
            yield None

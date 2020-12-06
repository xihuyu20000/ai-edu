import scrapy
from scrapy import Request

class OalibSpider(scrapy.Spider):
    name = 'oalib'
    allowed_domains = ['oalib.com']
    start_urls = ['http://oalib.com/']

    def parse(self, response):
        pass

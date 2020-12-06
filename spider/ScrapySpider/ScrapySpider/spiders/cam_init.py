import scrapy
from scrapy import Request

class CamInitSpider(scrapy.Spider):
    name = 'cam-init'
    allowed_domains = ['cam.ac.ck']
    item_count = 261767

    def start_requests(self):
        page_count = CamInitSpider.item_count//4
        for i in range(page_count):
            yield Request('https://www.repository.cam.ac.uk/recent-submissions?offset=' + str(i * 4) )

    def parse(self, response):
        article_urls = response.xpath('//h4[@class="artifact-title"]/a/@href').extract()
        article_urls = ['https://www.repository.cam.ac.uk' + url + '\n' for url in article_urls]
        for url in article_urls:
            yield Request(url=url, callback=self.parse_article)

    def parse_article(self, response):
        # 题名
        title = response.xpath('//h2[@class="page-header first-page-header"]/text()').extract_first()
        title = str(title).strip() if title else ''
        
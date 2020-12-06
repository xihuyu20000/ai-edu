# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ArticleItem(scrapy.Item):
    # 插入时间
    create_date = scrapy.Field()
    # 论文网址
    url = scrapy.Field()
    # 期刊名称
    journal_name = scrapy.Field()
    # 期刊网址
    journal_url  = scrapy.Field()
    # 卷期
    volume  = scrapy.Field()
    #出版日期，格式是2000-01
    pubdate  = scrapy.Field()
    # 标题
    title = scrapy.Field()
    # 作者
    authors = scrapy.Field()
    authors_html = scrapy.Field()
    # 作者单位
    orgs = scrapy.Field()
    orgs_html = scrapy.Field()
    # DOI
    doi = scrapy.Field()
    # pdf下载地址
    pdf_url  = scrapy.Field()
    # html下载地址
    html_url = scrapy.Field()
    # xml下载地址
    xml_url = scrapy.Field()
    # 摘要
    abstract = scrapy.Field()
    abstract_html = scrapy.Field()
    # 关键词
    kws = scrapy.Field()
    # 正文
    content = scrapy.Field()
    content_html = scrapy.Field()
    # 参考文献
    refs = scrapy.Field()
    refs_html = scrapy.Field()
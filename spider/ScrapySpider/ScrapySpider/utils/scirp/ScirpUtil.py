# for i in range(1, 4633):
#     url = 'https://www.scirp.org/journal/articles.aspx?page={}'.format(i)
import datetime
import logging
import time

from ScrapySpider.items import ArticleItem
from ScrapySpider.utils import Util


class SimpleScirp:

    def __init__(self):
        logging.basicConfig(level=logging.DEBUG, format=' %(message)s ')

    def parse_pager(self):
        fwriter = open('scirp_article_urls.txt', 'a', encoding='utf-8')
        for i in range(1, 4633):
            url = 'https://www.scirp.org/journal/articles.aspx?page={}'.format(i)
            try:
                response = Util.get(url)
                urls = response.xpath('//a[contains(@href, "paperinformation.aspx?paperid=")]/@href').getall()
                urls = ['https://www.scirp.org/journal/' + url for url in urls]
                for url in urls:
                    fwriter.write(url)
                    fwriter.write('\n')
            except Exception as e:
                self.error.write(url)
                self.error.write('\n')

def parse_detail(url, response):
    article = ArticleItem()
    # 插入时间
    article['create_date'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    # 论文网址
    article['url'] = url
    # 期刊名称
    journal_name = response.xpath('//div[@id="JournalInfor_div_nav_journal"]/div/a/text()').get('').strip()
    logging.debug('期刊名称 %s', journal_name)
    article['journal_name'] = journal_name

    # 期刊地址
    journal_url = response.xpath('//div[@id="JournalInfor_div_nav_journal"]/div/a/@href').get('').strip()
    journal_url = 'https://www.scirp.org/journal/'+journal_url
    logging.debug('期刊地址 %s', journal_url)
    article['journal_url'] = journal_url

    jd = response.xpath('//div[@id="JournalInfor_div_nav_journal"]/div/a/text()').getall()
    pub = jd[1].strip() # 卷期、日期
    pubdatearr = str(pub).split(',')

    # 卷
    volume = pubdatearr[0].strip()
    logging.debug('出版卷 %s', volume)
    article['volume'] = volume

    # 发布日期
    pubdate = Util.parse_date1(pubdatearr[1].strip())
    logging.debug('出版日期 %s', pubdate)
    article['pubdate'] = pubdate

    ## 标题
    title = response.xpath('//div[@id="JournalInfor_div_paper"]/div[1]/p/strong/text()').get('')
    logging.debug('标题 %s', title)
    article['title'] = title

    ## 作者
    authors =  response.xpath('//div[@id="JournalInfor_div_affs"]/preceding-sibling::div[1]//text()').getall()
    authors = Util.removeWhiteSpce(authors, ',')
    logging.debug('作者  %s', authors)
    article['authors'] = authors

    authors_html = response.xpath('//div[@id="JournalInfor_div_affs"]/preceding-sibling::div[1]').get('')
    # logging.debug('作者html  %s', authors_html)
    article['authors_html'] = authors_html

    ## 作者单位
    orgs = response.xpath('//div[@id="JournalInfor_div_affs"]//text()').getall()
    orgs = Util.removeWhiteSpce(orgs, '.')
    logging.debug('作者单位 %s ', orgs)
    article['orgs'] = orgs

    orgs_html = response.xpath('//div[@id="JournalInfor_div_affs"]').get('')
    # logging.debug('作者单位html %s', orgs_html)
    article['orgs_html'] = orgs_html

    # ### 版本链接
    doi = response.xpath('//span[@id="JournalInfor_showDOI"]/following-sibling::*[1]/text()').get('').strip()
    pdf_url = 'http:'+response.xpath('//a[contains(@href,"//www.scirp.org/pdf/")]/@href').get('').strip()
    html_url = 'http:'+response.xpath('//a[contains(@href, "//www.scirp.org/journal/paperinformation.aspx?paperid=")]/@href').get('').strip()
    xml_url = 'http:' + response.xpath('//a[contains(@href,"//www.scirp.org/xml/")]/@href').get('').strip()
    logging.debug('DOI %s ',doi)
    article['doi'] = doi

    logging.debug('PDF下载链接 %s ', pdf_url)
    article['pdf_url'] = pdf_url

    logging.debug('HTML下载链接 %s ', html_url)
    article['html_url'] = html_url

    logging.debug('XML下载链接 %s ', xml_url)
    article['xml_url'] = xml_url

    ## 摘要
    abstract = response.xpath('//a[@name="abstract"]/parent::*/following-sibling::div//text()').getall()
    abstract = Util.removeWhiteSpce(abstract)
    abstract = ' '.join(abstract).replace('\r\n', '')
    # logging.debug('摘要 %s',abstract)
    article['abstract'] = abstract

    abstract_html = response.xpath('//a[@name="abstract"]/parent::*/following-sibling::div').getall()
    abstract_html = ''.join(abstract_html).replace('\r\n', '')
    # logging.debug('摘要html  %s', abstract_html)
    article['abstract_html'] = abstract_html

    # ## 关键词
    kws = response.xpath('//div[@id="JournalInfor_div_showkeywords"]//text()').getall()
    kws = Util.removeWhiteSpce(kws, ',')[1:]
    logging.debug('关键词 %s ', kws)
    article['kws'] = kws

    ## 正文
    content_html = response.xpath('//div[@id="htmlContent"]/*').getall()
    content_html = ''.join(content_html).replace('\r\n', '')
    # logging.debug('正文html %s ', content_html)
    article['content_html'] = content_html

    content = Util.strip_tags(''.join(content_html))
    # logging.debug('正文 %s ', content)
    article['content'] = content

    ## 参考文献
    refs_raw = response.xpath('//a[@name="reference"]/parent::p/following-sibling::table/tr')
    refs = []
    for ref in refs_raw:
        ref_no = ref.xpath('td[1]/a/text()').get()
        ref_url = 'https://www.scirp.org' + ref.xpath('td[1]/a/@href').get()[2:]
        # logging.debug('序号 %s  %s', ref_no, ref_url)
        ref_name = ref.xpath('td[2]//text()').getall()
        ref_name = Util.removeWhiteSpce(ref_name)
        # logging.debug('参考文献 %s',ref_name)
        ref = {"ref_no":ref_no, "ref_url":ref_url, "ref_name":ref_name}
        refs.append(ref)
    article['refs'] = str(refs)

    refs_html = response.xpath('//a[@name="reference"]/parent::p/following-sibling::table').getall()
    # logging.debug('参考文件html %s ', refs_html)
    article['refs_html'] = refs_html

    return article


if __name__=='__main__':
    url = 'https://www.scirp.org/journal/paperinformation.aspx?paperid=103251'
    print(parse_detail(url, Util.get(url)))


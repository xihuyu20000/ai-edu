# for i in range(1, 4633):
#     url = 'https://www.scirp.org/journal/articles.aspx?page={}'.format(i)

import requests
from lxml import etree

def get(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'}
    resp = requests.get(url, headers=headers)
    return etree.HTML(resp.text)

def parse_table():
    for i in range(1, 4633):
        url = 'https://www.scirp.org/journal/articles.aspx?page={}'.format(i)
        try:
            root = get(url)
            urls = root.xpath('//a[contains(@href, "paperinformation.aspx?paperid=")]/@href')
            urls = ['https://www.scirp.org/journal/'+url for url in urls]

            with open('scirp_article_urls.txt', 'a', encoding='utf-8') as fwriter:
                for url in urls:
                    fwriter.write(url)
                    fwriter.write('\n')
            with open('scirp_parsed_page.txt', 'a', encoding='utf-8') as fwriter:
                fwriter.write(url)
                fwriter.write('\n')
        except Exception as e:
            with open('scirp_error.txt', 'a', encoding='utf-8') as fwriter:
                fwriter.write(url)
                fwriter.write('\n')

# parse_table()

def parse_article(baseURL):
    root = get(baseURL)
    jd = root.xpath('//div[@id="JournalInfor_div_nav_journal"]/div/a/text()')
    journal_name = jd[0].strip()    # 期刊名称
    pubdate = jd[1].strip() # 卷期、日期
    print('出版卷期',pubdate)
    ## 标题
    title = root.xpath('//div[@id="JournalInfor_div_paper"]/div[1]/p/strong/text()')[0]
    print('标题',title)

    ## 作者
    sta = root.xpath('//div[@id="JournalInfor_div_affs"]//text()')
    # sta = [item.strip() for item in sta]
    print('作者和单位',sta)

    ### 版本链接
    doi = root.xpath('//span[@id="JournalInfor_showDOI"]/following-sibling::*[1]/text()')[0].strip()
    pdf_url = 'http:'+root.xpath('//a[contains(@href,"//www.scirp.org/pdf/")]/@href')[0]
    html_url = 'http:'+root.xpath('//a[contains(@href, "//www.scirp.org/journal/paperinformation.aspx?paperid=")]/@href')[0]
    xml_url = 'http:' + root.xpath('//a[contains(@href,"//www.scirp.org/xml/")]/@href')[0]
    print('下载链接',doi, pdf_url, html_url, xml_url)

    ## 摘要
    abstract = root.xpath('//a[@name="abstract"]/parent::p/following-sibling::div//text()')[0]
    print('摘要',abstract)

    ## 关键词
    kws = root.xpath('//div[@id="JournalInfor_div_showkeywords"]//text()')
    kws = [item.strip() for item in kws if item.strip()][1:]
    kws = [item for item in kws if item!=',']
    print('关键词',kws)

    ## 正文
    content = root.xpath('//div[@id="htmlContent"]/*')
    content = [etree.tostring(item, pretty_print=True, with_tail=False) for item in content]
    print('正文',content)

    ## 参考文献
    refs = root.xpath('//a[@name="reference"]/parent::p/following-sibling::table//tr')
    refs = [etree.tostring(item, pretty_print=True, with_tail=False) for item in refs]
    print('参考文献', refs)

url = 'https://www.scirp.org/journal/paperinformation.aspx?paperid=103134'
parse_article(url)
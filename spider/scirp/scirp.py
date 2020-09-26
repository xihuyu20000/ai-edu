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

parse_table()
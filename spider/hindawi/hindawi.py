import requests
from lxml import etree

def get(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'}
    resp = requests.get(url, headers=headers)
    return etree.HTML(resp.text)

def parse_journal_urls():
    '''
    获取所有期刊的网址
    :return: 形如 https://www.hindawi.com/journals/aaa/contents/
    '''
    baseURL = 'https://www.hindawi.com/journals/'
    root = get(baseURL)
    urls = root.xpath("//div[@id='journalSection']//a[@aria-label]/@href")
    urls = [baseURL + url[len('/journals/'):] + 'contents/' for url in urls]
    with open('journal_urls.txt', 'w', encoding='utf-8') as f:
        for url in urls:
            f.write(url)
            f.write('\n')
    return urls
# print(parse_journal_urls())

baseURL = 'https://www.hindawi.com/journals/aaa/contents/'
def parse_max_pages(baseURL):
    '''
    获取每个期刊，内容表格的最大页数
    :param baseURL:  形如 https://www.hindawi.com/journals/aaa/contents/
    :return: 数字
    '''
    root = get(baseURL)
    try:
        url = root.xpath('//a[contains(@class, "pagination__last")]/@href')[0]
        numbers = str(url).split('contents/page')[1]
        max_page_no = numbers.replace('/','')
        return max_page_no
    except Exception as e:
        # 有的期刊内容很少，所以页面没有分页标记
        return 1

def build_page_urls(baseURL):
    '''
    构造所有分页的url
    :param baseURL:  形如 https://www.hindawi.com/journals/aaa/contents/
    :return: 结果类似  https://www.hindawi.com/journals/aaa/contents/page/1/
    '''
    max_page_no = parse_max_pages(baseURL)
    return [baseURL+'page/{}/'.format(i) for i in range(1, int(max_page_no)+1)]

# journal_urls = ['https://www.hindawi.com/journals/ast/contents/','https://www.hindawi.com/journals/cmra/contents/','https://www.hindawi.com/journals/cmrb/contents/','https://www.hindawi.com/journals/gr/contents/','https://www.hindawi.com/journals/gheg/contents/','https://www.hindawi.com/journals/josc/contents/','https://www.hindawi.com/journals/lpb/contents/','https://www.hindawi.com/journals/moi/contents/','https://www.hindawi.com/journals/wpt/contents/',]
# for url in journal_urls:
#     try:
#         page_urls = build_page_urls(url)
#         with open('分页11.txt', 'a', encoding='utf-8') as f:
#             for url in page_urls:
#                 f.write(url)
#                 f.write('\n')
#         print('处理完 ', url)
#     except BaseException as e:
#         print('出错了', url, e)


def parse_content_table(baseURL):
    '''
    解析分页中的文章url
    :param baseURL: 形如 https://www.hindawi.com/journals/aaa/contents/page/1/
    :return: 形如 http://www.hindawi.com/journals/aaa/2020/3793606/
    '''
    root = get(baseURL)
    toc_articles = root.xpath('//div[contains(@class, "toc_article")]')

    article_urls = []
    for article in toc_articles:
        art_urls = article.xpath('./a[@aria-label="Article Title"]/@href')
        if len(art_urls):
            article_url = 'http://www.hindawi.com' + art_urls[0]
            article_urls.append(article_url)
    return article_urls
parse_content_table('https://www.hindawi.com/journals/ace/contents/page/40/')
# with open('list_pages.txt', encoding='utf-8') as freader:
#     for line in freader.readlines():
#         url = line.strip()
#         try:
#             article_urls = parse_content_table(url)
#             with open('article_urls.txt', 'a', encoding='utf-8') as fwriter:
#                 for article_url in article_urls:
#                     fwriter.write(article_url)
#                     fwriter.write('\n')
#         except Exception as e:
#             print('出错了', url)
#             with open('error.txt', 'a', encoding='utf-8') as fwriter:
#                 fwriter.write(url)
#                 fwriter.write('\n')


def parse_article(baseURL):
    root = get(baseURL)
    pdf_url = root.xpath('//a[contains(@class, "pdf_desktop")]/@href')[0]
    ref_url = 'http://www.hindawi.com'+root.xpath('//a[contains(@class, "ref_desktop")]/@href')[0]
    epub_url = root.xpath('//a[@aria-label="ePub"]/@href')[0]
    xml_url = root.xpath('//a[@aria-label="XML"]/@href')[0]
    print(pdf_url)
    print(ref_url)
    print(epub_url)
    print(xml_url)
# parse_article('http://www.hindawi.com/journals/aaa/2020/1896563/')
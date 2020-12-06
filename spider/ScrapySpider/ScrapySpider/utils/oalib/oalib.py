from ScrapySpider import utils
from scrapy.selector import Selector


def get(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'}
    resp = utils.get(url, headers=headers)
    return Selector(text=resp.text)

def journallist():
    responce = get('https://www.oalib.com/lib/showJournalList')
    lis = responce.xpath('//div[@class="paperlist"]//li/h4/a')

    fwriter = open('journallist2.txt', 'a', encoding='utf-8')
    for a in lis:
        journal_name = a.xpath('text()').get().strip()
        journal_url = a.xpath('@href').get()
        if journal_url.strip():
            fwriter.write(journal_name.strip()+'======'+journal_url.strip())
            fwriter.write('\n')
    fwriter.close()
# journallist()

def journalinfo(url):
    response = get(url)
    journalname = response.xpath('//div[@class="journalname"]/h2/text()').get()
    mainissue = response.xpath('//div[@class="mainissue"]/div/p').getall()
    # print(journalname, mainissue)
    page = response.xpath('//script/text()').re_first(r"new Pager\((.*)\)")
    page = page.split(',')
    # totalpage = re.findall(r',(\d*),', page.strip())
    total = int(page[2])

    ret = []
    for i in range(1, total+1):
        url = 'http:{}{}'.format(page[5].replace("'",''), i)
        ret.append(url)
    return  journalname, mainissue, ret

def journal_page():
    with open('journallist.txt', encoding='utf-8') as freader:

        infowriter = open('journalinfo.txt', 'a', encoding='utf-8')
        pagerwriter = open('article_pages.txt', 'a', encoding='utf-8')
        error = open('pager_error.txt', 'a', encoding='utf-8')

        for line in freader.readlines():
            url = line.split('======')[1].strip()
            try:
                journalname, mainissue, ret = journalinfo(url)
                infowriter.write(journalname + "======" + str(mainissue)+'\n')
                infowriter.flush()
                for u in ret:
                    pagerwriter.write(u+'\n')
                    pagerwriter.flush()
            except Exception as e:
                error.write('解析出错   '+url)
                error.write('\n')
        infowriter.close()
        pagerwriter.close()
# journal_page()

def build_article_urls():
    ffile = open('article_urls.txt', 'a', encoding='utf-8')
    error = open('error.txt', 'a', encoding='utf-8')
    with open('article_pages.txt', encoding='utf-8') as f:
        for line in f.readlines():
            line = line.strip()
            try:
                response = get(line.strip())
                href = response.xpath('//div[@class="paperlist"]/h4/a/@href').getall()
                for url in href:
                    url = 'http:'+url
                    ffile.write(url)
                    ffile.write('\n')
                    ffile.flush()
            except Exception as e:
                error.write(line)
                error.write('\n')
    ffile.close()
    error.close()

build_article_urls()
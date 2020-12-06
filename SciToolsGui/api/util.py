'''
api/util负责管理所有的工具类代码
'''
from typing import List, Set
import uuid
import os
import shutil
import jieba
import nltk


# 判断是否是纯中文
def is_all_chinese(strs):
    for i in strs:
        if not '\u4e00' <= i <= '\u9fa5':
            return False
    return True


# 判断是否是纯英文
def is_all_eng(strs):
    import string
    for i in strs:
        if i not in string.ascii_lowercase + string.ascii_uppercase:
            return False
    return True


# 判断字符串是英文还是中文
def strings_is_eng(strings):
    words = [word for word in strings if word!='[' and word!=']' and word!='.' and word!=',' and word!='(' and word!=')' and word.strip()]
    words_cn = len([word for word in words if is_all_chinese(word)])
    words_en = len([word for word in words if is_all_eng(word)])
    return True if words_cn<words_en else False


def gen_uuid1() -> str:
    '''
    生成uuid
    :return: uuid，共32位
    '''
    uid = str(uuid.uuid1())
    suid = ''.join(uid.split('-'))
    return suid


def gen_uuid4() -> str:
    '''
    生成uuid
    :return: uuid，共32位
    '''
    uid = str(uuid.uuid4())
    suid = ''.join(uid.split('-'))
    return suid


def move_file(srcFile, dstDir) -> str:
    """
    复制文件到目的地，删除源文件
    :param srcFile:
    :param dstDir:
    :return: 新文件路径
    """
    assert os.path.exists(srcFile), '输入文件{}必须存在'.format(srcFile)
    assert os.path.exists(dstDir), '目的地文件夹{}必须存在'.format(dstDir)
    fileName = os.path.split(srcFile)[1]
    dstFile = os.path.join(dstDir, fileName)
    # 复制文件
    shutil.copy(srcFile, dstFile)
    # 删除源文件
    os.remove(srcFile)

    return dstFile


def stopwords(splitwords_userdict_path: str = None):
    if not os.path.exists(splitwords_userdict_path):
        return set()
    reader = open(splitwords_userdict_path, encoding='utf8')
    lines = reader.readlines()
    reader.close()
    lines = [w.lower().strip() for w in lines]
    # todo 这里还不对那
    # nltk.download('stopwords')
    # nltk_stop_words = set(nltk.corpus.stopwords.words('english'))
    # return set(lines) | nltk_stop_words
    return set(lines)


class CutWords:
    def __init__(self, splitwords_userdict_path: str = ''):
        if os.path.exists(splitwords_userdict_path):
            jieba.load_userdict(splitwords_userdict_path)
        nltk.download('punkt')
        nltk.download('wordnet')

    def cut_words(self, line: str, stopwords: Set[str]) -> List[str]:
        """
        切词，可以使用停用词
        """
        assert stopwords != None, '必须使用停用词'
        if strutils.strings_is_eng(line):
            words = nltk.word_tokenize(line)
        else:
            words = [w for w in jieba.cut(line)]
        # 过滤停用词
        words = [w for w in words if str(w).lower() not in stopwords]
        # 英文词干化、词性还原
        if strutils.strings_is_eng(line):
            lemma_word = []
            wordnet_lemmatizer = nltk.stem.wordnet.WordNetLemmatizer()
            for w in words:
                word1 = wordnet_lemmatizer.lemmatize(w, pos="n")
                word2 = wordnet_lemmatizer.lemmatize(word1, pos="v")
                word3 = wordnet_lemmatizer.lemmatize(word2, pos=("a"))
                # pos参数 是词性
                lemma_word.append(word3)
            # todo 英文切词后，还会有一个单引号在里面，这是不正确的
            words = [w for w in lemma_word if str(w).find("'") == -1]

        return words

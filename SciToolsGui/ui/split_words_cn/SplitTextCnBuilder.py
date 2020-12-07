import os

import jieba
from PyQt5.QtWidgets import QMainWindow, QFileDialog, QMessageBox

from ui.split_words_cn.SplitTextCn import Ui_SplitTextCn


class SplitTextCnBuilder(QMainWindow, Ui_SplitTextCn):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setupUi(self)

        self.pushButton_chooseOriginalFiles.clicked.connect(self.chooseOriginalFiles)
        self.pushButton_chooseResultFile.clicked.connect(self.chooseResultFiles)
        self.pushButton_chooseStopDict.clicked.connect(self.chooseStopDict)
        self.pushButton_chooseSelfDict.clicked.connect(self.chooseSelfDict)
        self.pushButton_run.clicked.connect(self.run)

        self.label_status.setStyleSheet('background-color: white; border: 1px inset grey; ')



    def chooseOriginalFiles(self):
        files, ok1 = QFileDialog.getOpenFileNames(self, "多文件选择", "./", "All Files (*);;Text Files (*.*)")
        self.lineEdit_OriginalFiles.setText(' , '.join(files))

    def chooseResultFiles(self):
        files, ok1 = QFileDialog.getOpenFileName(self, "多文件选择", "./", "All Files (*);;Text Files (*.txt)")
        self.lineEdit_ResultFile.setText(files)

    def chooseStopDict(self):
        files, ok1 = QFileDialog.getOpenFileName(self, "多文件选择", "./", "All Files (*);;Text Files (*.txt)")
        self.lineEdit_StopDict.setText(files)

    def chooseSelfDict(self):
        files, ok1 = QFileDialog.getOpenFileName(self, "多文件选择", "./", "All Files (*);;Text Files (*.txt)")
        self.lineEdit_SelfDict.setText(files)

    def run(self):
        if not self.lineEdit_OriginalFiles.text().strip():
            QMessageBox.critical(self, '操作提示', '请点击"选择分词软件"', QMessageBox.Yes, QMessageBox.Yes)
            return;

        jiebaSplit = JiebaSplit(self.lineEdit_StopDict.text(), self.lineEdit_SelfDict.text(), self.get_mode())
        files = [x.strip() for x in self.lineEdit_OriginalFiles.text().split(',') if x.strip()]
        for file in files:
            with open(file, encoding='utf8') as reader:
                lines = [x.strip() for x in reader.readlines() if x.strip()]
                lines = [jiebaSplit.split(x)+'\r' for x in lines]
                with open(self.lineEdit_ResultFile.text(), 'w', encoding='utf8') as writer:
                    writer.writelines(lines)
        self.label_status.setText('分词结束')

    def get_mode(self):
        if self.radioButton_full.isChecked():
            return 'full'
        elif self.radioButton_precise.isChecked():
            return 'precise'
        elif self.radioButton_searchengine.isChecked():
            return 'searchengine'
        else:
            return ''


class JiebaSplit:
    def __init__(self, stopdict, selfdict, mode):
        self.stop_words = []
        if os.path.exists(stopdict):
            with open(stopdict, encoding='utf8') as reader:
                for line in reader.readlines():
                    self.stop_words.append(line.strip())

        if os.path.exists(selfdict):
            jieba.load_userdict(selfdict)
        self.mode = mode

    def split(self, text):
        seg_list = []
        if self.mode == 'full':  # 全模式
            seg_list = jieba.cut(text, cut_all=True)

        if self.mode == 'precise':  # 精确模式
            seg_list = jieba.cut(text, cut_all=False)

        if self.mode == 'enginesearch':  # 搜索引擎模式
            seg_list = jieba.cut_for_search(text)

        seg_list = [x for x in seg_list if x not in self.stop_words and x.strip()]
        return ','.join(seg_list)
from PyQt5.QtWidgets import QMainWindow

from ui.main.MainWindow import Ui_MainWindow
from ui.split_words_cn.SplitTextCnBuilder import SplitTextCnBuilder


class MainWindowBuilder(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setupUi(self)

        intro = '''
2020—12-07
增加分词功能，可以使用停用词、自定义词典，可以指定分词模式        
        
        '''
        self.textBrowser.setText(intro)

        self.splitTextCnBuilder = SplitTextCnBuilder()
        self.actionSplitTextChinese.triggered.connect(self.openSplitTextChineseDialog)


    def openSplitTextChineseDialog(self):
        self.splitTextCnBuilder.show()

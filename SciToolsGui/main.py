import sys
from PyQt5.QtWidgets import QApplication

from ui.cleaning.CleaningDialogBuilder import CleaningDialogBuilder
from ui.main.MainWindowBuilder import MainWindowBuilder
from ui.split_words_cn.SplitTextCnBuilder import SplitTextCnBuilder

'''
使用 PyQt5 创建客户端程序
'''


if __name__ == '__main__':
    app = QApplication(sys.argv)

    window = MainWindowBuilder()
    window.show()

    sys.exit(app.exec_())
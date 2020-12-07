# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'SplitTextCn.ui'
#
# Created by: PyQt5 UI code generator 5.15.1
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_SplitTextCn(object):
    def setupUi(self, SplitTextCn):
        SplitTextCn.setObjectName("SplitTextCn")
        SplitTextCn.resize(800, 600)
        SplitTextCn.setStyleSheet("")
        self.centralwidget = QtWidgets.QWidget(SplitTextCn)
        self.centralwidget.setObjectName("centralwidget")
        self.pushButton_chooseOriginalFiles = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_chooseOriginalFiles.setGeometry(QtCore.QRect(100, 50, 121, 41))
        self.pushButton_chooseOriginalFiles.setObjectName("pushButton_chooseOriginalFiles")
        self.pushButton_chooseResultFile = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_chooseResultFile.setGeometry(QtCore.QRect(100, 120, 121, 41))
        self.pushButton_chooseResultFile.setObjectName("pushButton_chooseResultFile")
        self.pushButton_chooseStopDict = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_chooseStopDict.setGeometry(QtCore.QRect(100, 190, 121, 41))
        self.pushButton_chooseStopDict.setObjectName("pushButton_chooseStopDict")
        self.pushButton_chooseSelfDict = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_chooseSelfDict.setGeometry(QtCore.QRect(100, 260, 121, 41))
        self.pushButton_chooseSelfDict.setObjectName("pushButton_chooseSelfDict")
        self.pushButton_run = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_run.setGeometry(QtCore.QRect(330, 410, 121, 41))
        font = QtGui.QFont()
        font.setPointSize(12)
        font.setBold(True)
        font.setWeight(75)
        self.pushButton_run.setFont(font)
        self.pushButton_run.setStyleSheet("background-color: rgb(0, 155, 255);")
        self.pushButton_run.setObjectName("pushButton_run")
        self.lineEdit_OriginalFiles = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit_OriginalFiles.setGeometry(QtCore.QRect(240, 50, 491, 41))
        self.lineEdit_OriginalFiles.setObjectName("lineEdit_OriginalFiles")
        self.lineEdit_ResultFile = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit_ResultFile.setGeometry(QtCore.QRect(240, 120, 491, 41))
        self.lineEdit_ResultFile.setObjectName("lineEdit_ResultFile")
        self.lineEdit_StopDict = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit_StopDict.setGeometry(QtCore.QRect(240, 190, 491, 41))
        self.lineEdit_StopDict.setObjectName("lineEdit_StopDict")
        self.lineEdit_SelfDict = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit_SelfDict.setGeometry(QtCore.QRect(240, 260, 491, 41))
        self.lineEdit_SelfDict.setObjectName("lineEdit_SelfDict")
        self.radioButton_full = QtWidgets.QRadioButton(self.centralwidget)
        self.radioButton_full.setGeometry(QtCore.QRect(240, 340, 121, 41))
        self.radioButton_full.setObjectName("radioButton_full")
        self.radioButton_precise = QtWidgets.QRadioButton(self.centralwidget)
        self.radioButton_precise.setGeometry(QtCore.QRect(430, 340, 121, 41))
        self.radioButton_precise.setChecked(True)
        self.radioButton_precise.setObjectName("radioButton_precise")
        self.radioButton_searchengine = QtWidgets.QRadioButton(self.centralwidget)
        self.radioButton_searchengine.setGeometry(QtCore.QRect(600, 340, 121, 41))
        self.radioButton_searchengine.setObjectName("radioButton_searchengine")
        self.label_status = QtWidgets.QLabel(self.centralwidget)
        self.label_status.setGeometry(QtCore.QRect(110, 500, 631, 51))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.label_status.setFont(font)
        self.label_status.setText("")
        self.label_status.setObjectName("label_status")
        SplitTextCn.setCentralWidget(self.centralwidget)

        self.retranslateUi(SplitTextCn)
        QtCore.QMetaObject.connectSlotsByName(SplitTextCn)

    def retranslateUi(self, SplitTextCn):
        _translate = QtCore.QCoreApplication.translate
        SplitTextCn.setWindowTitle(_translate("SplitTextCn", "中文分词"))
        self.pushButton_chooseOriginalFiles.setText(_translate("SplitTextCn", "选择分词文件"))
        self.pushButton_chooseResultFile.setText(_translate("SplitTextCn", "选择结果文件"))
        self.pushButton_chooseStopDict.setText(_translate("SplitTextCn", "选择停用词词典"))
        self.pushButton_chooseSelfDict.setText(_translate("SplitTextCn", "选择自定义词典"))
        self.pushButton_run.setText(_translate("SplitTextCn", "开始分词"))
        self.radioButton_full.setText(_translate("SplitTextCn", "全模式"))
        self.radioButton_precise.setText(_translate("SplitTextCn", "精确模式"))
        self.radioButton_searchengine.setText(_translate("SplitTextCn", "搜索引擎模式"))

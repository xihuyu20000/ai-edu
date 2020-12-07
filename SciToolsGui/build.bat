@echo off
rem 先pip install  pyinstaller 安装；
rem 然后执行where  pyinstaller.exe 查询刚刚安装的；
rem 最后使用指定的pyinstaller版本

rem 遇到 module 'enum' has no attribute 'IntFlag'错误，则执行 pip uninstall enum34

rd /s/q build
rd /s/q dist
E:\workspace\workspace-js\ai-edu\SciToolsGui\venv\Scripts\pyinstaller.exe  -i icon.ico -F -w main.py  --hidden-import PyQt5.QtWebKit
cd dist

set name = "SciTools-%date:~0,4%%date:~5,2%%date:~8,2%.exe"
echo %name%
rename main.exe  %name%
cd ..
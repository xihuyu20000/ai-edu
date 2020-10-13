rmdir /s/q build
rmdir /s/q dist
del easyexam.spec

G:\workspace\workspace-js\ai-edu\easyexam\env\Scripts\python.exe -m eel  index.py  web  -i icon.ico  -n easyexam -D --clean  --onefile  --hidden-import eel

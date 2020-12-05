import json

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get('/api/topics')
def topics():
    print('终于调用成功了')
    data = [
        {
            "title": "把生态文明建设纳入中国特色社会主义事业总体布局的是________",
            "style": "单选题",
            "options": ["党的十八大", "党的十八届三中全会", "党的十九大"]
        },
        {
            "title": "2016 年 7 月 1 日，在庆祝中国共产党成立 95 周年大会上的讲话，习近平总书记指出，________是党执政兴国的第一要务，是解决中国所有问题的关键。",
            "style": "单选题",
            "options": ["改革", "发展", "稳定"]
        },
        {
            "title": "________是深化行政体制改制改革的核心，实质上要解决的是政府应该做什么、不应该做什么，重点是政府、市场、社会的关系。",
            "style": "单选题",
            "options": ["精简机构","转变政府职能","提高行政效率"]
        },

    ]

    return {'data':json.dumps(data, ensure_ascii=False)}


if __name__ == '__main__':
    uvicorn.run(app='main:app', host="127.0.0.1", port=8084, reload=True, debug=True)
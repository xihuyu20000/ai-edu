const { get, post, render } = require("./downloader");
const cheerio = require("cheerio");
const log = console.log;

// 使用get方法
const doGet = () =>
  get("http://www.ruankao.org.cn/index/work").then(($) => {
    $("ul li").each((i, v) =>
      log(i, $(v).find("label").text(), $(v).find("a").text())
    );
  });
//https://doaj.org/news
function doGet1() {
  get("https://doaj.org/news").then(($) => {
    $(".content h2:contains('News')")
      .nextAll()
      .each((i, a) =>
        log(
          i,
          "\r\n",
          "发布日期",
          $(a).find("em").html(),
          "\r\n",
          "标题",
          $(a).find("a").text(),
          "\r\n",
          "链接地址",
          $(a).find("a").attr("href")
        )
      );
  });
}
doGet1();

const doPost = () => {
  for (let i = 1; i < 7; i++) {
    post("http://www.ruankao.org.cn/index/work", {
      method: "post",
      formData: { page: i, page_size: 10 },
    }).then(($) => {
      $("ul li").each((i, v) =>
        log(i, $(v).find("label").text(), $(v).find("a").text())
      );
    });
  }
};
// doPost();

const doRender = () =>
  render("https://3g.163.com/touch/news/").then(($) => {
    $(".title").each((i, v) => log(i, $(v).text()));
  });
// doRender();

// 研究一下 https://github.com/bda-research/node-crawler

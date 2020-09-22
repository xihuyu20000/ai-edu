const log = console.log;
const Crawler = require("crawler");
const fs = require("fs");
const request = require("request");

function _download(method, url, spath = undefined) {
  const requestAPI = request(
    {
      method: method,
      url: url,
    },
    (error, res, body) => {
      log("error,", error);
      log("url", res.request);
      log("statusCode", res && res.statusCode);
      log("contentType", res.headers["content-type"]);
    }
  );
  if (spath) requestAPI.pipe(fs.createWriteStream(spath));
}

function html() {
  const c = new Crawler({
    callback: (error, res, done) => {
      log(res.$(".hl__news-grid__container"));
      done();
    },
  });
  c.queue("https://library.harvard.edu/about/news");
}

html();

// module.exports = { html };

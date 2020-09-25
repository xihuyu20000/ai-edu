const cheerio = require("cheerio");
const request = require("request");
const puppeteer = require("puppeteer");
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
};
const get = function (url) {
  let options = { url, headers, method: "get" };

  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      var $ = cheerio.load(body);
      resolve($);
    });
  });
};
const post = function (url, { formData } = {}) {
  let options = { url, headers, method: "post" };

  if (formData) Object.assign(options, { formData });
  return new Promise((resolve, reject) => {
    request.post(options, function (err, res, body) {
      var $ = cheerio.load(body);
      resolve($);
    });
  });
};
const render = function (url) {
  return new Promise((resolve, reject) => {
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url);
      var $ = cheerio.load(await page.content());
      resolve($);
      await browser.close();
    })();
  });
};
module.exports = { get, post, render };

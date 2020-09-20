const { query, exec, create, find, findOne } = require("../db/mysql");

function ok(res, obj) {
  const result = { status: 200, msg: "", data: [] };
  Object.assign(result, obj);
  res.json(result);
}
function fail(res, obj) {
  const result = { status: 400, msg: "", data: [] };
  Object.assign(result, obj);
  res.json(result);
}

/**
 * 生成资源树
 * @param {Array} 资源数组
 */
function resTree(resArr) {
  const menu1 = resArr.filter((item) => item.pid == null);
  menu1.sort((a, b) => a.showOrder - b.showOrder);
  for (const mi1 of menu1) {
    const menu2 = resArr.filter((item) => mi1._id.equals(item.pid));
    menu2.sort((a, b) => a.showOrder - b.showOrder);
    mi1.children = menu2;
    for (const mi2 of menu2) {
      const menu3 = resArr.filter((item) => mi2._id.equals(item.pid));
      menu3.sort((a, b) => a.showOrder - b.showOrder);
      mi2.children = menu3;
      for (const mi3 of menu3) {
        const menu4 = resArr.filter((item) => mi3._id.equals(item.pid));
        menu4.sort((a, b) => a.showOrder - b.showOrder);
        mi3.children = menu4;
      }
    }
  }
  return menu1;
}

module.exports = { query, exec, create, find, findOne, ok, fail, resTree };

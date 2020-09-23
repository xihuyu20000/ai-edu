const {
  query,
  exec,
  create,
  update,
  replace,
  remove,
  find,
  findOne,
} = require("../db/mysql");

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
 * @param {Number} 顶级节点的id号；主要用于页面构建虚拟选项
 */
function tree(resArr, top = 0) {
  //取顶级菜单
  const menu1 = resArr.filter((item) => item.pid == top);
  menu1.sort((a, b) => a.showOrder - b.showOrder);
  for (const mi1 of menu1) {
    const menu2 = resArr.filter((item) => mi1.id == item.pid);
    menu2.sort((a, b) => a.showOrder - b.showOrder);
    mi1.children = menu2;
    for (const mi2 of menu2) {
      const menu3 = resArr.filter((item) => mi2.id == item.pid);
      menu3.sort((a, b) => a.showOrder - b.showOrder);
      mi2.children = menu3;
      for (const mi3 of menu3) {
        const menu4 = resArr.filter((item) => mi3.id == item.pid);
        menu4.sort((a, b) => a.showOrder - b.showOrder);
        mi3.children = menu4;
      }
    }
  }

  // 如果children为空，则删除该属性
  menu1.forEach((mi1) => {
    if (mi1.hasOwnProperty("children")) {
      if (mi1.children.length == 0) delete mi1.children;
      else
        mi1.children.forEach((mi2) => {
          if (mi2.hasOwnProperty("children")) {
            if (mi2.children.length == 0) delete mi2.children;
            else
              mi2.children.forEach((mi3) => {
                if (mi3.hasOwnProperty("children")) {
                  if (mi3.children.length == 0) delete mi3.children;
                  else
                    mi3.children.forEach((mi4) => {
                      if (mi4.hasOwnProperty("children")) {
                        if (mi4.children.length == 0) delete mi4.children;
                      }
                    });
                }
              });
          }
        });
    }
  });

  return menu1;
}

module.exports = {
  query,
  exec,
  create,
  update,
  replace,
  remove,
  find,
  findOne,
  ok,
  fail,
  tree,
};

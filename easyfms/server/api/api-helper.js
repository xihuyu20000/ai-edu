const vars = {
  // token密钥
  TOKEN_KEY: "2f.-Alkl3w20LKLS)A09S()(*",
  // 表名称
  T_AUTH: "sys_role_user",
  T_DICT: "sys_dict",
  T_MATERIAL: "sys_material",
  T_MATERIAL_CATEGORY: "sys_material_category",
  T_META_FORM: "sys_meta_form",
  T_META_FORM_FIELD: "sys_meta_form_field",
  T_ORG: "sys_org",
  T_RES: "sys_res",
  T_RULE: "sys_rule",
  T_TEMPLATE: "sys_template",
  T_USER: "sys_user",
};

function ok(res, obj) {
  res.json(Object.assign({ status: 200, msg: "", data: [] }, obj));
}
function fail(res, obj) {
  res.json(Object.assign({ status: 400, msg: "", data: [] }, obj));
}

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

/**
 * 对元数据配置信息后期格式化处理
 * @param {*} metaTable
 */
async function meta(metaTable) {
  // 对配置数据进行后期处理
  for (let formField of metaTable["formFields"]) {
    if (formField.hasOwnProperty("options")) {
      //选择树
      if (formField.style == "selecttree") {
        if (formField.options.style == "sql") {
          formField.options.values = await query(formField.options.sql);
          formField.options.values = tree(formField.options.values, -1);
        }
      }
      //
      // if (formField.options.style == "sql") {
      //   formField.options.values = await query(formField.options.sql);

      //   if (formField.style == "selecttree") {
      //     formField.options.values = tree(formField.options.values, -1);
      //   }
      // }
      // if (formField.options.style == "value") {
      //   if (typeof formField.options.values[0] != "object") {
      //     formField.options.values = formField.options.values.map((item) => {
      //       let obj = {};
      //       obj.id = item;
      //       obj.label = item;
      //       return obj;
      //     });
      //   }
      // }
    }
  }
  return metaTable;
}

module.exports = Object.assign(
  { vars, ok, fail, tree, meta },
  require("../db/mysql")
);

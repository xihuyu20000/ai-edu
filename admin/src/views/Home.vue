<template>
  <el-container style="height: 100vh;">
    <el-header style="text-align: right; font-size: 12px">
      <div class="left-header">
        xxx管理系统
      </div>
      <div class="right-header">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-image
              style="width: 15px; height: 15px;"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="center"
            ></el-image>
            王小虎<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="chpwd">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="showprofile"
              >个人主页</el-dropdown-item
            >
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1']">
          <el-submenu
            :index="menu1._id"
            v-for="menu1 of menuTree"
            :key="menu1._id"
          >
            <template slot="title"
              ><i :class="menu1.icon"></i>{{ menu1.label }}</template
            >
            <el-submenu
              :index="menu2._id"
              v-for="menu2 of menu1.children"
              :key="menu2._id"
            >
              <template slot="title">{{ menu2.label }}</template>
              <el-menu-item
                :index="menu3.path"
                v-for="menu3 of menu2.children"
                :key="menu3._id"
                >{{ menu3.label }}</el-menu-item
              >
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuTree: []
    };
  },
  methods: {
    async fetch() {
      const { data: resp } = await this.$http.get("/navs");
      this.menuTree = resp.data;
      console.log("导航菜单", this.menuTree);
    },
    chpwd() {
      this.$message.success("修改密码");
    },
    showprofile() {
      this.$message.success("显示个人用户");
    },
    logout() {
      this.$message.success("成功退出");
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;

  .left-header {
    font-size: 24px;
  }
}

.el-aside {
  color: #333;
}
</style>

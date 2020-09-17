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
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-setting"></i>基础配置</template
            >
            <el-submenu index="1-4">
              <template slot="title">用户管理</template>
              <el-menu-item index="/sys/user/list">用户列表</el-menu-item>
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
    return {};
  },
  methods: {
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

<template>
  <a-layout>
    <a-layout-header class="header"
      ><div class="header-left">
        <img :src="logo" class="logo" /><span class="title"
          >国内首屈一指的自动开发平台</span
        >
      </div>
      <div class="header-nav">
        <a-menu
          theme="dark"
          mode="horizontal"
          :default-selected-keys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            业务管理
          </a-menu-item>
          <a-menu-item key="2">
            系统配置
          </a-menu-item>
          <a-menu-item key="3">
            应用开发
          </a-menu-item>
        </a-menu>
      </div>
      <div class="header-right">
        <a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <a-dropdown>
          <a class="ant-dropdown-link">
            欢迎您，吴超先生
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="1">
              个人中心
            </a-menu-item>
            <a-menu-item key="2">
              账户设置
            </a-menu-item>
            <a-menu-item key="3">
              系统设置
            </a-menu-item>
            <a-menu-item key="4">
              修改密码
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-button type="primary" icon="play-circle" style="margin-left:20px">
          退出登录
        </a-button>
      </div></a-layout-header
    >
    <a-layout>
      <a-layout-sider>
        <a-menu theme="light" :default-selected-keys="['1']" mode="inline">
          <a-menu-item key="0">
            <a-icon type="home" />
            <span>首页</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop" />
            <span>Option 2</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" /><span>User</span></span>
            <a-menu-item key="3">
              Tom
            </a-menu-item>
            <a-menu-item key="4">
              Bill
            </a-menu-item>
            <a-menu-item key="5">
              Alex
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="team" /><span>Team</span></span>
            <a-menu-item key="6">
              Team 1
            </a-menu-item>
            <a-menu-item key="8">
              Team 2
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="9">
            <a-icon type="file" />
            <span>File</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        <div>
          <a-tabs
            default-active-key="1"
            type="editable-card"
            @change="callback"
          >
            <a-tab-pane key="1" tab="首页" :closable="false"> </a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" :closable="true">
              Content of Tab Pane 2
            </a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3" :closable="true">
              Content of Tab Pane 3
            </a-tab-pane>
          </a-tabs>
        </div>
        <router-view
      /></a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      logo: require('../assets/logo.jpg'),
      collapsed: false,
      navMenu: []
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  color: #2196f3;
  .header-left {
    margin-right: 20px;
    .logo {
      width: 60px;
      margin-right: 20px;
    }
    .title {
      font-size: 1.8em;
      text-align: center;
    }
  }
  .header-nav {
  }
  .header-right {
  }
}
</style>

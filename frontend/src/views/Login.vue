<template>
  <div class="login-box">
    <a-form-model
      :model="loginForm"
      ref="loginForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <h1 style="width:100%;text-align:center">edu AI管理系统</h1>
      <a-form-model-item ref="username" prop="username">
        <a-input
          v-model="loginForm.username"
          placeholder="用户名"
          @blur="
            () => {
              $refs.username.onFieldBlur()
            }
          "
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="password" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit" style="width:100%">
          登录
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <div class="social-icons">
      <ul>
        <li>
          <a href="#"><a-icon type="wechat"/></a>
        </li>
        <li>
          <a href="#"><a-icon type="weibo-circle"/></a>
        </li>
        <li>
          <a href="#"><a-icon type="github"/></a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return false
        const { data: resp } = await this.$http.post('/login', this.loginForm)
        console.log('登录结果', resp)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-box {
  border: 2px solid #fff;
  border-radius: 20px;
  padding: 10px;
  background-color: #fff;
  width: 400px;
  height: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.social-icons {
  margin: 30px;
  text-align: center;
  font-family: 'Open Sans';
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
}

.social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}

.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}
.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
}
</style>

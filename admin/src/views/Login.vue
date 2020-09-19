<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="0px"
      class="login-form"
    >
      <el-form-item prop="username">
        <el-input
          prefix-icon="iconfont aliuser"
          v-model="loginForm.username"
          placeholder="用户名"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="iconfont alilock"
          type="password"
          v-model="loginForm.password"
          placeholder="密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return false;
        const { data: resp } = await this.$http.post("/login", this.loginForm);
        if (resp.status == 400) return this.$message.error(resp.msg);
        window.sessionStorage.setItem("token", resp.token);
        this.$router.push("/");
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background-color: bisque;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

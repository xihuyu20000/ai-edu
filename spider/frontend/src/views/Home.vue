<template>
  <div class="home">
    <el-form :model="queryForm" ref="queryForm" :rules="rules">
      <el-row :gutter="4">
        <el-col :span="10" :offset="6"
          ><el-form-item prop="kw"><el-input v-model="queryForm.kw" prop="kw" clearable></el-input></el-form-item
        ></el-col>
        <el-col :span="2"
          ><el-checkbox v-model="queryForm.in_title" :span="2" :checked="true">篇名</el-checkbox>
          <el-checkbox v-model="queryForm.in_abs" :span="2">摘要</el-checkbox>
          <el-checkbox v-model="queryForm.in_kws" :span="2">关键字</el-checkbox>
        </el-col>
        <el-col :span="4"><el-button type="primary" style="submit" @click="search">搜索</el-button></el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :border="true" highlight-current-row>
      <el-table-column type="index" width="50"/>

      <el-table-column prop="title" label="篇名" min-width="200px">
        <template slot-scope="scope">
          <router-link :to="'/article/' + scope.row.m_id" target="_blank">{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="authors" label="作者" min-width="200px">
        <template slot-scope="scope"> <span v-html="scope.row.authors"></span> </template
      ></el-table-column>
      <el-table-column prop="journal_name" label="来源" min-width="100px"> </el-table-column>
      <el-table-column prop="pub_year" label="发表时间" min-width="100px"> </el-table-column
    ></el-table>
    <div style="height:20px"></div>
    <el-pagination :total="100"></el-pagination>
    <div style="height:40px;"></div>
    <div class="footer">联系QQ：377486624</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function() {
    return {
      queryForm: { kw: 'model', in_title: 1, in_abs: '', in_kws: '' },
      rules: {
        kw: [{ required: true, message: '请输入查询词', trigger: 'blur' }]
      },
      tableData: []
    }
  },
  methods: {
    search() {
      if (!(this.queryForm.in_title || this.queryForm.in_abs || this.queryForm.in_kws))
        return this.$notify.error({
          position: 'bottom-right',
          title: '错误',
          message: '请选择一个选项'
        })
      this.$refs['queryForm'].validate(async valid => {
        if (!valid) return this.$message.error('请输入查询词')
        const { data: resp } = await this.$http.get('/?' + this.$serUrl(this.queryForm))
        this.queryForm.kw = resp.kw
        this.tableData = resp.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
}
.el-form {
  margin: 40px;
}
.el-table {
  margin: 0;
  padding: 0;

  width: 100%;
}
.el-pagination {
  width: 70%;
  margin: auto;
}
.footer {
  text-align: center;
}
</style>

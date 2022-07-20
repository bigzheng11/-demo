<template>
  <div>
    <el-form
      style="width: 40%"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- <el-form-item label="人员标号" prop="username">
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item> -->

      <el-form-item label="姓名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="网名" prop="nick_name">
        <el-input v-model="ruleForm.nick_name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="年龄" prop="">
    <el-input v-model="ruleForm.age"></el-input>
  </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    // edit(row) {
    //   this.$router.push("/UserUpdate");
    //   row.id;
    // },
    // page(currentPage) {
    //   const that = this;
    //   axios
    //     .put("http://localhost:8181/User/UserDetail/" + currentPage + "/6")
    //     .then(function (res) {
    //       that.tableData = res.data.content;
    //       that.total = res.data.totalElements;
    //     });
    // },

    open3() {
      this.$notify({
        title: "添加成功",
        message: "这是一条成功的提示消息",
        type: "success",
      });
    },
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('校验通过!');
          console.log(that.ruleForm);
          //↑拿到的表单数据
          axios
            .put("http://localhost:8181/User/update", this.ruleForm)
            .then(function (res) {
              console.log(res);
              if (res.status == 200) {
                // alert("添加成功")
                that.open3();
                that.$router.push("/UserManage");
              }
            });
        } else {
          console.log("校验不通过");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  data() {
    return {
      ruleForm: {
        id: "",
        username: "",
        password: "",
        nick_name: "",
        age: "",

        // delivery: false,
        // type: [],
        // desc: ''
      },
      total: null,
      tableData: null,
      rules: {
        // require-是否为必填项,trigger触发事件,blur失去焦点的时候触发
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        nick_name: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        // age: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        age: [{ required: true, message: "请输入年龄", trigger: "change" }],
      },
    };
  },
  created() {
    var that = this;
    // 跳转有r,接收参数没有r
    axios
      .get("http://localhost:8181/User/findById/" + this.$route.query.id)
      .then(function (res) {
        that.ruleForm = res.data;
      });
  },
};
</script>
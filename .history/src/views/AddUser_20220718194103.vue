<template>
  <!-- :rules  -- prop  绑定校验规则校验 -->
  <el-form
    style="width: 40%"
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="姓名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>

    <el-form-item label="网名" prop="nick_name">
      <el-input v-model="ruleForm.nick_name"></el-input>
    </el-form-item>
    <!-- <el-form-item label="年龄" prop="age">
    <el-input v-model="ruleForm.age"></el-input>
  </el-form-item> -->

    <el-form-item label="出生日期" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import Axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        nick_name: "",
        age: "",
        date1: "",
      },
      rules: {
        // require-是否为必填项,trigger触发事件,blur失去焦点的时候触发
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        nick_name: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        //           age: [
        //   { required: true, message: '请输入年龄', trigger: 'change' }
        // ],
      },
    };
  },
  methods: {
    open3() {
      this.$notify({
        title: "添加成功",
        message: "这是一条成功的提示消息",
        type: "success",
      });
    },
    submitForm(formName) {
      //表单数据储存在this.ruleForm中
      var newtime=Date.parse(new Date())
      var oldtime=Date.parse(this.ruleForm.date1)
      console.log("年龄为:",Math.floor((newtime-oldtime)/31536000000));
      
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('校验通过!');
          // console.log(that.ruleForm);
          //↑拿到的表单数据
          axios
            .post("http://localhost:8181/User/save", this.ruleForm)
            .then(function (res) {
              if (res.data == "成功") {
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
};
</script>


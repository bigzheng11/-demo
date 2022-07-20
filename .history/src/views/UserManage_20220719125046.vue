<template>
  <div>
    <el-table :data="tableData"  style="width: 80%;">
      <el-table-column fixed prop="id" label="id" width="100">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="160">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="160">
      </el-table-column>
      <el-table-column prop="nick_name" label="姓名" width="160">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="80"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- scope.row当前此行所有信息的对象 -->
          <el-button @click="edit(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="deleteUser(scope.row)"
            >删除</el-button
>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="page"
      :page-size="6"
      :total="total"
    >
      <!-- total一共100条数据,page-size每页6条 -->
    </el-pagination>
  </div>
</template>

<style scoped>
.el-pagination{
  margin: 30px;
}

</style>

<script>
export default {
  methods: {
    deleteUser(row) {
      const that = this;
      axios
        .delete("http://localhost:8181/User/deleteById/" + row.id)
        .then(function (res) {
          that.open3();
          window.location.reload();
          //页面的重新加载
        });
    },
    open3() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success",
      });
    },
    edit(row) {
      this.$router.push({
        path: "/UserUpdate",
        query: {
          id: row.id,
        },
      });
    },

    page(currentPage) {
      const that = this;
      axios
        .get("http://localhost:8181/User/UserDetail/" + currentPage + "/5")
        .then(function (res) {
          that.tableData = res.data.content;
          that.total = res.data.totalElements;
        });
    },
  },
  data() {
    return {
      total: null,
      tableData: null,
    };
  },

  created() {
    const that = this;
    axios.get("http://localhost:8181/User/UserDetail/1/5").then(function (res) {
      that.tableData = res.data.content;
      that.total = res.data.totalElements;
      // console.log(res);
    });
  },
};
</script>

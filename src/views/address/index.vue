<!--  -->
<template>
  <div class="contain">
    <!-- 增加等级 -->
    <el-button
      class="add-button"
      type="success"
      size="big"
      @click="dialogFormVisible = true"
      >添加地址</el-button
    >

    <!-- 列表信息 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="150"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" width="500">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click.stop="editHandle(scope.row)"
            >更改</el-button
          >
          <el-button
            type="text"
            icon="el-icon-delete"
            @click.stop="delHandle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page-box">
      <el-pagination
        style="width: 100%"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 增加对话框 -->
    <el-dialog title="地址名称" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="地址名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
      },
      tableData: [
        {
          id: 1,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          id: 4,
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    //初始化
    getData() {},

    //分页操作
    handleCurrentChange(value) {
      this.currentPage = value;
      this.getData();
    },

    //增加操作
    dialogFormVisible() {},

    //修改操作
    editHandle() {
      this.dialogFormVisible=true
    },

    /** 删除按钮操作 */
    delHandle(_data) {
      this.$confirm("此操作将永久删除且无法恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteFile({
            id: _data.id,
          }).then((res) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.contain {
  margin: 20px;
}
</style>
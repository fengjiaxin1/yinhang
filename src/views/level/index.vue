<!--  -->
<template>
<div class="contain">
    <!-- 增加等级 -->
          <el-button
        class="add-button"
        type="success"
        size="big"
        @click="dialogFormVisible = true"
        >添加等级</el-button
      >

        <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="150"> </el-table-column>
      <el-table-column prop="date" label="等级" width="150"> </el-table-column>

      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" width="700">
        <template slot-scope="scope">
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
    <el-dialog title="等级名称" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="等级名称" :label-width="formLabelWidth">
      <el-input v-model="form.level" autocomplete="off"></el-input>
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
      tableData: [
        {
          id: 1,
          date: "主管",
        },
        {
          id: 2,
          date: "主管",
        },
        {
          id: 3,
          date: "主管",
        },
        {
          id: 4,
          date: "主管",
        },
      ],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          level: '',
        },
    }
    
  },
  methods:{
      //渲染页面
    getData(){

    },
        //分页操作
    handleCurrentChange(value) {
      this.currentPage = value;
      this.getData();
    },

    //增加操作
    dialogFormVisible(){
      
    },
    
          /** 删除按钮操作 */
    delHandle(_data) {
      this.$confirm("此操作将永久删除且无法恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteFile({
            id: _data.id
          }).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.getData();
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.contain {
  margin: 20px;
}

</style>
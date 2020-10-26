<!--  -->
<template>
  <!-- top栏信息 -->
  <div class="contain">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-button
        class="add-button"
        type="success"
        size="big"
        @click="dialogFormVisible = true"
        >添加信息</el-button
      >
      <el-form-item label="搜索信息">
        <el-input v-model="formInline.user" placeholder="请输入信息"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表信息 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="date" label="等级" width="150"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="number" label="手机号" width="200">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" width="300">
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
      <!-- 分页 -->
    </el-table>
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

    <!-- 添加信息框 -->
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-select v-model="valueAddress" placeholder="请选择">
            <el-option
              v-for="item in address"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级" :label-width="formLabelWidth">
          <el-select v-model="valueLevels" placeholder="请选择">
            <el-option
              v-for="item in levels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item
          label="头像"
          :label-width="formLabelWidth"
          v-if="flag"
        >
        <el-upload
          action=""
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl1" alt="" />
        </el-dialog>
        </el-form-item>

        <el-form-item
          label="微信二维码"
          :label-width="formLabelWidth"
          v-if="flag"
        >
        <el-upload
          action=""
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl2" alt="" />
        </el-dialog>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHandle()">确 定</el-button>
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
      dialogImageUrl1: "",
      dialogImageUrl2: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      flag: true,
      formInline: {
        user: "",
      },
      address: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      // valueAddress: "",
      levels: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],

      // valueLevels:"",
      tableData: [
        {
          id: 1,
          date: "主管",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          number: 1300000000,
        },
        {
          id: 2,
          date: "主管",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          number: 13004231241,
        },
      ],
      // tableData: [],
      form: {
        id: "",
        data: "",
        name: "",
        address: "",
        number: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //列表渲染
    getData() {
      
    },

    //分页操作
    handleCurrentChange(value) {
      this.currentPage = value;
      this.getData();
    },

    //搜索操作
    searchHandle() {
      this.getData();
    },

    //增加操作
    addHandle() {},

    //更改操作
    editHandle() {
      this.dialogFormVisible = true;
      this.flag = false;
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
    //图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
.add-button {
  margin-right: 20px;
}
.page-box {
  text-align: right;
  margin-top: 20px;
}
</style>
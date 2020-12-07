<template>
  <div class="app-container">
    <el-row class="container-top">
      <el-button type="success" @click="dialogFormVisible = true"
        >添加等级</el-button
      >
    </el-row>
    <el-table :data="LevelData" stripe style="width: 100%" class="content">
      <el-table-column prop="jrid" width="50"> </el-table-column>
      <el-table-column prop="levelname" label="等级" width="280">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- Form -->
    <el-dialog title="等级名称" :visible.sync="dialogFormVisible">
      <el-form :model="{name}">
        <el-form-item label="等级名称" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogFormVisible = false), addLevelMsg(name)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getLevel, deleteLevel ,addLevel} from "@/api/getLevel";
export default {
  data() {
    return {
      input: "",
      value: "",
      LevelData: [],
      name,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
    };
  },
  methods: {
    getLevelMsg() {
      getLevel()
        .then((res) => {
          console.log(res);
          this.LevelData = res.data;
        })
        .catch(() => {});
    },
    handleDelete(index, row) {
      console.log(index,row)
      deleteLevel({levelid:row.jrid}).then(()=>{
          this.getLevelMsg();
      })
    },
    addLevelMsg(name){
      addLevel({levelname:name}).then(()=>{
          this.getLevelMsg();
      })
    }
  },
  created() {
      this.getLevelMsg();
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 30%;
  margin: 0 20px;
}
.container-top {
  margin-bottom: 20px;
}
.Search-title {
  font-weight: 700;
  font-size: 15px;
  margin-left: 15px;
}
</style>
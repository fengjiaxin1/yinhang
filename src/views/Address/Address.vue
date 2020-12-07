<template>
  <div class="app-container">
    <el-row class="container-top">
      <el-button type="success" @click="dialogFormVisible = true;">添加地址</el-button>
      <span class="Search-title">搜索地址</span>
      <el-input
        v-model="input"
        class="search"
        placeholder="请输入内容"
      ></el-input>
      &nbsp;
      <el-button type="primary">搜索</el-button>
    </el-row>
    <el-table :data="Data" stripe style="width: 80%">
      <el-table-column prop="addressname" label="地址" width="280">
      </el-table-column>
      <el-table-column prop="latitude" label="经度" width="280">
      </el-table-column>
      <el-table-column prop="longitude" label="纬度" width="280">
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
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="地址名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经度" :label-width="formLabelWidth">
          <el-input v-model="form.latitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度" :label-width="formLabelWidth">
          <el-input v-model="form.longitude" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,addAddressMsg(form.name,form.latitude,form.longitude)" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAddress, deleteAddress , addAddress} from "@/api/getAddress";
export default {
  data() {
    return {
      input: "",
      value: "",
      Data: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form:{
        name:"",
        latitude:"",
        longitude:""
      }
    };
  },
  methods: {
    handleDelete(index, row) {
      deleteAddress({ addressid: row.addressid }).then(() => {
        this.getAddressMsg();
      });
    },
    getAddressMsg() {
      getAddress()
        .then((res) => {
          console.log(res);
          this.Data = res.data;
        })
        .catch(() => {});
    },
    addAddressMsg(name,latitude,longitude) {
      addAddress({address:name,latitude:latitude,longitude:longitude}).then(() => {
        this.getAddressMsg();
      });
    },
  },
  created() {
    this.getAddressMsg();
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
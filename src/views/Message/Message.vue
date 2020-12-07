<template>
  <div class="app-container">
    <!-- 搜索头部 -->
    <el-row class="container-top">
      <el-button type="success" @click="dialogFormVisible = true">添加信息</el-button>
      <span class="Search-title">搜索信息</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      &nbsp;
      <el-button type="primary">搜索</el-button>
    </el-row>
    <!-- 信息表格 -->
    <el-table :data="MessageData" stripe style="width: 100%">
      <el-table-column prop="jrid" label="序号" width="180"> </el-table-column>
      <el-table-column prop="jrname" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="levelname" label="等级" width="180">
      </el-table-column>
      <el-table-column prop="addressname" label="地址" width="180">
      </el-table-column>
      <el-table-column prop="jrtel" label="手机号"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
        <el-form-item label="名字" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
        <el-select v-model="form.address"  placeholder="请选择地址">
            <el-option 
            v-for="item in AddressData" 
            :key=" item.value2"
            :label="item.addressname"
            :value="item.addressid"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="等级" :label-width="formLabelWidth">
        <el-select v-model="form.level" placeholder="请选择等级">
             <el-option 
            v-for="item in LevelData" 
            :key=" item.jrid"
            :label="item.levelname"
            :value="item.jrid"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 头像上传 -->
        <el-form-item label="头像上传" :label-width="formLabelWidth">
          <!-- action是将上传的图片的相对地址变成服务器上的绝对地址 -->
            <el-upload
                class="upload-demo"
                :action='url1+"/getMessageA"'
                name='sfile'
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="updataFile"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <!-- 微信上传 -->
        <el-form-item label="微信号上传" :label-width="formLabelWidth">
            <el-upload
                class="upload-demo"
                :action='url1+"/getMessageB"'
                name="sweixin"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="updataFile1"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOneMessage(form.name,form.address,form.level,form.tel,form.HeadUrl,form.WeixinUrl)">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMessage, deleteMessage, addMessage } from "@/api/getMessage.js";
import { getAddress } from "@/api/getAddress.js";
import { getLevel } from "@/api/getLevel.js"
export default {
  data() {
    return {
      /*表格属性 */
      options: [
        {
          value: "请搜索",
          label: "奥力给",
        },
      ],
      MessageData: [],
      value: "",
      /*弹出框属性 */
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
          name: '',
          address:'',
          level: '',
          tel: '',
          type: [],
          resource: '',
          desc: '',
          HeadUrl:"",
          WeixinUrl:""
        },
      formLabelWidth: '120px',
      //文件上传属性   
      fileList: [],
      url1:"",
      //等级信息
      LevelData:[],
      //地址信息
      AddressData:[]
      
    };
  },
  methods:{
    /*获取所有的管理信息 */
    getAllMessage() {
        getMessage().then((res) => {
          this.MessageData = res.data;
        })
        .catch((error) => {});
    },
    /*获取所有的地址信息 */
    getAllAddress(){
        getAddress().then((res)=>{
          this.AddressData=res.data;
          console.log(this.AddressData);
        })
        .catch((error) => {console.log(error)});
    },
    /*获取所有的等级信息 */
    getAllLevel(){
        getLevel().then((res)=>{
          this.LevelData=res.data;
          console.log(this.LevelData);
        })
        .catch((error) => {console.log(error)});
    },
    /*删除管理信息 */
    handleDelete(index, row) {
      deleteMessage({ id: row.jrid }).then(() => {
        this.getAllMessage();
      });
    },
    /*添加一条管理信息 */
    addOneMessage(name,address,level,tel,HeadUrl,WeixinUrl){
        this.dialogFormVisible = false;
        console.log(name,address,level,tel,HeadUrl,WeixinUrl);
        addMessage({uname:this.form.name,addressid:this.form.address,levelid:this.form.level,tel:this.form.tel,header:this.form.HeadUrl,weixin:this.form.WeixinUrl}).then(()=>{
          this.getAllMessage();
        }).catch((err)=>{
          console.log(err);
        })
    //   addMessage({name,address,level,tel}).then(()=>{
    //       this.dialogFormVisible = false
    //   })
    },
    /*头像上传成功钩子函数 */
    updataFile(file, fileList){
        this.form.HeadUrl=this.url1+file.headerurl
    },
    /*微信上传成功钩子函数 */
    updataFile1(file, fileList){
        this.form.WeixinUrl=this.url1+file.weixinurl
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePreview(file) {
        console.log(file);
      },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
  },
  created(){
      this.getAllMessage();
      this.getAllAddress();
      this.getAllLevel();
      this.url1=process.env.VUE_APP_BASE_API
  }
};
</script>

<style lang="scss" scoped>
.container-top {
  margin-bottom: 20px;
}
.Search-title {
  font-weight: 700;
  font-size: 15px;
  margin: 0 20px;
}
</style>
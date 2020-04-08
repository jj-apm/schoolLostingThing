<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
     <el-form-item label="拾物名称" prop="name">
       <el-col :span="6">
          <el-input v-model="ruleForm.name"></el-input>
       </el-col> 
     </el-form-item>
     <el-form-item label="拾物分类" prop="kind_id">
       <el-select v-model="ruleForm.kind_id" placeholder="请选择拾物分类">
         <el-option label="数码" value="1"></el-option>
         <el-option label="文具用品" value="2"></el-option>
         <el-option label="钱包" value="3"></el-option>
         <el-option label="证件" value="4"></el-option>
         <el-option label="卡类" value="5"></el-option>
         <el-option label="钥匙" value="6"></el-option>
         <el-option label="衣物" value="7"></el-option>
         <el-option label="手机" value="8"></el-option>
         <el-option label="首饰/配饰" value="9"></el-option>
         <el-option label="书本" value="10"></el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="拾取地点" prop="place">
       <el-col :span="6">
          <el-input v-model="ruleForm.place"></el-input>
       </el-col>
     </el-form-item>
     <el-form-item label="拾取时间" prop="date">
       <el-col :span="5">
           <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
       </el-col>
     </el-form-item>
     <el-form-item label="拾物描述" prop="desc">
       <el-col :span="16">
          <el-input type="textarea" v-model="ruleForm.desc" :rows="6"></el-input>
       </el-col>
     </el-form-item>
     <el-form-item label="上传图片" prop="fphoto">
        <el-upload
         class="avatar-uploader"
         action="/api/upload"
         :show-file-list="false"
         :on-success="handleAvatarSuccess"  
         :before-upload="beforeAvatarUpload"
         :on-remove="handleRemove">
         <img v-if="ruleForm.fphoto" :src="ruleForm.fphoto" class="avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
       </el-upload>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="submitForm('ruleForm')">提交发布信息</el-button>
     </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { log } from 'util';
export default{
     data() {
      return { 
        score:'',
        editorOption: {} ,
        ruleForm: {
          name: '',
          kind_id: '',
          place:'',
          date: '',
          desc: '',
          fphoto:''
        },
        rules: {
          name: [
            {required: true, message: '请输入拾取物品名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          kind_id: [
            { required: true, message: '请选择分类名称', trigger: 'change' }
          ],
          date: [
            {required: true, type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          place:[
            {required: true, message:'请输入拾取地点',trigger:'blur'},
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写拾物描述', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
       getUserInfo(){
            this.$http.get(`/api/user/userInfo/${this.$store.getters.user.result.id}`).then(res=>{
                // console.log(res.data);
                this.score=res.data.score
            })
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$http.post('/api/found/add',this.ruleForm).then(res=>{
             this.$message({
               message:'信息提交成功',
               type:'success',
               duration:2000
             })        
           })
            this.$http.post(`api/user/score/${this.$store.getters.user.result.id}`,{score:this.score+10}).then(res=>{
                // console.log(res.data);
                 }) 
              this.$router.push('/index')     
          }else{
            this.$message({
              message:'请输入所有信息',
              type:'warning'
            })
          }
        });
      },
       handleAvatarSuccess(res) {
        if (res.code===0){
             this.ruleForm.fphoto= res.url;
           }else {
             this.$message.error(res.message);
           }
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 4MB!');
        }
        return isLt2M;
      },
      handleRemove(file, fileList) {
        if (!file.url){
             const url=file.response.url;
             this.$http.post('/api/upload/delete',url).then(res=>{
               if (res.code===0){
                 this.ruleForm.fphoto='';
                 return;
               }           
               this.$message.error(res.message);
             })
           }
      }
    },
    created () {
      if(this.$store.getters.user.result){
        this.getUserInfo()
      }
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
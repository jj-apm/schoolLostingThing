<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
     <el-form-item label="失物名称" prop="name">
       <el-col :span="6">
          <el-input v-model="ruleForm.name"></el-input>
       </el-col> 
     </el-form-item>
      <el-form-item label="失物分类" prop="kind_id">
       <el-select v-model="ruleForm.kind_id" placeholder="请选择失物分类">
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
     <el-form-item label="失物描述" prop="desc">
       <el-col :span="16">
          <el-input type="textarea" v-model="ruleForm.desc" :rows="6"></el-input>
       </el-col>
     </el-form-item>
      <el-form-item label="价格" prop="price">
       <el-col :span="16">
          <el-input v-model="ruleForm.price" :rows="6"></el-input>
       </el-col>
     </el-form-item>
     <el-form-item label="上传图片" prop="tphoto">
        <el-upload
         class="avatar-uploader"
         action="/api/upload"
         :show-file-list="false"
         :on-success="handleAvatarSuccess"  
         :before-upload="beforeAvatarUpload"
         :on-remove="handleRemove">
         <img v-if="ruleForm.tphoto" :src="ruleForm.tphoto" class="avatar">
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
        editorOption: {} ,
        ruleForm: {
          name: '',
          kind_id: '',
          price: '',
          desc: '',
          tphoto:''
        },
        rules: {
          name: [
            {required: true, message: '请输入丢失物品名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          kind_id: [
            { required: true, message: '请选择分类名称', trigger: 'change' }
          ],
          price:[
            {required: true, message:'请输入丢失地点',trigger:'blur'},
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写失物描述', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$http.post('/api/transaction/add',this.ruleForm).then(res=>{
             this.$message({
               message:'信息提交成功',  
               type:'success'
             })
             this.$router.push('/index')   
           }).catch(e=>{
             console.log(e.message); 
           })
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
             this.ruleForm.tphoto= res.url;
           }else {
             this.$message.error(res.message);
           }
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return isLt2M;
      },
      handleRemove(file, fileList) {
        if (!file.url){
             const url=file.response.url;
             this.$http.post('/api/upload/delete',url).then(res=>{
               if (res.code===0){
                 this.ruleForm.tphoto='';
                 return;
               }           
               this.$message.error(res.message);
             })
           }
      }
    },
}
</script>
<style scoped>
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
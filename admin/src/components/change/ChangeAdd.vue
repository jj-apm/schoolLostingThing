<template>
  <div class="goods_container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
     <el-form-item label="物品名称" prop="goods_name">
       <el-col :span="6">
          <el-input v-model="ruleForm.goods_name"></el-input>
       </el-col> 
     </el-form-item>
     <el-form-item label="物品积分" prop="score">
       <el-col :span="3">
         <el-input type="text" v-model="ruleForm.score"></el-input>
       </el-col>
     </el-form-item>
     <el-form-item label="上传图片" prop="photo">
         <el-upload
          class="upload-demo"
          action="/api/uploadMore"
          list-type="picture"
          :multiple="true"
          :auto-upload="false"
          :http-request="uploadFile"
          ref="upload" 
         >
          <el-button size="small" type="primary">点击上传</el-button>
       </el-upload> 
        <!-- <el-button @click="subPicForm">提交上传</el-button> -->
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
        formData:'',
        ruleForm: {
          goods_name: '',
          photo:'',
          score:''
        },
        fileData:[],
        rules: {
          goods_name: [
            {required: true, message: '请输入物品名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
           score: [
            { required: true, message: '请输入物品积分', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
         uploadFile(item){
             this.fileData.push(item)
            },
      submitForm(formName) {
         this.$refs.upload.submit();
          this.formData = new FormData()
          for(var i=0;i<this.fileData.length;i++){
              this.formData.append('file', this.fileData[i].file);
                  }
            this.fileData=[]
           let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
           this.$http.post("/api/uploadMore", this.formData,config).then( res => {
                  console.log(res);
                  this.ruleForm.photo=res.data.url.toString() 
                   this.$refs[formName].validate((valid) => {
                     if (valid) {
                       console.log(this.ruleForm.tphoto);
                      this.$http.post('/api/goods/add',this.ruleForm).then(res=>{
                        this.$message({
                          message:'信息提交成功',  
                          type:'success'
                        })
                        // this.$rout er.push('/index')   
                      }).catch(e=>{
                        console.log(e); 
                      })
                     }else{
                       this.$message({
                         message:'请输入所有信息',
                         type:'warning'
                       })
                     }
                   })            
                      })         
    }
}
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
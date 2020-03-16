<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
     <el-form-item label="物品名称" prop="name">
       <el-col :span="6">
          <el-input v-model="ruleForm.name"></el-input>
       </el-col> 
     </el-form-item>
      <el-form-item label="物品分类" prop="tkind_id">
       <el-select v-model="ruleForm.tkind_id" placeholder="请选择物品分类">
         <el-option label="手机" value="1"></el-option>
         <el-option label="电子零件" value="2"></el-option>
         <el-option label="动漫" value="3"></el-option>
         <el-option label="图书" value="4"></el-option>
         <el-option label="网络设备" value="5"></el-option>
         <el-option label="服饰配件" value="6"></el-option>
         <el-option label="钟表眼镜" value="7"></el-option>
         <el-option label="女士鞋靴" value="8"></el-option>
         <el-option label="男士鞋靴" value="9"></el-option>
         <el-option label="游戏设备" value="10"></el-option>
         <el-option label="3C数码" value="11"></el-option>
         <el-option label="其他" value="12"></el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="物品描述" prop="desc">
       <el-col :span="16">
          <el-input type="textarea" v-model="ruleForm.desc" :rows="6"></el-input>
       </el-col>
     </el-form-item>
     <el-form-item label="上传图片" prop="tphoto">
        <el-upload
         class="upload-demo"
         action="/api/uploadMore"
         :show-file-list="true" 
         :http-request="uploadFile"
         :multiple="true"
          list-type="picture"
          ref="upload"
          :auto-upload="false"
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
           formData:"",
        editorOption: {} ,
        ruleForm: {
          name: '',
          tkind_id: '',
          desc: '',
          tphoto:''
        },
        fileData:[],
        rules: {
          name: [
            {required: true, message: '请输入物品名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          tkind_id: [
            { required: true, message: '请选择分类名称', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写物品描述', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
         uploadFile(item,fileList){
             this.fileData.push(item)
            },
            //  subPicForm(){
            //     this.$refs.upload.submit();
                // this.formDate.append('WS_CODE', "12133");
                  // console.log(this.fileData.length);
                  // for(var i=0;i<this.fileData.length;i++){
                  //   this.formDate.append('file', this.fileData[i].file);
                  // }
                  // console.log(this.formDate.get('file[]'));
                  // console.log(this.fileData);
                  
                  //  this.formData = new FormData()
                  // for(var i=0;i<this.fileData.length;i++){
                  //   this.formData.append('file', this.fileData[i].file);
                  // }
                  // this.fileData=[]
                  // console.log(this.formData.get('file'));
                  
                  
            //     let config = {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     }
            //     console.log(this.formDate); 
                
            //     this.$http.post("/api/uploadMore", this.formData,config).then( res => {
            //         console.log(res)
            //     }).catch( res => {
            //         console.log(res)
            //     })
            //  },
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
                  console.log(res.data.url)
                  this.ruleForm.tphoto=res.data.url[0]
              }).catch( err => {
                  console.log(err)
              })
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$http.post('/api/transaction/add',this.ruleForm).then(res=>{
             this.$message({
               message:'信息提交成功',  
               type:'success'
             })
             this.$router.push('/index')   
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
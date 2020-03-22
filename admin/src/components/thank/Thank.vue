<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
     <el-form-item label="标题" prop="title">
       <el-col :span="6">
          <el-input v-model="ruleForm.title"></el-input>
       </el-col> 
     </el-form-item>
     <el-form-item label="内容" prop="desc">
       <el-col :span="6">
          <el-input v-model="ruleForm.desc"></el-input>
       </el-col>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="submitForm('ruleForm')">提交信息</el-button>
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
          title: '',
          desc:''
        },
        rules: {
          title: [
            {required: true, message: '请输入标题名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写感谢内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$http.post('/api/thank/add',this.ruleForm).then(res=>{
             this.$message({
               message:'请等待管理员审核',  
               type:'success'
             })
            //  this.$router.push('/index')   
           }).catch(e=>{
             console.log(e); 
           })
          }else{
            this.$message({
              message:'请输入所有信息',
              type:'warning'
            })
          }
        });
      },
    },
}
</script>
<style>
</style>
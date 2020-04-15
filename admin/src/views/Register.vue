<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">校园失物招领管理系统</span>
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="registerUser.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                     <el-form-item label="学号(工号)" prop="stu_num">
                        <el-input v-model="registerUser.stu_num" placeholder="请输入学号或者工号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type='password' v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type='password' v-model="registerUser.password2" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                     <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="registerUser.phone" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='primary' class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:'register',
    data(){
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.registerUser.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return{
            registerUser:{
                username:'',
                stu_num:'',
                password:'',
                password2:'',
                phone:''
            },
            rules:{
                username:[
                    {required:true,message:'用户名不能为空',trigger:'blur'},
                    {min:2,max:30,message:'长度在2-10个字符之间',trigger:'blur'}
                ],
                stu_num:[
                    {required:true,message:'学号不能为空',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {min:4,max:10,message:'长度在4-10之间',trigger:'blur'}
                ],
                password2:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {min:4,max:10,message:'长度在4-10之间',trigger:'blur'},
                    {validator:validatePass2,trigger:'blur'}
                ],
                phone:[
                    {required:true,message:'手机号码不能为空',trigger:'blur'},   
                ],
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$http.post('/api/user/register',this.registerUser)
                        .then(res=>{
                            this.$message({
                                message:'注册成功',
                                type:'success'
                            })
                        })
                this.$router.push('/login')
                }    
            })
        },
    }
}
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>


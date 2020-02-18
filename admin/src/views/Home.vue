<template>
    <div class="home">
        <div class="container">
        <el-container>
         <el-header>
        <div class="head">
         <p class="title">欢迎来到校园失物招领网</p>
         <p class="name">{{user.result.username}}</p>
        </div> 
       </el-header>
       <el-menu  class="el-menu-demo" mode="horizontal" router>
         <el-menu-item index="/index">首页</el-menu-item>
         <el-menu-item index="/lost">寻物启事</el-menu-item>
         <el-menu-item index="/found">招领启事</el-menu-item>
         <el-menu-item index="/claim">认领启事</el-menu-item>
         <el-menu-item index="/publish">发布信息</el-menu-item>
       </el-menu>
       <el-main>
         <section class="sec1"><img src="../assets/post1.jpeg" alt=""></section>
        <router-view></router-view>
        </el-main>
        
       <el-footer>Footer</el-footer>
      </el-container>
      </div>
    </div>
</template>

<script>
export default{
    computed: {
        user(){
            return this.$store.getters.user
        }
    }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.home {
  width: 100%;
  height: 100vh;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 40px !important;
    line-height: 40px;
  }
.el-main {
    background-color: #E9EEF3;
    /* width:960px; */
    color: #333;
    /* text-align: center; */
    height: 900px;
    padding: 12px;
    /* text-align: center; */
    /* line-height: 160px; */
  }
body > .el-container {
    margin-bottom: 40px;
  }
.head{
    display: flex;
    width:100%;
    height:40px;
    justify-content: space-between;
}   
.head .title, .head .name{
    vertical-align: middle;
    font-size: 24px;
    font-family: "Microsoft YaHei";
    letter-spacing: 1px;
    line-height: 40px;
}
.head .name{
    margin-right: 10px;
    font-size: 18px;
}
.sec1{
    width: 100%;
    height:163px;
    text-align: center
}
.sec1 img{
    width: 960px;
    height: inherit;
    text-align: center;
}
.el-menu-item{
    font-size: 20px;
}
.el-menu--horizontal>.el-menu-item {
    margin: 0 30px 0 30px;
}
</style>
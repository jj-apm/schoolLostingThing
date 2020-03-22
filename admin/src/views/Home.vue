<template>
    <div class="home">
        <div class="container">
        <el-container>
        <HeaderNav></HeaderNav>
       <el-menu class="el-menu-demo" mode="horizontal" router>
         <el-menu-item index="/index">首页</el-menu-item>
         <el-menu-item index="/lost">寻物启事</el-menu-item>
         <el-menu-item index="/found">招领启事</el-menu-item>
         <el-menu-item index="/publish">发布信息</el-menu-item>
         <el-menu-item index="/goods">积分商城</el-menu-item>
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
import HeaderNav from '../components/HeaderNav'
export default{  
    components: {
      HeaderNav
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
 .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 30px !important;
    line-height: 30px;
  }
.el-main {
    background-color: #E9EEF3;
    color: #333;
    height:auto;
    padding: 12px;
    overflow: hidden;
  }
body > .el-container {
    margin-bottom: 40px;
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
    height: 50px;
    line-height: 50px;
    margin: 0 50px 0 50px;
}
</style>
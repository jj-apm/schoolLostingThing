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
       </el-menu>
       <el-main>
         <DetailItem></DetailItem>  
        </el-main>
       <el-footer>Footer</el-footer>
      </el-container>
      </div>
    </div>
</template>

<script>
import DetailItem from './childDetails/DetailItem'
import HeaderNav from '../HeaderNav'
export default{
    computed: {
        user(){
            return this.$store.getters.user
        }
    },
    components: {
      DetailItem,
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
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 30px !important;
    line-height: 30px;
  }
.el-main {
    background-color: #E9EEF3;
    color: #333;
    height: auto;
    padding: 12px;
    overflow: hidden;
  }
body > .el-container {
    margin-bottom: 40px;
  }
.head{
    display: flex;
    width:100%;
    height:30px;
    justify-content: space-between;
}   
.head .title, .head .name{
    vertical-align: middle;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    letter-spacing: 1px;
    line-height: 30px;
}
.head .name{
    margin-right: 10px;
    font-size: 18px;
}
.el-menu-item{
    font-size: 20px;
}
.el-menu--horizontal>.el-menu-item { 
    height: 50px;
    line-height: 50px;
    margin: 0 30px 0 30px;
}
</style>
<template>
<div class="index">
  <HeadNav></HeadNav>
   <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1', '3']" style="height:100%">
      <el-menu-item index='0'>
        <i class="iconfont"></i>
        <span class="slot">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="/users/list">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>失物管理</template>
         <el-menu-item-group>
          <el-menu-item index="/lost/list">失物列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>招领管理</template>
         <el-menu-item-group>
          <el-menu-item index="/found/list">招领列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>留言管理</template>
         <el-menu-item-group>
          <el-menu-item index="/clue/list">留言列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>认领管理</template>
         <el-menu-item-group>
          <el-menu-item index="claim/list">认领列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>   
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .update{
    width: 100%
  }
  .el-aside {
    color: #333;
  }
  .index{
  width: 100%;
  height: 100%;
  /* overflow: auto; */
}
</style>

<script>
import HeadNav from './HeadNav'
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    components: {
      HeadNav
    }
  };
</script>

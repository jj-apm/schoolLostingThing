<template>
  <el-row class="menu_page">
        <el-col>
    <el-menu router  style="height:100%">
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
        <template slot="title"><i class="el-icon-setting"></i>分类管理</template>
         <el-menu-item-group>
          <el-menu-item index="/kind/list">分类列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>认领管理</template>
         <el-menu-item-group>
          <el-menu-item index="/claim/list">认领列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-setting"></i>积分兑换管理</template>
         <el-menu-item-group>
          <el-menu-item index="/change/add">添加商品</el-menu-item>
          <el-menu-item index="/change/list">商品管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-setting"></i>感谢信管理</template>
         <el-menu-item-group>
          <el-menu-item index="/thank/list">编辑</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
        </el-col>
  </el-row>
</template>
<script>
export default{}
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

</style>
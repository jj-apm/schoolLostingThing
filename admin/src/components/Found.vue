<template>
<div>
  <div class="page-cate-title">
      <span class="title-text">招领启事列表</span>
    </div>
     <el-table
    :data="tableData"
    border
    :header-cell-style="{'background':'#188850','text-align':'center'}"
    :row-style="{'background-color':'#e5bfa0'}"
     >
    <el-table-column
      prop="type"
      label="类型"
      width="80"
      align="center">
      <span>招领</span>
    </el-table-column>
    <el-table-column
      prop="name"
      label="信息标题"
      width="200"
      align="center"
      class-name="click"
      >
      <template slot-scope="scope">
          <el-link @click="handleClick(scope.$index, scope.row)" >{{ scope.row.name }}</el-link>
          <!-- <span style="color:#f56767" @click="handleClick(scope.$index, scope.row)">{{ scope.row.name }}</span> -->
          </template>
    </el-table-column>
    <el-table-column
      prop="userName"
      label="联系人"
      width="190"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="发布时间"
      width="190"
      align="center">
    </el-table-column>
  </el-table>
</div> 
</template>
<script>
import { log } from 'util'
 export default {
    data() {
      return {
      tableData: [],
      message:'123'
      }
    },
    methods:{
      getLostData(){
        this.$http.get('/api/found').then(res=>{
            this.tableData=res.data           
        })
      },
      handleClick(index,row){
        this.$router.push({path:'/foundDetail',query:{id:row.id}}) 
      }
    },
    created(){
      this.getLostData()
    }
  }
</script>
<style>
.el-table{
  width: 662px !important;
  margin-top:35px;
  margin-left:180px;
}
.el-table__header-wrapper{
    padding: 0 !important;
    height: 32px;
}
.el-table__header tr,
  .el-table__header th {
    padding: 0 !important;
    height: 40px;
}
.click{
  cursor: pointer
}
.page-cate-title .title-text {
    position: relative;
    top: -8px;
    font-size: 18px;
    line-height: 1;
    color: #4fb9e9;
    padding: 0 10px;
    background: #efefef;
}
.page-cate-title {
    position: relative;
    background: #4fb9e9;
    background-image: -webkit-linear-gradient(left,#efefef,#4fb9e9 20%,#4fb9e9 80%,#efefef);
    background-image: -moz-linear-gradient(left,#efefef,#4fb9e9 20%,#4fb9e9 80%,#efefef);
    background-image: -ms-linear-gradient(left,#efefef,#4fb9e9 20%,#4fb9e9 80%,#efefef);
    background-image: -o-linear-gradient(left,#c0bcbc,#4fb9e9 20%,#4fb9e9 80%,#efefef);
    background-image: linear-gradient(to right,#efefef,#4fb9e9 20%,#4fb9e9 80%,#efefef);
    height: 1px;
    width: 960px;
    text-align: center;
    top: 10px;
    left:166px;
    margin-bottom: 15px;
    margin-top:20px;
}
.el-table td, .el-table th {
  padding:7px 0
}
</style>
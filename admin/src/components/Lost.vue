<template>
<div>
  <div class="page-cate-title">
      <span class="title-text">最新失物招领启事</span>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
     <el-table-column
      prop="type"
      label="类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="信息标题"
      width="180">
    </el-table-column>  
    <el-table-column
      prop="username"
      label="联系人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="date"
      label="发布时间"
      width="180">
    </el-table-column>
  </el-table>
</div> 
</template>
<script>
 export default {
    data() {
      return {
      tableData:[]
      }
    },
    methods:{
      getLostData(){
        this.$http.get('/api/lost').then(res=>{
          
        })
      }
    },
    created(){
      this.getLostData()
    }
  }
</script>
<style scoped>
.el-table{
   width: 960px !important;
  margin-top:35px;
  margin-left:180px;
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
    background-image: -o-linear-gradient(left,#efefef,#4fb9e9 20%,#4fb9e9 80%,#efefef);
    background-image: linear-gradient(to right,#efefef,#4fb9e9 20%,#4fb9e9 80%,#efefef);
    height: 1px;
    width: 960px;
    text-align: center;
    top: 10px;
    left:166px;
    margin-bottom: 15px;
    margin-top:20px;
}
</style>
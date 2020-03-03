<template>
<div>
  <div>
     <div class="page-cate-title">
      <span class="title-text">失物启事列表</span>
    </div>
    <div class="layout">
      <div class="search">
          <el-form :inline="true" :model="searchData" class="demo-form-inline">
           <el-form-item label="失物类别:" >
            <el-select v-model="searchData.kind_id" >
              <el-option label="数码" value="1" @click.native="filterOption"></el-option>
              <el-option label="文具用品" value="2" @click.native="filterOption"></el-option>
              <el-option label="钱包" value="3" @click.native="filterOption"></el-option>
              <el-option label="证件" value="4" @click.native="filterOption"></el-option>
              <el-option label="卡类" value="5" @click.native="filterOption"></el-option>
              <el-option label="钥匙" value="6" @click.native="filterOption"></el-option>
              <el-option label="衣物" value="7" @click.native="filterOption"></el-option>
              <el-option label="手机" value="8" @click.native="filterOption"></el-option>
              <el-option label="首饰/配饰" value="9" @click.native="filterOption"></el-option>
              <el-option label="书本" value="10" @click.native="filterOption"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="失物日期:">
             <el-date-picker
                v-model="searchData.startTime"
                type="date"
                placeholder="选择开始时间"
              >
              </el-date-picker>
                --
                <el-date-picker
                v-model="searchData.endTime"
                type="date"
                placeholder="选择结束时间"
                @click.native="searchDate"
              >
              </el-date-picker>
          </el-form-item>
          <el-form-item label="关键字:">
            <el-input v-model="searchData.value" placeholder="请输入关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchKeywords">筛选</el-button>
          </el-form-item>
        </el-form>
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
  <el-row class="row1">
    <el-col :span="12" :push="5">
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 10, 100]"
            :page-size="3"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total">
    </el-pagination>  
    </el-col>
    </el-row>     
    </div>
  </div>
</div> 
</template>
<script>
import { log } from 'util'
 export default {
    data() {
      return {
      tableData: [],
      currentPage:1,
      pageSize:'3',
      total:10,
      paginationSign:0,
      searchData:{
        kind_id:'',
        startTime:'',
        endTime:'',
        value:''
      }
      }
    },
    methods:{
      getLostData(){
        this.$http.get('/api/lost',{params:{currentPage:this.currentPage,pageSize:this.pageSize}}).then(res=>{
            this.tableData=res.data.total
            this.total=res.data.count;
            console.log(res.data);
            // console.log(res.data.sum);               
        })
      },
      searchKeywords(){
        this.paginationSign=1
        this.$http.post('/api/searchKeywords',{value:this.searchData.value,pageSize:this.pageSize,currentPage:this.currentPage})
        .then(res=>{
          // console.log(res.data);
          this.tableData=res.data.total
          this.total=res.data.count;
        })
    },
      filterOption(){
        this.paginationSign=2
        this.$http.post('/api/searchKeywords',{value:parseInt(this.searchData.kind_id),pageSize:this.pageSize,currentPage:this.currentPage})
          .then(res=>{
            console.log(res.data);
            this.tableData=res.data.total
            this.total=res.data.count;
          })
        // console.log(typeof this.searchData.kind_id);
      },
      searchDate(){
        const sTime = this.searchData.startTime.getTime()
        const eTime = this.searchData.endTime.getTime()
        this.tableData = this.tableData.filter(item=>{
           let date = new Date(item.date)
           let time = date.getTime()
           return time >= sTime && time <= eTime
        })
      },
      handleClick(index,row){
        this.$router.push({path:'/lostDetail',query:{id:row.id}}) 
      },
      //每页条数改变触发函数
    handleSizeChange(val){
      this.pageSize=val
      if(this.paginationSign==0){
         this.getLostData()
      }else if(this.paginationSign==1){
        this.searchKeywords()
      }else{
        this.filterOption()
      }
     
    },
     //当前页数改变触发函数
      handleCurrentChange(val) {
        this.currentPage=val
        if(this.paginationSign==0){
         this.getLostData()
         }else if(this.paginationSign==1){
        this.searchKeywords()
        }else{
          this.filterOption()
      }
      },
    },   
    created(){
      this.getLostData()
    },
  }
</script>
<style>
.el-table{
   width: 662px !important;
   margin-top:35px;
   margin-left:180px;
}
.el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden !important;
}
.el-table td, .el-table th {
  padding:4px 0 !important;
}
.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
  border-right: 0px solid #EBEEF5 !important;
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
.row1{
  margin-top: 20px;
}
.search{
  width:960px;
  height: 160px;
  background-color: #f1e9e9;
  border-radius: 10px;
  margin-left: 180px;
  margin-top:35px;
}
.demo-form-inline{
  position: relative;
  top: 28px;
  margin-left: 20px;
}
.demo-form-inline .el-form-item:nth-child(2){
  margin-left: 30px;
}

</style>
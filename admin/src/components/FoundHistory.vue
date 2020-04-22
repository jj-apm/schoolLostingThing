<template>
  <div class="history_page">
    <el-table
    :data="tableData"
    border
    :header-cell-style="{'background':'green','text-align':'center','color':'#F7F7F7'}"
    :row-style="{'background-color':'#e5bfa0'}"
    class="found_history"
     >
    <el-table-column
      prop="name"
      label="信息标题"
      width="120"
      align="center"
      >
      <template slot-scope="scope">
          <el-link @click="handleClick(scope.$index, scope.row)" >{{ scope.row.name }}</el-link>
          <!-- <span style="color:#f56767" @click="handleClick(scope.$index, scope.row)">{{ scope.row.name }}</span> -->
          </template>
    </el-table-column>
    <el-table-column
      prop="kindName"
      label="类别"
      width="100"
      align="center">
    </el-table-column>
     <el-table-column
      prop="desc"
      label="拾物描述"
      width="190"
      align="center">
    </el-table-column>
    <el-table-column
      prop="place"
      label="拾取地点"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="发布时间"  
      width="150"
      align="center">
    </el-table-column>   
     <el-table-column
      prop="status"
      label="状态"
      width="120"
      align="center">     
    </el-table-column>
     <el-table-column
      prop="id"
      label="编号"
      width="120"
      align="center">     
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { log } from 'util'
import Dialog from './history/Dialog'
import $ from 'jquery'
export default{
  inject:['reload'],
    data(){
        return{
            tableData:[],
            result:''
        }
    },
    methods: {
        handleClick(index,row){
          this.$router.push({path:'/foundDetail',query:{id:row.id}}) 
        },
        getHistoryData(){
            let {id}=this.$store.getters.user.result
            this.$http.get('/api/found',{params:{userId:id,pageSize:'',currentPage:''}})
              .then(res=>{
                  console.log(res.data);
                this.result=res.data
                this.result.map((item, idx) => {
                    let everyItem = {}
                    everyItem.id = item.id
                    everyItem.name = item.name
                    everyItem.desc = item.desc
                    everyItem.lphoto = item.lphoto
                    everyItem.date = item.date
                    everyItem.place = item.place
                    everyItem.userName = item.user.username
                    everyItem.kindName = item.kind.name
                    everyItem.status = item.status
                    everyItem.type = item.type
                    this.tableData.push(everyItem)
                })
                for(var item of this.tableData){
                  if(item.desc.length>20){
                    item.desc=item.desc.slice(0,20)+'...'
                  }
                }
              })           
        }
    },
    created () {
      this.getHistoryData()
    },
    mounted () {
      var _this=this
        var time=setTimeout(function(){
          $(function(){
            $('.history_page .found_history .el-table__body tr')
             .mouseenter(function(){
              $(this).append($('<img src="http://127.0.0.1:7001/public/uploads/delete.png"></img>'))
              $('.el-table__body tr img').click(function(){
                var id=parseInt($(this).prev().text())
                _this.$http.post(`/api/found/delete/${id}`,{value:false}).then(res=>{
                      _this.getHistoryData()  
              })
              _this.reload()
              })
             })
             .mouseleave(function(){
                $('.el-table__body tr img').remove()
                clearTimeout(time)
              })
          })
        },2000)
    }
}
</script>
<style scoped>
.history_page >>>.found_history{
  width: 982px !important;
  margin-top:35px;
  margin-left:180px;
  background-color: #e9eef3;
}
.history_page >>>.found_history .el-table__header-wrapper{
    padding: 0 !important;
    height: 40px;
}
.history_page >>>.found_history .el-table__header tr,.history_page>>> .found_history .el-table__header th {
    padding: 0 !important;
    height: 40px;
}
.history_page>>> .found_history .el-table__body tr,.history_page>>> .found_history .el-table__body td{
   padding: 0 !important;
   height: 32px;
}
.history_page>>>.el-table--border td,.history_page>>>.el-table--border th,.history_page>>> .found_history .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
  border-right:0px !important
}
/* .history_page>>> .found_history .el-table__body tr:hover>td{
  background-color: pink !important;
} */
/* .history_page>>> .found_history .el-table__body tr:hover::after{
  content:url('../assets/delete.png');
  display:block;
  position:relative;
} */
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
<template>
<div>
<el-header>
  <div class="head">
      <p class="title">欢迎来到校园失物招领网</p>
           <p class="name">{{user.result.username}}
        <el-dropdown trigger="click" @command="setDialogInfo">
          <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown trigger="click" @command="historyInfo">
              <span class="el-dropdown-link">
                发布历史<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="lost">我的失物</el-dropdown-item>
                <el-dropdown-item command="found">我的拾取</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown-item command="status">修改物品状态</el-dropdown-item>
            <el-dropdown-item command="notice"><p v-if="noticeList.length" style="width: 124px;margin: 0"><span>通知</span><i class="notice"><span>{{noticeList.length}}</span></i></p></el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i v-if="noticeList.length" class="notice"><span>{{noticeList.length}}</span></i>
      </p>
   </div> 
</el-header>
<el-dialog
  :visible.sync="dialogVisible"
  width="30%"
  >
   <el-tabs type="card" v-model="activeName">
    <el-tab-pane label="失物管理" name="first">
      <el-form ref="form" :model="lostList" label-width="80px">
        <el-form-item label="失物编号" prop="id">
            <el-col :span="6">
                <el-input v-model="lostList.id"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="失物状态" prop="status">
            <el-col :span="8">
              <el-select v-model="lostList.status">
               <el-option label="发布中" value="1"></el-option>
               <el-option label="已找到" value="2"></el-option>
            </el-select>
            </el-col>
        </el-form-item>
         <el-form-item>
            <el-col :push="16">
                <el-button type="primary" @click="editLost">确 定</el-button>
            </el-col>  
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="拾物管理" name="second">
        <el-form ref="form" :model="foundList" label-width="80px">
        <el-form-item label="拾物编号">
           <el-col :span="6">
                <el-input v-model="foundList.id"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="拾物状态">
            <el-col :span="8">
              <el-select v-model="foundList.status">
                <el-option label="未认领" value="1"></el-option>
               <el-option label="已认领" value="2"></el-option>
              </el-select>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-col :push="16">
                <el-button type="primary" @click="11">确 定</el-button>
            </el-col>  
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</el-dialog>
<!-- 通知弹窗 -->
    <el-dialog
     :visible.sync="dia1Visible"
     width="30%">
        <div class="notice-dialog" v-for="(item,idx) in noticeList" :key="idx" @click="lostDetail(item.lost_id,item.id)">
          <span>{{item.username}}</span>:&nbsp;&nbsp;<span>{{item.info}}</span><br>
          <span>{{item.date|dateFilter}}</span> 
        </div>
</el-dialog>
</div>
</template>
<script>
import { log } from 'util'
export default{
    data(){
        return{
            activeName:'first',
             dialogVisible: false,
             lostList:{
                 id:'',
                 status:''
             },
             foundList:{
                 id:'',
                 status:''
             },
             dia1Visible:false,
             noticeList:[],
             time:''
        }
    },
    methods: {
        editFound(){
          this.$http.post(`/api/found/editStatus/${this.foundList.id}`,this.foundList)
             .then(res=>{
                 if(res.data){
                     this.$message({
                         type:'success',
                         message:'修改拾物状态成功'
                     })
                 }
                 this.dialogVisible=false
             })
        },
        editLost(){
            this.$http.post(`/api/lost/editStatus/${this.lostList.id}`,this.lostList)
                .then(res=>{
                    if(res.data){
                        this.$message({
                            type:'success',
                            message:'修改失物状态成功'
                        })
                    }
                    this.dialogVisible=false
                })
        },
        setDialogInfo(cmdItem){
            switch(cmdItem){
                case "info":
                    this.showIndoList();
                    break; 
                 case "status":
                    this.status();
                    break;
                 case "notice":
                    this.notice();
                    break; 
                case "logout":
                    this.logout();
                    break;    
            }
        },
        historyInfo(cmd1Item){
            switch(cmd1Item){
                case 'lost':
                     this.lostHistory();
                     break;
                case 'found':
                     this.foundHistory();
                     break;
            }
        },
        showIndoList(){
          this.$router.push('/infoshow')
        },
        notice(){
               this.dia1Visible=true
        },
        logout(){
            //清除token
            localStorage.removeItem('eleToken')
            this.$store.dispatch('clearCurrentState')
            this.$router.push('/login')
        },
        status(){
            this.dialogVisible=true
        },
        lostHistory(){
            this.$router.push('/lostHistory')
        },
        foundHistory(){
            this.$router.push('/foundHistory')
        },
        getNotice(){
            this.noticeList=[]
            this.$http.get('/api/notice',{params:{user_id:this.$store.getters.user.result.id}})
                .then(res=>{
                    console.log(res.data);
                    for(var i1 of res.data){
                        for(var i2 of i1.clues)
                          this.noticeList.push(i2)
                    }
                    // console.log(this.noticeList);
                    
                })
        },
        lostDetail(val,id){
            this.$router.push({path:'/lostDetail',query:{id:val}})
            this.$http.post(`/api/notice/editType/${id}`,{type:1})
              .then(res=>{
                  console.log(res.data);
              })
        }
    },
    computed: {
        user(){
            return this.$store.getters.user
        }
    },
    filters: {
       dateFilter(date){
          let d=new Date(date)
          return d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0'+ (d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate() <10?'0'+d.getDate():d.getDate()) + ' ' + (d.getHours()<10?'0'+d.getHours():d.getHours()) + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());
      }
    },
    created () {
        // this.time=setInterval(()=>{
            this.getNotice()
        // },6000)
    },
    destroyed () {
        clearInterval(this.time)
    }
}
</script>
<style>
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 30px !important;
    line-height: 30px;
}
.head{
    display: flex;
    width:100%;
    height:30px;
    justify-content:space-between;
}   
.head .title, .head .name{
    vertical-align: middle;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    letter-spacing: 1px;
    height:30px;
    line-height: 30px;
    margin-top: 0px;
}
.head .name{
    margin-right: 10px;
    font-size: 18px;
}
.notice{
   display: inline-block;
   width: 20px;
   height: 20px;
   border-radius: 10px;
   background-color: red;
   position: relative;
   top: -7px;
   left: -2px;
}
.notice span{
    color: #fff;    
    font-size: 13px;
    display: block;
    text-align: center;
    font-family: '黑体';
    font-style: normal;
    font-weight: bold;
    height: 20px;
    line-height: 20px;
}
.notice-dialog{
    background-color:#baccf0;
    margin-bottom: 10px;
    cursor: pointer;
}
.notice-dialog span:nth-of-type(3){
    font-size: 13px;
}
ul .el-dropdown span{
    display: block;
    margin: 5px 0 5px 20px;
    cursor: pointer;
}
</style>
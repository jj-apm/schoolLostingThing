<template>
<div>
     <div class="main">
      <div class="jj-logo">
          <a href="#" class="tv"><img src="../../../assets/tv.png"></a>
          <span>招领启事</span>
      </div>
      <div class="content">
          <el-row class="first"><el-col :span="6" class="col1"><a href="#" class="laba"><img src="../../../assets/laba.png"></a></el-col>
          <el-col :span="8" :push="4"><span class="title">{{detailData.name}}</span></el-col></el-row>
          <el-row class="second"><el-col :span="4" :push="1" style="width:68px"><span class="kindName">物品种类:</span></el-col><el-col :span="4" :push="1" class="col5"><span class="kindName">{{detailData.kindName}}</span></el-col>
          <el-col :span="4" :push="13" class="col3"><h2 class="red">{{detailData.status}}...</h2></el-col></el-row>
          <el-row><el-col :span="4" :push="1" class="col4"><span>详细描述:</span></el-col><el-col :span="16" :push="1" class="col5">
              <div class="desc"><span>{{detailData.desc}}</span></div></el-col></el-row>
          <el-row class="row5" v-if="detailData.fphoto"><el-col :span="4" :push="1" style="width:68px" class="imgSet"><span>拾物图片:</span></el-col><el-col :span="8" class="col5" :push="1"><img :src="detailData.fphoto"></el-col></el-row>
          <el-row class="row5"><el-col :span="4" :push="1" style="width:68px"><span>丢失地点:</span></el-col><el-col :span="8" class="col5" :push="1">{{detailData.place}}</el-col></el-row>
          <el-row class="row5"><el-col :span="4" :push="1" style="width:68px"><span>丢失时间:</span></el-col><el-col :span="8" class="col5" :push="1">{{detailData.date}}</el-col></el-row>
          <el-row class="row5"><el-col :span="4" :push="1" style="width:68px"><span>联系人:</span></el-col><el-col :span="8" class="col5" :push="1">{{detailData.userName}}</el-col></el-row>
          <el-row class="row5"><el-col :span="4" :push="1" style="width:68px"><span>手机号码:</span></el-col><el-col :span="8" class="col5" :push="1">{{(detailData.phone||'')|phoneFormat}}****</el-col></el-row>
          <el-row class="row5"><button class="btn col5" @click="dia1Visible=true">我要认领</button></el-row>
      </div> 
       </div>
       <div class="commentStyle">
       <el-row class="row5"><span class="clue">发表留言:</span></el-row>
          <el-row><div><el-input placeholder='请发表留言:' @click.native="dialogShow"></el-input></div></el-row>
          <el-row class="row5">
              <p class="new">最新评论:</p>
            <div class="comentContent">
              <div class="onlyComment" v-for="(item1,idx) in commentList" :key="idx">
                  <div v-if="item1.replies? true:false">
                      <div v-for="(item2,idx) in item1.replies" :key="idx" class="reply">
                          <p><span>{{item2.username}}:</span>&nbsp;&nbsp;<span>{{item2.info}}</span></p>
                         <p><span>@{{item1.username}}:</span>&nbsp;&nbsp;<span>{{item1.info}}</span></p>
                         <p><span>{{item2.date|dateFilter}}</span><span @click="reply(item1.username,item1.id,item1.user_id)">回复</span></p>
                      </div>
                  </div>
                  <div class="comment">
                    <p><span>{{item1.username}}</span>:&nbsp;&nbsp;<span>{{item1.info}}</span></p>
                    <p><span>{{item1.date}}</span><span @click="reply(item1.username,item1.id,item1.user_id)">回复</span></p>
                  </div> 
              </div>
            </div>
          </el-row>
          <el-dialog
           title="评论"
           :visible.sync="dia2Visible"
           width="30%"
           >
           <el-form :model="clue" v-if="this.commentType==0">
               <el-form-item>
                    <el-input class="textarea" type="textarea" placeholder="发表留言..." :rows="7" v-model="clue.info" ref="input"></el-input>
               </el-form-item>
           </el-form>
           <el-form :model="replyField" v-else>
               <el-form-item>
                    <el-input type="textarea" :placeholder="`回复${replyTo}:`" :rows="7" v-model="replyField.info"></el-input>
               </el-form-item>
           </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitComment">确 定</el-button>
          </span>
          </el-dialog>
  </div>
        <el-dialog
        title="提示"
        :visible.sync="dia1Visible"
        width="30%"
        >
        <span class="claim">请根据上述信息确定是否为您所遗失的物品,点击确认按钮后您可以看到拾物者的联系方式，同时该信息会被标记被认领。
            【但请注意，在您点击的同时会记录的账户信息作为认领依据！在确认非本人遗失物品请勿恶意点击确认按钮】
        </span>
        <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="claim">确 定</el-button>
        </span>
      </el-dialog> 
</div>
</template>
<script>
import { log } from 'util'
export default{
    data(){
        return{
            id:'',
            detailData:'',
            dialogVisible: false,
            claimFields:{},
            st:{
                status:2
            },
             clue:{
                info:"",
                found_id:'',
            },
            replyField:{
                info:"",
                comment_id:0,
                replyuser_id:0,
                replyuser_name:''
            },
            commentList:[],
            commentType:0,
            replyTo:'',
            replyList:[],
            filterList:[],
            dia1Visible:false,
            dia2Visible:false
        }
    },
    methods: {
        getDetail(){
            this.id=this.$route.query.id
            this.$http.get('/api/foundById',{params:{id:this.id}}).then(res=>{
                // console.log(res.data); 
                this.detailData=res.data         
            })
        },
         claim(){
            this.dia1Visible=false
            let {username,phone}=this.$store.getters.user.result
            this.claimFields.name=username
            this.claimFields.phone=phone
            this.claimFields.found_id=this.detailData.id
            this.$http.post('/api/claim/add',this.claimFields).then((res)=>{
                this.$http.post(`/api/found/editStatus/${this.detailData.id}`,this.st)
                .then(res=>{
                    this.getDetail()
                })        
            })
            this.$alert(`<p>拾物人姓名：${this.detailData.userName}</p>
                      <p>拾物人电话:${this.detailData.phone}</p>`, '', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              callback: action => {
                console.log(11);    
             }
        })
         },
          dialogShow(){
            this.dia2Visible=true
            this.commentType=0
        },
        reply(val,id,fromId){
           this.commentType=1
           this.dia2Visible=true
           this.replyTo=val 
           this.replyField.comment_id=id
           this.replyField.replyuser_id=fromId
           this.replyField.replyuser_name=val
        },
        submitComment(){
            if(this.commentType==0){
                 this.clue.found_id=this.$route.query.id
                 this.$http.post('/api/clue/add',this.clue).then(res=>{
                     this.getComments()          
                 })
                 this.dia2Visible=false   
                 }else{
                      this.$http.post('/api/reply/add',this.replyField).then(res=>{
                          this.getComments()
                      })
                      this.dia2Visible=false
                 }
        },
        getComments(){
            this.clue.found_id=this.$route.query.id
             this.$http.get('api/clue',{params:{lost_id:'',found_id:this.clue.found_id}}).then(res=>{
                //  console.log(res.data);
                 this.commentList=res.data                   
                     for(var item of this.commentList){
                       let d=new Date(item.date)
                       item.date=d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0'+ (d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate() <10?'0'+d.getDate():d.getDate()) + ' ' + (d.getHours()<10?'0'+d.getHours():d.getHours()) + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());
                          }
                })
        }
    },
    filters: {
        phoneFormat(data){
            return data.slice(0,7)
        },
        dateFilter(date){
            let d=new Date(date)
            return d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0'+ (d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate() <10?'0'+d.getDate():d.getDate()) + ' ' + (d.getHours()<10?'0'+d.getHours():d.getHours()) + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());
        }
    },
     computed: {
        reverseComment(){
            return this.commentList.reverse()
        },
    },
    created () {
        this.getDetail(),
        this.getComments()
    }
}
</script>
<style scoped>
.main{
    width: 710px;
    max-height: 750px;
    border: 1px solid #5155f7;
    margin:10px 0 0 160px;
}
.jj-logo{
    width: 710px;
    height: 24px;
    border-bottom: 1px dashed  #5155f7
}

.jj-logo{
    display: inline-block;
}
.tv img{
    width:24px;
    vertical-align: middle;
}
.jj-logo span{
    color:#5155f7;
    margin-left: 4px;
    font-size: 14px;
    font-weight: bold;
    vertical-align: middle;
}
.col1{
    height: 45px;
}
.laba{
    display: inline-block;
    height: 45px;
}
.laba img{
    width:45px
}
.content .title{
    /* display: block; */
    font-size: 22px;
    height:45px;
    line-height: 45px;
    font-weight: bold;
    color: #5155f7
}
.content .first{
    border-bottom: 1px solid #5155f7;
    height: 45px;

}
.content .second{
    height: 40px;
}
.el-col-push-1 {
    left: 1.16667%;
}
.el-col-offset-1 {
    margin-left: -1.83333%;
}
.el-col-offset-1[data-v-373ee863] {
    margin-left: -4.83333%;
}
.kindName{
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
}
.col3{
    height: 40px;
}
.content .red{
    color: red;
    height: 30px;
    line-height: 30px;
    margin-top: 12px;
}
.imgSet{
    margin-top: 50px;
}
.col4{
    width: 68px;
    height: 250px;
}
.col4 > span{
    height: 250px;
    line-height: 250px;
}
.col5 img{
    width: 200px;
    height: 120px
}
.desc{
    width:474px;
    height: 320px;
    background-color:#F2FCEB;
}
.col5{
    margin-left: 10px;
}
.desc > span{
    display: inline-block;
    padding-left: 15px;
    padding-top: 10px;
}
.row5{
    margin-top:10px;
}
.row5 .btn{
    width: 100px;
    height: 50px;
    line-height: 50px;
    background-color: #00ff40;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold
}
.claim{
    color: red
}
.el-dialog__title{
    color: red
}
.commentStyle{
     width: 712px;
    margin:10px 0 0 160px;
}
.clue{
    font-family:'微软雅黑';
    font-weight: bold;
    display: block;
    padding-bottom: 10px;
}
.el-dialog__body{
    padding:15px 20px !important
}
.comment p:nth-child(1) span:nth-child(1),.reply p span:nth-child(1) {
    color:#0C73CC;
    font-size: 13px;
}
.reply p:nth-child(3) span{
    color:#999;
    font-size: 13px;
}
.comment p:nth-child(1) span:nth-child(1),.reply p:not(:nth-child(3)) span:nth-child(1){
    font-weight: bold;
}
.reply p:nth-child(3) span:nth-child(2),.comment p:nth-child(1) span{
    font-size: 13px;
}
.comment p:nth-child(2) span,.reply p span:nth-child(2){
    font-size: 13px;
}
.comment p:nth-child(2) span{
    color:#999;
    font-size: 13px;
}
.comment p:nth-child(2) span:nth-child(2),.reply p:nth-child(3) span:nth-child(2){
    display: block;
    float:right;
    cursor: pointer;
}
.onlyComment{
    border-bottom: 1px solid #d6d2d2;
}
.row5 .new{
    border-bottom: 1px solid #d6d2d2;
    padding-bottom: 15px;
    font-size: 15px;
}
.reply p:nth-child(2){
    background-color:#cbcbcf;
    width: 600px;
    min-height: 30px;
}
.reply{
      border-bottom: 1px solid #d6d2d2;
}
.reply p:nth-child(3),.comment p:nth-child(2){
    overflow: hidden;
}
.reply p:nth-child(2) span{
  position: relative;
  top: 3px;
}
</style>
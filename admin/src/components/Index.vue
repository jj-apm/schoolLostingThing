<template>
  <div class="content">
    <div class="page-cate-title">
      <span class="title-text">最新失物招领启事</span>
    </div>
    <div class="show">
      <div v-for="(item, index) in lostData" :key="'lost'+index" class="lost_content">
          <img v-if="item.lphoto" :src="item.lphoto"><img src="../assets/blank.png" v-else >
          <span @click="pushDetail(item.id)">{{item.name}}</span><br>
          <span>寻物启事:</span><br>
          <span>{{item.desc}}</span><br><span>{{item.date}}</span>
      </div> 
       <div v-for="(item1, index) in foundData" :key="'found'+index" class="lost_content">
          <img v-if="item1.fphoto" :src="item1.fphoto"><img src="../assets/blank.png" v-else >
          <span @click="pushDetail1(item1.id)">{{item1.name}}</span><br>
          <span>招领启事:</span><br>
          <span>{{item1.desc}}</span><br><span>{{item1.date}}</span>
      </div> 
    </div>
    <div class="secContent">
      <div class="left">
        <span class="publish">公告栏</span><br>
        <span>请大家遵守规范，不要随意发布假信息，请认真对待!多谢合作</span><br>
        <span>2019-03-12</span>
      </div>
      <div class="right">
        <span class="letter">感谢信</span>
        <div class="thanks" v-for="(item,idx) in thankData" :key="idx">
          <span>{{item.title}}</span><br>
          <span>发布人:{{item.user.username}}</span><span>{{item.date}}</span><br>
          <span>{{item.desc}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lostData:[],
      foundData:[],
      thankData:[]
    };
  },
  methods: {
    pushDetail(val){
       this.$router.push({path:'/lostDetail',query:{id:val}}) 
    },
    pushDetail1(val){
      this.$router.push({path:'/foundDetail',query:{id:val}}) 
    },
    //获取失物列表
    getLost(){
      this.$http.get('/api/lost/newest').then(res=>{
        console.log(res.data); 
        this.lostData=res.data
         for (var item of this.lostData) {
             if (item.desc.length > 20) {
                 item.desc = item.desc.slice(0, 20) + '...'
             }
         }
         return this.lostData
        // console.log(res.data);
        
      })
    },
    //获取拾取列表
    getFound(){
      this.$http.get('/api/found/newest').then(res=>{
        this.foundData=res.data
        for (var item of this.foundData) {
             if (item.desc.length > 20) {
                 item.desc = item.desc.slice(0, 20) + '...'
             }
         }
         return this.foundData
        // console.log(res.data);
      })
    },
    getThank(){
      this.$http.get('/api/thank/list2').then(res=>{
        // console.log(res.data);
        this.thankData=res.data
      })
    }
  },
   created() {
      this.getLost();
      this.getFound();
      this.getThank()
 },
}
</script>
<style scoped>
.content{
    width:970px;
    margin-top: 10px;
    margin-left:178px;
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
    margin-bottom: 15px;
    margin-top:20px;
    left:0;
}
.show{
  width:970px;
  margin-top: 60px;
}
.lost_content{
    width: 210px;
    border: 1px solid #c4bbbb;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 5px 5px;
    margin:10px 10px;
    background-color: #fff;
  }
.lost_content img{
  width:210px;
  height: 180px;
}
.lost_content span{
  display: inline-block;
  font-size: 13px;
  color: #333;
  margin:3px 0 ;
}
.lost_content span:nth-of-type(1){
  color:#333;
  font-size: 15px;
}
.lost_content span:nth-of-type(2){
  color:#000;
  font-weight: bold;
}
.lost_content span:nth-of-type(4){
  color:red;
  float:right;
}
.secContent{
  width:960px;
  height:600px;
  border:1px solid #c4bbbb;
  background-color: #fff;
  margin-top:20px;
  overflow: hidden;
}
.secContent .left{
  float: left;
  width: 450px;
  height: 600px;
}
.secContent .right{
  float:right;
  width:450px;
  height: 600px;
}
.right .letter,.left .publish{
  font-size: 30px;
  font-style: italic;
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  padding: 0 0 0 -20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.left .publish{
  margin-left:20px;
}
.right .letter::after,.left .publish::after{
  content: '-';
  border-bottom: 1px solid #c4bbbb;
  display: inline-block;
  width: 265px;
  line-height: 5px;
  margin-left: 10px;
}
.thanks{
  border-bottom: 1px solid #c4bbbb;
}
.thanks span{
  display: inline-block;
  margin: 6px 0;
  color: #333;
}
.thanks span:nth-of-type(2){
  margin-right:20px;
  color: #63cfa6;
}
.thanks span:not(:first-of-type){
  font-size: 13px;
}
.thanks span:last-of-type{
  margin-bottom: 20px;
}
.left{
  overflow: hidden;
}
.left span:nth-of-type(2){
  display: inline-block;
  font-size: 15px;
  color: #333;
  text-indent: 30px;
  margin-bottom: 10px;
}
.left span:nth-of-type(3){
  float: right;
  color: red;
}
</style>
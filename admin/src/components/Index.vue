<template>
  <div class="content">
    <div class="page-cate-title">
      <span class="title-text">最新失物招领启事</span>
    </div>
    <div class="show">
      <el-row class="first">
          <el-col :span="8" v-for="(item, index) in lostData" :key="index" @click.native="pushDetail(item.id)">
            <div class="lost_content">
              <img :src="item.lphoto" v-if="item.lphoto"><br>
              <span>{{item.name}}</span><br>
              <span>寻物启事:</span><br>
              <span>{{item.desc}}</span><br><span>{{item.date}}</span>
            </div>
      </el-col> 
    </el-row>
    <el-row class="second">
          <el-col :span="8" v-for="(item, index) in foundData" :key="index" @click.native="pushDetail1(item.id)">
            <div class="lost_content">
              <img :src="item.fphoto" v-if="item.fphoto"><br>
              <span>{{item.name}}</span><br>
              <span>招领启事:</span><br>
              <span>{{item.desc}}</span><br><span>{{item.date}}</span>
            </div>
      </el-col> 
    </el-row>
    </div>
  </div>
</template>
<script>
export default {
 created() {
   this.getLost();
   this.getFound();
 },
  data() {
    return {
      lostData:[],
      foundData:[]
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
        this.lostData=res.data
        console.log(res.data);
        
      })
    },
    //获取拾取列表
    getFound(){
      this.$http.get('/api/found/newest').then(res=>{
        this.foundData=res.data
        // console.log(res.data);
        
      })
    }
  }
}
</script>
<style scoped>
.content{
    width: 960px;
    /* height: 10px;  */
    margin-top: 10px;
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
.show{
  width: 960px;
  margin-top: 60px;
  position: relative;
  left: 185px;

}
.el-col-8 {
    width: 20%;
    height: 200px;
}
/* .elCard{
  width: 250px;
  height:200px;
} */
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }
  .lost_content{
    overflow: hidden;
    width: 160px;
    max-height: 300px;
    border: 1px solid #c4bbbb;
    cursor: pointer;
  }
.lost_content img{
  width:160px;
  height: 120px;
}
.lost_content span:nth-of-type(1){
  display: inline-block;
  width: 160px;
  font-size: 15px;
  border-bottom: 1px solid #c4bbbb;
}
.lost_content span:not(:first-of-type){
  font-size: 12px;
}
.lost_content span:not(:last-of-type){
  text-indent: 10px;
}

.lost_content span{
  display: inline-block;
  margin: 3px 0;
}
.lost_content span:nth-of-type(2){
  color: #000;
  font-weight: bold;
}
.lost_content span:nth-of-type(3){
  margin-left: 8px;
  text-indent: 2px;
}
.lost_content span:last-of-type{
  float: right;
  color: red;
  margin-bottom: 10px;
}
/* .second{
  margin-top: 45px;
} */
.first .el-col:nth-of-type(6){
  margin-top:50px;
}
.first .el-col:nth-of-type(10){
  margin-top:-50px;
}
/* .second .el-col:not(:first-of-type){
  margin-top:-15px;
} */
.first .el-col:nth-of-type(7){
  margin-top:40px;
}
.first .el-col:nth-of-type(8){
  margin-top:-20px;
}
.first .el-col:nth-of-type(9){
  margin-top:-30px;
}
.second .el-col:nth-of-type(1){
margin-top:-50px;
}
.second .el-col:nth-of-type(2){
margin-top:-70px;
}
.second .el-col:nth-of-type(3){
margin-top:-115px;
}
.second .el-col:nth-of-type(4){
  margin-top:-120px;
}
.second .el-col:nth-of-type(5){
  margin-top:-120px;
}
.second .el-col:nth-of-type(9){
  margin-top:-130px;
}
.second .el-col:nth-of-type(10){
  margin-top: -135px;
}
.second .el-col:nth-of-type(8){
    margin-top:-140px;
}
</style>
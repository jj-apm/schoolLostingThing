<template>
  <div class="content">
    <div class="page-cate-title">
      <span class="title-text">最新失物招领启事</span>
    </div>
    <div class="show">
      <el-row>
          <el-col :span="8" v-for="(item, index) in lostData.length" :key="index">
        <el-card :body-style="{ padding: '0px' }">
         <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
           <span>好吃的汉堡</span>
          <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
         </div>
        </div>
       </el-card>
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
      currentDate: new Date(),
      lostData:[],
      foundData:[]
    };
  },
  methods: {
    //获取失物列表
    getLost(){
      this.$http.get('/api/lost').then(res=>{
        this.lostData=res.data
        // console.log(res.data);
        
      })
    },
    //获取拾取列表
    getFound(){
      this.$http.get('/api/found').then(res=>{
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
  /* width:250px;
  height: 200px; */
  margin-top: 60px;

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

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
      clear:both
  }


</style>
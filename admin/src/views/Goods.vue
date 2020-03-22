<template>
  <div class="content">
    <div class="page-cate-title">
      <span class="title-text">最新失物招领启事</span>
    </div>
    <div class="show">
      <div v-for="(item, index) in goodsListData" :key="index" class="goods_content">
          <img :src="item.photo">
          <span>{{item.goods_name}}</span><br>
          <span>{{item.score}}积分</span><br>
          <span v-if="item.count>0">已兑换{{item.count}}件</span>
          <el-button ref="btn" type="primary" size="mini" @click="exchange(item.score,item.id,item.count)">我要兑换</el-button>
      </div> 
    </div>
 </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      goodsListData:[],
      isExchange:false,
    }
  },
  methods: {
     getUserInfo(){
         this.$http.get(`/api/user/userInfo/${this.$store.getters.user.result.id}`).then(res=>{
             this.score=res.data.score
         })
      },
    getGoodsList(){
      this.$http.get('/api/goods').then(res=>{
        this.goodsListData=res.data
        console.log(res.data);
      })
    },
    exchange(val1,val2,val3){
      if(this.score<val1){
        this.$message({
          type:'warning',
          message:'您的积分不够'
        })
      }else{
        this.$message({
          type:'success',
          message:'兑换成功,请到失物招领处领取！'
        })
        this.$http.post(`api/user/score/${this.$store.getters.user.result.id}`,{score:this.score-val1}).then(res=>{
                 }) 
        this.$http.post('/api/change/add',{username:this.$store.getters.user.result.username,goods_id:val2}).then(res=>{
          console.log(res.data);
        })
        this.$http.post(`/api/goods/count/${val2}`,{count:val3+1}).then(res=>{
          console.log(res.data); 
          this.getGoodsList() 
        })
      }
    }
  },
  mounted () {
    this.getUserInfo();
    this.getGoodsList()
  }
}
</script>
<style scoped>
.content{
    width: 1000px;
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
  width:auto;
  margin-top: 60px;
  position: relative;
  left: 185px;

}
  .goods_content{
    width: 300px;
    height: auto;
    border: 1px solid #c4bbbb;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 5px 5px;
    margin:10px 10px
  }
.goods_content img{
  width:300px;
  height: 250px;
}
.goods_content span{
  display: inline-block;
  font-size: 13px;
  color: #333;
  margin:5px 0 ;
}
.goods_content span:nth-of-type(1){
  font-size: 15px;
}
.goods_content span:nth-of-type(2){
  color:red
}
.el-button--primary{
    float:right
}
</style>
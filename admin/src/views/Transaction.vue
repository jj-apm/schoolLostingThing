<template>
  <div class="content">
    <div class="page-cate-title">
      <span class="title-text">最新失物招领启事</span>
    </div>
    <div class="show">
      <div v-for="(item, index) in transactionData" :key="index" class="trans_content">
          <img :src="(item.lphoto.split(','))[0]">
          <span>￥{{item.price}}</span><br>
          <span>{{item.desc}}</span><br>
          <span>{{item.userName}}</span><span>{{item.date}}</span>
      </div> 
    </div>
 </div>
</template>
<script>
export default {
 created() {
   this.getTransaction();
 },
  data() {
    return {
      transactionData:[],
    };
  },
  methods: {
    // pushDetail(val){
    //    this.$router.push({path:'/lostDetail',query:{id:val}}) 
    // },
    //获取失物列表
    getTransaction(){
      this.$http.get('/api/transaction',{params:{userId:'',currentPage:1,pageSize:20}}).then(res=>{
        this.transactionData=res.data.total
        console.log(res.data);
        // console.log(this.photoList);
        
        
      })
    },
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
  .trans_content{
    width: 300px;
    height: auto;
    border: 1px solid #c4bbbb;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 5px 5px;
    margin:10px 10px
  }
.trans_content img{
  width:300px;
  height: 250px;
}
.trans_content span{
  display: inline-block;
  font-size: 13px;
  color: #333;
  margin:5px 0 ;
}
.trans_content span:nth-of-type(1){
  color: red;
  font-size: 15px;
}
.trans_content span:nth-of-type(4){
  float:right;
  color:red
}
.trans_content span:nth-of-type(3){
  color:#000
}
</style>
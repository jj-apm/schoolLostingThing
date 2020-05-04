<template>
  <div class="content">
    <div class="page-cate-title">
      <span class="title-text">感谢信列表</span>
    </div>
    <div class="thank_content">
      <div class="thanks" v-for="(item,idx) in thankData" :key="idx">
        <span>{{item.title}}</span><br>
        <span>发布人:{{item.user.username}}</span><span>{{item.date}}</span><br>
        <span>{{item.desc}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from 'util'
export default{
    data(){
        return{
            thankData:[]
        }
    },
    methods: {
      getThank(){
        this.$http.get('/api/thank/list3').then(res=>{
          console.log(res.data);
          this.thankData=res.data
        })
       },
    },
    created () {
        this.getThank()
    }
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
.thank_content{
  width: inherit;
  height: auto;
  margin-top: 50px;
  border: 1px solid #838080;
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
.thanks span{
    margin-left: 10px;
}
</style>
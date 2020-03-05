<template>
  <div class="main">
      <div class="jj-logo">
          <a href="#" class="tv"><img src="../../../assets/tv.png"></a>
          <span>寻物启事</span>
      </div>
      <div class="content"> 
          <el-row class="first"><el-col :span="6" class="col1"><a href="#" class="laba"><img src="../../../assets/laba.png"></a></el-col>
          <el-col :span="8" :push="4"><span class="title">{{detailData.name}}</span></el-col></el-row>
          <el-row class="second"><el-col :span="4" :push="1" style="width:68px"><span class="kindName">物品种类:</span></el-col><el-col :span="4" :push="1" class="col5"><span class="kindName">{{detailData.kindName}}</span></el-col>
          <el-col :span="4" :push="13" class="col3"><h2 class="red">{{detailData.status}}...</h2></el-col></el-row>
          <el-row><el-col :span="4" :push="1" class="col4"><span>详细描述:</span></el-col><el-col :span="16" :push="1" class="col5">
              <div class="desc"><span>{{detailData.desc}}</span></div></el-col></el-row>
          <el-row class="row5" v-if="detailData.lphoto"><el-col :span="4" :push="1" style="width:68px" class="imgSet"><span>失物图片:</span></el-col><el-col :span="8" class="col5" :push="1"><img :src="detailData.lphoto"></el-col></el-row>
          <el-row class="row5"><el-col :span="4" :push="1" style="width:68px"><span>丢失地点:</span></el-col><el-col :span="8" class="col5" :push="1">{{detailData.place}}</el-col></el-row>
          <el-row class="row5"><el-col :span="4" :push="1" style="width:68px"><span>丢失时间:</span></el-col><el-col :span="8" class="col5" :push="1">{{detailData.date}}</el-col></el-row>
          <el-row class="row5"><el-col :span="4" :push="1" style="width:68px"><span>联系人:</span></el-col><el-col :span="8" class="col5" :push="1">{{detailData.userName}}</el-col></el-row>
          <el-row class="row5"><el-col :span="4" :push="1" style="width:68px"><span>手机号码:</span></el-col><el-col :span="8" class="col5" :push="1">{{(detailData.phone||'')|phoneFormat}}****</el-col></el-row>
          <el-row class="row5"><span class="clue">发表留言:</span></el-row>
          <el-row><div><el-input type="textarea" style="width:500px"></el-input></div></el-row>
      </div>
  </div>
</template>
<script>
import { log } from 'util'
export default{
    data(){
        return{
            id:'',
            detailData:''
        }
    },
    methods: {
        getDetail(){
            this.id=this.$route.query.id
            this.$http.get('/api/lostById',{params:{id:this.id}}).then(res=>{
                // console.log(res.data); 
                this.detailData=res.data         
            })
        }
    },
    filters: {
        phoneFormat(data){
            return data.slice(0,7)
        }
    },
    created () {
        this.getDetail()
    }
}
</script>
<style scoped>
.main{
    width: 712px;
    max-height: 687px;
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
.imgSet{
    margin-top: 50px;
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
.clue{
    font-family:'微软雅黑';
    font-weight: bold
}
</style>
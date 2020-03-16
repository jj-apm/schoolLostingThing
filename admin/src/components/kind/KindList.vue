<template>
  <div id="myChart">
  </div>
</template>
<script>
export default{
  data () {
    return {
      kindList:[0,0,0,0,0,0,0,0,0,0],
    }
  },
  methods: {
    getList(){
      this.$http.get('/api/kind').then(res=>{
        console.log(res.data);
        res.data.map(item=>{
          switch(item.name){
              case '数码':
                this.kindList[0]+=1;
                break;
              case '文具用品':
                this.kindList[1]+=1;
                break;
              case '钱包':
                this.kindList[2]+=1;
                break;
              case '证件':
                this.kindList[3]+=1;
                break;
              case '卡类':
                this.kindList[4]+=1;
                break;
              case '钥匙':
                this.kindList[5]+=1;
                break;
              case '衣物':
                this.kindList[6]+=1;
                break;
              case '手机':
                this.kindList[7]+=1;
                break;
              case '首饰/配饰':
                this.kindList[8]+=1;
                break;
              case '书本':
                this.kindList[9]+=1;
                break;     
          }
        })
        console.log(this.kindList);
        this.getEcharts()
        
      })
    },
    getEcharts(){
      //基于准备好的dom，初始化echarts实例
       let myChart = this.$echarts.init(document.getElementById('myChart'));
       // 绘制图表
       myChart.setOption({
           title: {
               text: ''
           },
           tooltip: {},
           xAxis: {
               data: ['数码', '文具用品', '钱包', '证件', '卡类', '钥匙','衣物','手机','首饰/配饰','书本']
           },
           yAxis: {},
           series: [{
               name: '销量',
               type: 'bar',
               data: this.kindList
           }]
         })
    }
  },
  created () {
  this.getList()
},
mounted(){
    this.getEcharts()
}
}
</script>
<style scoped>
#myChart{
  width: 100%;
  height: 600px;
  margin-top: -25px;
}
</style>
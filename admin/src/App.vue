<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div> 
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
    name:'login',
    provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods:{
        isEmpty(value){
            return (
                value === undefined ||
                value === null ||
                (typeof value === 'object' && Object.keys(value).length===0) ||
                (typeof value === 'string' && value.trim().length===0)
            );
        },
       reload () {
          this.isRouterAlive = false
          this.$nextTick(function () {
            this.isRouterAlive = true
            })
       }
    },
    created(){
      if(localStorage.eleToken){
        const decode = jwt_decode(localStorage.eleToken)
        //token存储到VueX中
        this.$store.dispatch("setAuthenticated",!this.isEmpty(decode))
        this.$store.dispatch("setUser",decode)
      }
    }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0
}
</style>

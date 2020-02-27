<template>
  <div>
      123
  </div>
</template>
<script>
import { log } from 'util'
export default{
    data(){
        return{
            id:''
        }
    },
    created () {
        this.getDetail()
    },
    methods: {
        getDetail(){
            this.id=this.$route.query.id
            this.$http.get('/api/lost/id').then(res=>{
                console.log(res.data);          
            })
        }
    }
}
</script>
<style scoped>
</style>
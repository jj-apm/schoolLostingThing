<template>
  <div>
    <div class="content">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="寻物启事" name="first">
          <LostTable></LostTable>
        </el-tab-pane>
        <el-tab-pane label="招领启事" name="second">
          <FoundTable></FoundTable>
          </el-tab-pane>
        <el-tab-pane label="写感谢信" name="third">
          <Thank></Thank>
          </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import LostTable from './lost/index'
import FoundTable from './found/index'
import Thank from './thank/Thank.vue'
export default{
  data () {
    return {
      activeName:'first'
    }
  },
  components: {
    LostTable,
    FoundTable,
    Thank
  }
}
</script>
<style scoped>
.content{
  width: 960px;
  margin-top:15px;
  background-color: #fff;
  position: relative;
  left: 181px;
}
</style>
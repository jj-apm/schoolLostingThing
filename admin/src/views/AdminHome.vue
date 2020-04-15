<template>
<div class="index">
  <HeadNav></HeadNav>
  <LeftMenu></LeftMenu>
  <div class="rightContainer">
    <router-view></router-view>
  </div>
</div>
</template>
<script>
import HeadNav from './HeadNav'
import LeftMenu from '../components/LeftMenu'
  export default {
    data() {
      return {
      }
    },
    components: {
      HeadNav,
      LeftMenu
    }
  };
</script>

<style scoped>
.rightContainer{
  position: relative;
  top:0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
  .index{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
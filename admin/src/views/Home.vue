<template>
    <div class="home">
        <div class="container">
          <router-link to='/register'>注册</router-link>
          <router-link to='/login'>登录</router-link>
        </div>
    </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
.home {
  width: 100%;
  height: 100vh;
  background: url(../assets/bg.jpg) no-repeat;
  background-size: 100% 100%;
}
.container a {
  display: inline-block;
  right: 10px;
  top: 20px;

}

</style>
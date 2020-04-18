<template>
  <div class="home">
    <div class="container">
      <el-container>
        <HeaderNav></HeaderNav>
        <el-menu class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/lost">寻物启事</el-menu-item>
          <el-menu-item index="/found">招领启事</el-menu-item>
          <el-menu-item index="/publish">发布信息</el-menu-item>
          <el-menu-item index="/goods">积分商城</el-menu-item>
        </el-menu>
        <el-main>
          <section class="sec1">
            <img src="../assets/post1.jpeg" alt />
          </section>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <div class="footer">
            <div class="wrapper clearfix">
              <div class="footer-info link">
                <h3>友情链接</h3>
                <p>
                  <a href="http://gaz.xunwuzhaoling.com/" target="_blank">中国失物招领网</a>
                </p>
              </div>
              <div class="footer-info about">
                <h3>关于我们</h3>
                <div class="info">
                  <p>
                    <a href="#" target="_blank">平台介绍</a>
                    <a href="#" target="_blank">服务条款</a>
                    <a href="#" target="_blank">隐私权条款</a>
                  </p>
                </div>
              </div>
              <div class="footer-info contact">
                <h3>联系我们</h3>
                <div class="info">
                  <span class="tel">13570381290</span>
                  <span class="tel">13533319825</span>
                </div>
              </div>
            </div>
            <div class="copyright">
              <div class="wrapper">版权所有 盗版必究</div>
            </div>
          </div>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../components/HeaderNav";
export default {
  components: {
    HeaderNav
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.home {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}
.el-footer {
  color: #333;
  margin-top: 20px;
  height:0 !important;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: auto;
  padding: 12px;
  overflow: hidden;
  padding-bottom: 30px;
  margin-top: 0px;
}
body > .el-container {
  margin-bottom: 40px;
}
.sec1 {
  width: 100%;
  height: 163px;
  text-align: center;
}
.sec1 img {
  width: 960px;
  height: inherit;
  text-align: center;
}
.el-menu{
  left:15%
}
.el-menu-item {
  font-size: 20px;
}
.el-menu--horizontal > .el-menu-item {
  height: 50px;
  line-height: 50px;
  margin: 0 50px 0 50px;
}
.footer {
  background: #fff;
  padding-top: 20px;
}
.footer .footer-info {
  float: left;
  margin-right: 32px;
  padding-bottom: 40px;
}
.footer .footer-info h3 {
  color: #7c7c7c;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
  padding-bottom: 20px;
  border-bottom: solid 1px #dddddd;
}
.footer .footer-info .info {
  padding: 15px 0;
}
.footer .link {
  width: 300px;
}
.footer .link p {
  margin-bottom: 10px;
  margin-top: 15px;
}
.footer .about {
  width: 300px;
}
.footer .about a {
  padding: 0 6px 0 0;
}
.footer .contact {
  width: 500px;
}
.footer .contact a {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-right: 10px;
}
.footer .contact span.tel {
  display: inline-block;
  vertical-align: top;
  width: 110px;
  padding-left: 35px;
  line-height: 30px;
  color: #fff;
  height: 30px;
  background: url(http://xiandean.com/graduation/common/templates/images/icon_tel.jpg);
  margin-left: 10px;
}
.footer .copyright {
  padding: 20px 0;
  text-align: center;
  color: #aaaaaa;
}
.wrapper {
    width: 1200px;
    margin: 0 auto;
    position: relative;
}
.clearfix {
    zoom: 1;
}
a{
  text-decoration: none;
  color:#666;
  font-size: 12px;
}
</style>
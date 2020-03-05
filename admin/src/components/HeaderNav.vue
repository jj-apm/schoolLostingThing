<template>
<el-header>
  <div class="head">
    <p class="title">欢迎来到校园失物招领网</p>
    <p class="name">{{user.result.username}}
        <el-dropdown trigger="click" @command="setDialogInfo">
          <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="history">发布历史</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </p>
   </div> 
</el-header>
</template>
<script>
export default{
    methods: {
        setDialogInfo(cmdItem){
            switch(cmdItem){
                case "info":
                    this.showIndoList();
                    break;
                case "history":
                    this.history();
                    break; 
                case "logout":
                    this.logout();
                    break;    
            }
        },
        showIndoList(){
          this.$router.push('/infoshow')
        },
        logout(){
            //清除token
            localStorage.removeItem('eleToken')
            this.$store.dispatch('clearCurrentState')
            this.$router.push('/login')
        },
        history(){
            this.$router.push('/history')
        }
    },
    computed: {
        user(){
            return this.$store.getters.user
        }
    }
}
</script>
<style>
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 30px !important;
    line-height: 30px;
}
.head{
    display: flex;
    width:100%;
    height:30px;
    justify-content: space-between;
}   
.head .title, .head .name{
    vertical-align: middle;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    letter-spacing: 1px;
    height:30px;
    line-height: 30px;
    margin-top: 0px;
}
.head .name{
    margin-right: 10px;
    font-size: 18px;
}
</style>
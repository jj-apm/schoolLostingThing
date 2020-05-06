<template>
    <div class="fillContainer">
         <el-table
            v-if="userListData.length > 0"
            :data="userListData"
            border
            class="user_list"
            >
            <el-table-column
                type='index'
                label="编号"
                align='center'
                width="70">
                </el-table-column>
                <el-table-column
                prop='username'
                label="姓名"
                align='center'
                width="150">
                </el-table-column>
                <el-table-column
                prop='stu_num'
                label="学号"
                align='center'
                width="150">
                </el-table-column>
                <el-table-column
                prop='phone'
                label="手机号码"
                align='center'
                width="180">
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button
                        size="small"
                        icon='delete'
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
    </div>   
</template>
<script>
export default{
    data(){
        return{
            userListData:[],
            
        }
    },
    methods:{
        getUserList(){
            this.$http.get('/api/userList').then(res=>{
                // console.log(res.data);
                this.userListData=res.data
            })
        }
    },
    created(){
        this.getUserList()
    }
}
</script>
<style scoped>
.fillContainer{
    width: 100%;
    height: 100%;
    padding: 16px;
}
.fillContainer>>>.user_list{
   width: 701px !important;
   margin-top:0px !important;
   margin-left:0px !important;

}
</style>
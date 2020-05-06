<template>
    <div class="fillContainer">
         <el-table
            v-if="changeListData.length > 0"
            :data="changeListData"
            border
            class="change_list"
            >
            <el-table-column
                type='index'
                label="编号"
                align='center'
                width="70">
                </el-table-column>
                <el-table-column
                prop='user.username'
                label="姓名"
                align='center'
                width="150">
                </el-table-column>
                <el-table-column
                prop='goods_id'
                label="兑换物品编号"
                align='center'
                width="180">
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button
                        type='warning'
                        icon='edit'
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            changeListData:[],
        }
    },
    methods:{
        getThankList(){
            this.$http.get('/api/change').then(res=>{
                // console.log(res.data);
                this.changeListData=res.data
            })
        }
    },
    created(){
        this.getThankList()
    }
}
</script>
<style scoped>
.fillContainer{
    width: 100%;
    height: 100%;
    padding: 16px;
    /* box-sizing: border-box */
}
.fillContainer>>>.change_list{
   width: 552px !important;
   margin-top:0px !important;
   margin-left:0px !important;
}
</style>
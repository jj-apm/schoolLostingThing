<template>
    <div class="fillContainer">
         <el-table
            v-if="claimListData.length > 0"
            :data="claimListData"
            border
            class="claim_table"
            >
            <el-table-column
                type='index'
                label="编号"
                align='center'
                width="70">
                </el-table-column>
                <el-table-column
                prop='name'
                label="姓名"
                align='center'
                width="150">
                </el-table-column>
                <el-table-column
                prop='found_id'
                label="拾物编号"
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
            claimListData:[],
        }
    },
    methods:{
        getThankList(){
            this.$http.get('/api/claim').then(res=>{
                // console.log(res.data);
                this.claimListData=res.data
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
.fillContainer>>>.claim_table{
   width: 552px !important;
   margin-top:0px !important;
   margin-left:0px !important;
}
</style>
<template>
    <div class="fillContainer">
         <el-table
            v-if="thankListData.length > 0"
            :data="thankListData"
            border
            >
            <el-table-column
                prop='id'
                label="编号"
                align='center'
                width="70">
                </el-table-column>
                <el-table-column
                prop='user.username'
                label="姓名"
                align='center'
                width="90">
                </el-table-column>
                <el-table-column
                prop='title'
                label="标题"
                align='center'
                width="150">
                </el-table-column>
                <el-table-column
                prop='desc'
                label="感谢内容"
                align='center'
                width="180">
                </el-table-column>
                 <el-table-column
                prop='status'
                label="状态"
                align='center'
                width="80">
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button
                        type='warning'
                        icon='edit'
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">审核</el-button>
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
            thankListData:[],
            
        }
    },
    methods:{
        getThankList(){
            this.$http.get('/api/thank/list').then(res=>{
                console.log(res.data);
                this.thankListData=res.data
            })
        },
        handleEdit(index,row){
           this.$http.post(`/api/thank/status/${row.id}`,{status:1}).then(res=>{
               this.$message({
                   type:'success',
                   message:'通过审核'
               })  
               this.getThankList()
           })          
        },
        handleDelete(index,row){
            this.$http.post(`/api/thank/delete/${row.id}`,{value:false}).then(res=>{
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.getThankList()
            })
        }
    },
    created(){
        this.getThankList()
    }
}
</script>
<style>
.el-table{
   width: 721px !important;
   margin-top:0px !important;
   margin-left:0px !important;
}
.fillContainer{
    width: 100%;
    height: 100%;
    padding: 16px;
    /* box-sizing: border-box */
}
</style>
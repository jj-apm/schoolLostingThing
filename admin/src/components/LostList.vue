<template>
    <div class="fillContainer">
         <el-table
            v-if="lostListData.length > 0"
            :data="lostListData"
            border
            >
            <el-table-column
                type='index'
                label="编号"
                align='center'
                width="70">
                </el-table-column>
                <el-table-column
                prop='userName'
                label="姓名"
                align='center'
                width="90">
                </el-table-column>
                <el-table-column
                prop='name'
                label="失物名称"
                align='center'
                width="150">
                </el-table-column>
                <el-table-column
                prop='desc'
                label="失物描述"
                align='center'
                max-width="150">
                </el-table-column>
                 <el-table-column
                prop='place'
                label="失物地点"
                align='center'
                width="150">
                </el-table-column> <el-table-column
                prop='creatTime'
                label="失物发布时间"
                align='center'
                width="180">
                </el-table-column>

                <el-table-column label="操作" align="center" width="120">
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
            lostListData:[],    
        }
    },
    methods:{
        getUserList(){
            this.$http.get('/api/lost/lostList').then(res=>{
                console.log(res.data);
                this.lostListData=res.data.total
                 for(var item of this.lostListData){
                let d=new Date(item.creatTime)
                item.creatTime=d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0'+ (d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate() <10?'0'+d.getDate():d.getDate()) + ' ' + (d.getHours()<10?'0'+d.getHours():d.getHours()) + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());
            }
            })
        },
        handleDelete(idx,row){
            // console.log(row);
            this.$http.post(`/api/lost/delete/${row.id}`,{value:false}).then(res=>{
                this.getUserList()
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
    box-sizing: border-box
}
.el-table{
   width: 930px !important;
   margin-top:0px !important;
   margin-left:0px !important;
   font-size: 15px;
}
</style>
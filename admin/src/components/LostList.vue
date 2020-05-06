<template>
    <div class="fillContainer">
        <el-button type="primary" class="add" @click="add">添加</el-button>
         <el-table
            v-if="lostListData.length > 0"
            :data="lostListData"
            border
            class="admin_lost"
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
            <el-dialog
               :visible.sync="diaVisible"
               width="50%">
               <LostTable @add="closeDia"></LostTable>
            </el-dialog>
    </div>   
</template>
<script>
import LostTable from './lost/index'
export default{
    data(){
        return{
            lostListData:[],
            diaVisible:false    
        }
    },
    methods:{
        getUserList(){
            this.$http.get('/api/lost/lostList').then(res=>{
                console.log(res.data);
                this.lostListData=res.data.total
                 for(var item of this.lostListData){
                    let d=new Date(item.creatTime)
                    item.creatTime=d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0'+ (d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate() <10?'0'+d.getDate():d.getDate());
                  }
            })
        },
        handleDelete(idx,row){
            // console.log(row);
            this.$http.post(`/api/lost/delete/${row.id}`,{value:false}).then(res=>{
                this.getUserList()
            })     
        },
        add(){
            this.diaVisible=true
        },
        closeDia(){
            this.diaVisible=false
            this.getUserList()
        }
    },
    created(){
        this.getUserList()
    },
    components: {
        LostTable
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
.fillContainer>>>.admin_lost{
   width: 910px !important;
   margin-top:0px !important;
   margin-left:0px !important;
   font-size: 15px;
}
.add{
    margin-bottom: 10px;
}
</style>
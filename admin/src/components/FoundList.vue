<template>
    <div class="fillContainer">
         <el-table
            v-if="foundListData.length > 0"
            :data="foundListData"
            border
            style="width: 100%">
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
                width="150">
                </el-table-column>
                <el-table-column
                prop='name'
                label="拾物名称"
                align='center'
                width="150">
                </el-table-column>
                <el-table-column
                prop='desc'
                label="拾物描述"
                align='center'
                max-width="150">
                </el-table-column>
                 <el-table-column
                prop='place'
                label="拾物地点"
                align='center'
                width="180">
                </el-table-column> <el-table-column
                prop='creatTime'
                label="拾物发布时间"
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
            foundListData:[],    
        }
    },
    methods:{
        getFoundList(){
            this.$http.get('/api/found/foundList').then(res=>{
                console.log(res.data);
                this.foundListData=res.data.total
                 for(var item of this.foundListData){
                let d=new Date(item.creatTime)
                item.creatTime=d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0'+ (d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate() <10?'0'+d.getDate():d.getDate()) + ' ' + (d.getHours()<10?'0'+d.getHours():d.getHours()) + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());
            }
            })
        }
    },
    created(){
        this.getFoundList()
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
   width: 1030px !important;
   margin-top:0px !important;
   margin-left:0px !important;
}
</style>
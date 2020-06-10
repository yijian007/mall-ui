<template>
  <el-dialog
    :title="!categoryData.catId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="categoryData" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="菜单名称" prop="paramKey">
        <el-input v-model="categoryData.name" placeholder="菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="paramKey">
        <el-input v-model="categoryData.productUnit" placeholder="计量单位"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="paramKey">
        <el-input v-model="categoryData.icon" placeholder="菜单图标"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="categoryDataSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import http from '../../../utils/public'
  export default{
    data(){
      return {
        visible: false,
        nodeData:{
          catId:0,
          catLevel:0
        },
        categoryData:{
          catId:null,
          name:'',
          parentCid:0,
          catLevel:0,
          showStatus:1,
          productUnit:0,
          icon:null
        },

      }
    },

    methods:{
      init (node,data) {
        if(data){
          this.categoryData.catId = data.catId || 0
          this.categoryData = data
        }
        this.visible = true
        this.nodeData.catId = node.data.catId
        this.nodeData.catLevel = node.data.catLevel*1+1
      },
      categoryDataSubmit(){
        let url = this.$http.adornUrl(`/product/category/${!this.categoryData.catId ? 'save' : 'update'}`);
        //新增
        if(!this.categoryData.catId){
          this.categoryData.parentCid = this.nodeData.catId;
          this.categoryData.catLevel = this.nodeData.catLevel;
          http.requestPost(url,this.categoryData).then(res =>{
            if(res && res.data.code === 0){
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }else{
          //修改
          http.requestPost(url,this.categoryData).then(res =>{
            if(res && res.data.code === 0){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }
      }
    }
  }

</script>

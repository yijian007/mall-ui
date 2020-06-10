<template>
  <div>
    <el-button type="danger">批量删除</el-button>
    <el-tree
      :data="menus"
      show-checkbox
      :props="defaultProps"
      ref="tree"
      node-key="id"
      draggable
      :default-expanded-keys="expandedKeys"
      highlight-current
      :expand-on-click-node="false"
      @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
          <span>
            <el-button v-if="node.level<=2"
              type="text"
              size="mini"
              @click="() => appendOrEdit(node,null)">
              添加
            </el-button>
            <el-button
             type="text"
             size="mini"
             @click="() => appendOrEdit(node,data)">
              编辑
            </el-button>
            <el-button v-if="node.childNodes.length==0"
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              删除
            </el-button>
          </span>
        </span>

    </el-tree>

    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getMenus"></add-or-update>
  </div>
</template>

<script>
  import http from '../../../utils/public'
  import AddOrUpdate from './category-add-or-update'
  export default {
    data() {
      return {
        menus: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        addOrUpdateVisible: false,
        expandedKeys:[]
      }
    },
    components: {
      AddOrUpdate
    },
    created(){
      this.getMenus();
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      getMenus(){
        let url = this.$http.adornUrl('/product/category/list');
        http.requestQuickGet(url).then((data)=>{
          if(data && data.data.code === 0){
            this.menus = data.data.list;
          }
        });
      },
      appendOrEdit(node,data){
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(node,data)
        })
      },
      remove(node,data){
        this.$confirm(`是否删除菜单【${node.data.name}】?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.$http.adornUrl('/product/category/delete');
          let catIds = [];
          node.parent.childNodes.forEach(category =>{
            if(category.checked){
              catIds.push(category.data.catId);
            }
          })
          http.requestPost(url,catIds).then((res)=>{
            if(res && res.data.code === 0){
              this.getMenus();
              this.expandedKeys.push(node.parent.id);
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
          })
        }).catch(() => {

        });

      }
    }
  };
</script>

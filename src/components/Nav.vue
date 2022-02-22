<template>
  <div class="nav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="分数详情" name="Mark"></el-tab-pane>
      <el-tab-pane label="预约管理" name="Appointment"></el-tab-pane>
      <el-tab-pane label="已报名" name="registered"></el-tab-pane>
      <el-tab-pane label="签到管理" name="Signed"></el-tab-pane>
    </el-tabs>
    <div class="usericon">
      <Userinfo></Userinfo>
    </div>
    
  </div>
  
</template>

<script>
import { ref, getCurrentInstance, onMounted, watch } from 'vue'
import Userinfo from './Userinfo.vue'
export default {
  name: 'Nav',
  // props: {
  //   msg: String
  // },
  props:{
      routejump: {
          type: String,
          default: ''
      }
  },
  components: {
    Userinfo
  },
  setup(props, context){
    const {proxy} = getCurrentInstance();
    const activeName = ref('registered')
    const handleClick = (tab, event) => {
      // 子组件向父组件传递参数       
      context.emit('listen', activeName._value )
    }

    watch(props, (newval, oldval) => {
      activeName.value = props.routejump.slice(1)
    })

    return {
      activeName,
      handleClick
    }
  }
}
</script>

<style lang="" scoped>
  .nav{
    position: relative;
  }
  .usericon{
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 10px;
  }
</style>

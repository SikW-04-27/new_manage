import { ElMessage } from 'element-plus'
export default (type, message)=>{
    ElMessage({
        message,
        type
      })
}
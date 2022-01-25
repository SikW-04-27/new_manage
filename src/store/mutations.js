export default {
    // 测试
    test(state, {data}){

    },

    // 更新vuex数据
    _updata(state, {data}){
        const key = data.key;
        const value = data.value;
        state[key] = value;
    }
}
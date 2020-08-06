import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:0,
    title:"悦读",
    ticket:1,//页面刚加载进去默认type_id为1(一进去就点击page)
    user:null,
    mark:null, //评论的token
    length:0 //评论内容的长度(控制暂无评论和显示评论列表)

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

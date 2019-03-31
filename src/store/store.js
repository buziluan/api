import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import mutations from "./mutations"
export default new Vuex.Store({
    state: {
        projectList: [], //项目集合
        project: null, //新增的项目
        toPro: false, //是否进入项目
        module:[],//项目模块集合
    },
    mutations,
    actions: {

    }
})
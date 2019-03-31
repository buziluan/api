/*
 * @Description: Mutation方法
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-04 14:49:21
 * @LastEditTime: 2019-03-31 21:44:16
 */
import {
    UPDATE_PROJECTLIST,
    ADD_PROJECT,
    DELETE_PROJECT,
    UPDATE_TOPRO,
    UPDATE_MODULES
} from './mutation-types'
export default {

    /**
     * @description: 修改（获取）项目列表
     */
    [UPDATE_PROJECTLIST](state, payload) {
        state.projectList = payload.projectList
    },

    /**
     * @description:添加新的项目到列表
     */
    [ADD_PROJECT](state, payload) {
        state.projectList.unshift(payload.project)
    },

    /**
     * @description:删除项目
     */
    [DELETE_PROJECT](state, index) {
        state.projectList.splice(index, 1)
    },

    /**
     * @description:修改是否进入项目的状态
     */
    [UPDATE_TOPRO](state, is) {
        state.toPro = is
    },

    /**
     * @description:获取（修改）modules
     */
    [UPDATE_MODULES](state, payload) {
        state.module = payload.module
    }

}
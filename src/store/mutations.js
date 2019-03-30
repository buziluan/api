/*
 * @Description: Mutation方法
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-04 14:49:21
 * @LastEditTime: 2019-03-30 22:59:58
 */
import {
    UPDATE_PROJECTLIST,
    ADD_PROJECT,
    DELETE_PROJECT
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
    }


}
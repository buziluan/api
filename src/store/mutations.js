/*
 * @Description: Mutation方法
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-04 14:49:21
 * @LastEditTime: 2019-04-08 23:56:26
 */
import {
    UPDATE_PROJECTLIST,
    ADD_PROJECT,
    DELETE_PROJECT,
    UPDATE_TOPRO,
    UPDATE_MODULES,
    ADD_MODULE,
    EMPTY_MODULE,
    UPDATE_ONEMODULE,
    ADD_API,
    DELETE_API,
    UPDATE_API
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
    },

    /**
     * @description:清空modules
     */
    [EMPTY_MODULE](state) {
        state.module = []
    },

    /**
     * @description:添加modules
     */
    [ADD_MODULE](state, module) {
        state.module.push(module)
    },

    /**
     * @description: 修改模块属性
     * @param {type} 
     * @return: 
     */
    [UPDATE_ONEMODULE](state, payload) {
        state.module = state.module.map(item => {
            if (item.moduleId == payload.moduleId) {
                item = payload
            }
            return item
        });
    },
    /**
     * @description: 添加api
     * @param {type} 
     * @return: 
     */
    [ADD_API](state, payload) {
        state.module.forEach(item => {
            if (item.moduleId == payload.moduleId) {
                item.apiList.push(payload.api)
            }
        });
    },

    /**
     * @description: 删除api
     * @param {type} 
     * @return: 
     */
    [DELETE_API](state, payload) {
        state.module.forEach(item => {
            if (item.moduleId == payload.moduleId) {
                item.apiList.forEach((el, i) => {
                    if (el.apiId == payload.apiId) {
                        item.apiList.splice(i, 1)
                    }
                });
            }
        });
    },

    /**
     * @description: 修改api
     * @param {type} 
     * @return: 
     */
    [UPDATE_API](state, payload) {
        state.module = state.module.map(item => {
            if (item.moduleId == payload.moduleId) {
                item.apiList.map(el => {
                    if (el.apiId == payload.apiId) {
                        el = payload.api
                    }
                    return el
                });
            }
            return item
        });
    }
}
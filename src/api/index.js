/*
 * @Description: api内容
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-30 15:28:59
 * @LastEditTime: 2019-05-09 14:33:54
 */
const host = 'https://www.fangxu.vip/epdq';

import {
    withAxios
} from "../utils/utils";

/**
 * @description: 登录接口
 * @param {type} 
 * @return: 
 */
const Login = (data, type, config) => withAxios(host + '/login', data, type, config)

/**
 * @description: 获取列表接口
 * @param {type} 
 * @return: 
 */
const getProList = (data, type, config) => withAxios(host + '/projects', data, type, config)

/**
 * @description: 创建一个新的项目
 * @param {type} 
 * @return: 
 */
const addPro = (data, type, config) => withAxios(host + '/project', data, type, config)

/**
 * @description: 操作项目（查看，删除）
 * @param {type} 
 * @return: 
 */
const handlePro = (id, type, config) => withAxios(host + '/project/' + id, {}, type, config)

/**
 * @description: 添加模块
 * @param {type} 
 * @return: 
 */
const addModule = (projectId, data, type, config) => withAxios(host + '/project/' + projectId + '/module', data, type, config)

/**
 * @description: 操作模块（编辑删除）
 * @param {type} 
 * @return: 
 */
const handleModule = (projectId, moduleId, data, type, config) => withAxios(host + `/project/${projectId}/module/${moduleId}`, data, type, config)

/**
 * @description: 添加接口
 * @param {type} 
 * @return: 
 */
const addApi = (projectId, moduleId, data, type, config) => withAxios(host + `/project/${projectId}/module/${moduleId}/api`, data, type, config)

/**
 * @description: 操作接口
 * @param {type} 
 * @return: 
 */
const handleApi = (projectId, moduleId,apiId, data, type, config) => withAxios(host + `/project/${projectId}/module/${moduleId}/api/${apiId}`, data, type, config)

export {
    Login,
    getProList,
    addPro,
    handlePro,
    addModule,
    handleModule,
    addApi,
    handleApi
}
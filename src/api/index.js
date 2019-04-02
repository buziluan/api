/*
 * @Description: api内容
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-30 15:28:59
 * @LastEditTime: 2019-04-02 23:02:19
 */
const host = 'http://59.110.138.185/epdq';

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

export {
    Login,
    getProList,
    addPro,
    handlePro,
    addModule,
    handleModule
}
/*
 * @Description: api内容
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-30 15:28:59
 * @LastEditTime: 2019-03-31 00:02:22
 */
const host = 'http://127.0.0.1:8081/epdq';

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

export {
    Login,
    getProList,
    addPro,
    handlePro
}
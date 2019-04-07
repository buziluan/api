/*
 * @Description: 公共方法
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-23 19:43:35
 * @LastEditTime: 2019-04-07 21:10:56
 */
import Vue from "vue";

/**
 * @description: json格式化
 * @param {type} 
 * @return: 
 */
export const syntaxHighlight = (json) => {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 4);
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?)/g,
        function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        }
    );
}

/**
 *
 * @param {*} url:请求的url路径（接口路径）
 * @param {*} data:请求参数（可以为空）
 * @param {*} type:请求类型（可以为空，默认为GET，有GET和POST可选）
 * @param {*} config:其他配置项（可设置请求头，请求超时时间等）
 */
export const withAxios = async (
    url = "",
    data = {},
    type = "get",
    config = {}
) => {
    type = type.toUpperCase();
    if (type == "GET") {
        return Vue.prototype.$axios.get(url, {
            params: data,
            ...config
        });
    } else if (type == "POST") {

        return Vue.prototype.$axios.post(url, data, config);

    } else if (type == "DELETE") {

        return Vue.prototype.$axios.delete(url, data, config);
    } else if (type == "PUT") {

        return Vue.prototype.$axios.put(url, data, config);
    }
};

/**
 * @description: 参数列表删除方法
 * @param {type} 
 * @return: 
 */
export const deleteDataItem = (data, id) => {
    let temp = data
    temp.forEach((item, index) => {
        if (item.id === id) {
            temp.splice(index, 1)
        } else if (item.property.length > 0) {
            deleteDataItem(item.property, id)
        }
    });

    return temp
}

/**
 * @description: 将参数列表格式化成一个对象。
 * @param {type} 
 * @return: 
 */
export const paramToObject = (data) => {
    let resultObj = {}
    data.forEach(item => {
        if (item.cate == 'String') {
            resultObj[item.name] = item.default ? item.default : ''
        } else if (item.cate == 'Array') {
            resultObj[item.name] = item.default ? item.default : []
        } else if (item.cate == 'Number') {
            resultObj[item.name] = item.default ? Number(item.default) : 0
        } else if (item.cate == 'Object') {
            resultObj[item.name] = paramToObject(item.property)
        }
    })
    return resultObj
}
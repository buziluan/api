<!--
 * @Description: 修改接口
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-04-02 18:14:03
 * @LastEditTime: 2019-04-07 23:11:21
 -->
<template>
    <div class="add-content">
        <i-form label-position="top">
            <row :gutter="20">
                <i-col span="12">
                    <form-item label="接口名称" class="formitem">
                        <i-input v-model="data.apiName" />
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="接口描述" class="formitem">
                        <i-input v-model="data.description" />
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="接口路径" class="formitem">
                        <i-input v-model="data.uri"></i-input>
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="请求方法" class="formitem">
                        <i-select v-model="data.method">
                            <i-option value="GET">GET</i-option>
                            <i-option value="POST">POST</i-option>
                            <i-option value="PUT">PUT</i-option>
                            <i-option value="DELETE">DELETE</i-option>
                        </i-select>
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="所属模块" class="formitem">
                        <i-select v-model="data.moduleId">
                            <i-option
                                :value="item.moduleId"
                                v-for="(item, index) in moduleList"
                                :key="index"
                                >{{ item.moduleName }}</i-option
                            >
                        </i-select>
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="Content-Type" class="formitem">
                        <i-select v-model="data.contentType">
                            <i-option value="application/x-www-form-urlencoded"
                                >application/x-www-form-urlencoded</i-option
                            >
                            <i-option value="multipart/form-data"
                                >multipart/form-data</i-option
                            >
                            <i-option value="application/json"
                                >application/json</i-option
                            >
                        </i-select>
                    </form-item>
                </i-col>
                <i-col span="24">
                    <collapse style="margin-bottom:20px;" v-model="temp1">
                        <panel name="1">
                            请求参数
                            <div slot="content" class="request-param">
                                <i-button
                                    icon="md-add"
                                    @click="handleClickAddParam"
                                    >新增</i-button
                                >
                                <tree-input
                                    :data="item"
                                    v-for="(item, index) in JSON.parse(data.requestParam)"
                                    :key="index"
                                    @on-delete="handleClickDelete"
                                />
                                <pre v-html="requireFormData" />
                            </div>
                        </panel>
                    </collapse>
                </i-col>
                <i-col span="24">
                    <collapse v-model="temp1">
                        <panel name="1">
                            响应参数
                            <div slot="content" class="request-param">
                                <i-button
                                    icon="md-add"
                                    @click="handleClickAddParam1"
                                    >新增</i-button
                                >
                                <tree-input
                                    :data="item"
                                    v-for="(item, index) in JSON.parse(data.responseParam)"
                                    :key="index"
                                    @on-delete="handleClickDelete1"
                                />
                                <pre v-html="responseFormData" />
                            </div>
                        </panel>
                    </collapse>
                </i-col>
                <i-col span="24">
                    <div style="margin-top:20px;">
                        <i-button icon="md-add" @click="handliClickAddApi"
                            >确认添加</i-button
                        >
                    </div>
                </i-col>
            </row>
        </i-form>
    </div>
</template>
<script>
import TreeInput from "@/components/TreeInput.vue"
import { deleteDataItem, paramToObject, syntaxHighlight } from "../../utils/utils.js"
import { addApi } from "@/api/index.js"
export default {
    props: {
        data:[Object]
    },
    data() {
        return {
            temp1: '1',
            //添加的参数对象
            request: {

            },
            //请求参数集合
            param: [{
                name: '',
                cate: '',
                default: '',
                describe: '',
                id: '1',
                require: '',
                property: []
            }],
            //响应参数集合
            param1: [{
                name: '',
                cate: '',
                default: '',
                describe: '',
                id: '1',
                require: '',
                property: []
            }],
        }
    },
    computed: {
        //请求参数代码
        requireFormData() {
            return syntaxHighlight(paramToObject(this.param))
        },
        //响应参数代码
        responseFormData() {
            return syntaxHighlight(paramToObject(this.param1))
        },
        //模块集合
        moduleList() {
            return this.$store.state.module
        }
    },
    components: {
        TreeInput
    },
    methods: {
        //删除参数
        handleClickDelete(id) {
            if ((this.param.length == 1 && this.param[0].property.length == 0) || (this.param.length == 1 && this.param[0].property.length > 0 && this.param[0].id == id)) {
                return
            }
            this.param = deleteDataItem(this.param, id)
        },
        //增加参数
        handleClickAddParam() {
            let id = this.param.length + 1 + ''
            this.param.push({
                name: '',
                cate: '',
                default: '',
                describe: '',
                id: id,
                require: '',
                property: []
            })
        },
        //添加api
        async  handliClickAddApi() {
            let params = this.request;
            params.requestParam = JSON.stringify(this.param)
            params.responseParam = JSON.stringify(this.param1)
            let projectId = this.$route.params.id
            let moduleId = params.moduleId
            delete params.moduleId
            // let res = await addApi(projectId, moduleId, params,'POST')
        },
        //删除参数(响应)
        handleClickDelete1(id) {
            if ((this.param1.length == 1 && this.param1[0].property.length == 0) || (this.param1.length == 1 && this.param1[0].property.length > 0 && this.param1[0].id == id)) {
                return
            }
            this.param1 = deleteDataItem(this.param1, id)
        },
        //增加参数（响应）
        handleClickAddParam1() {
            let id = this.param1.length + 1 + ''
            this.param1.push({
                name: '',
                cate: '',
                default: '',
                describe: '',
                id: id,
                require: '',
                property: []
            })
        },
    },
    watch: {

    }
}
</script>
<style lang="less" scoped>
.add-content {
    width: 100%;
    padding: 10px;

    .formitem {
        width: 90%;
    }
    .request-param {
        width: 100%;
        padding: 10px;
        padding-top: 5px;
    }
    /deep/ .ivu-collapse-content {
        padding: 0;
    }
    /deep/ .ivu-collapse-content-box {
        padding: 0;
    }
}
</style>
<!--
 * @Description: 修改接口
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-04-02 18:14:03
 * @LastEditTime: 2019-04-09 23:11:12
 -->
<template>
    <div class="add-content">

        <i-form label-position="top" ref="update" v-if="data" :model="data">
            <row :gutter="20">
                <i-col span="24">
                    <i-button type="error" @click="confirmDel" :loading="isDelBtnLoading" style="margin-bottom:20px;margin-right:20px;">删除接口</i-button>
                    <i-button @click="handliClickUpdateApi" :loading="isUpdateLoading" style="margin-bottom:20px;">确认修改</i-button>
                </i-col>
                <i-col span="12">
                    <form-item label="接口名称" class="formitem" prop="apiName" :rules="{required: true, message: '接口名不能为空', trigger: 'blur'}">
                        <i-input v-model="data.apiName" />
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="接口描述" class="formitem" prop="description" :rules="{required: true, message: '接口描述不能为空', trigger: 'blur'}">
                        <i-input v-model="data.description" />
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="接口路径" class="formitem" prop="uri" :rules="{required: true, message: '接口路径不能为空', trigger: 'blur'}">
                        <i-input v-model="data.uri"></i-input>
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="请求方法" class="formitem" prop="method" :rules="{required: true, message: '请求方法不能为空', trigger: 'change'}">
                        <i-select v-model="data.method">
                            <i-option value="GET">GET</i-option>
                            <i-option value="POST">POST</i-option>
                            <i-option value="PUT">PUT</i-option>
                            <i-option value="DELETE">DELETE</i-option>
                        </i-select>
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="Content-Type" class="formitem" prop="contentType" :rules="{required: true, message: 'Content-Type不能为空', trigger: 'change'}">
                        <i-select v-model="data.contentType">
                            <i-option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</i-option>
                            <i-option value="multipart/form-data">multipart/form-data</i-option>
                            <i-option value="application/json">application/json</i-option>
                        </i-select>
                    </form-item>
                </i-col>
                <i-col span="24">
                    <collapse style="margin-bottom:20px;" v-model="temp1">
                        <panel name="1">
                            请求参数
                            <div slot="content" class="request-param">
                                <i-button icon="md-add" @click="handleClickAddParam">新增</i-button>
                                <tree-input :data="item" v-for="(item, index) in JSON.parse(data.requestParam)" :key="index" @on-delete="handleClickDelete" />
                                <pre v-html="requestFormData" />
                                </div>
                        </panel>
                    </collapse>
                </i-col>
                <i-col span="24">
                    <collapse v-model="temp2">
                        <panel name="1">
                            响应参数
                            <div slot="content" class="request-param">
                                <i-button icon="md-add"  @click="handleClickAddParam1" >新增</i-button>
                                <tree-input  :data="item" v-for="(item, index) in JSON.parse(data.responseParam)" :key="index" @on-delete="handleClickDelete1"  />
                                <pre v-html="responseFormData" />
                            </div>
                        </panel>
                    </collapse>
                </i-col>
            </row>
        </i-form>
        <div v-else class="null-data">
            <img :src="require('../../assets/no.svg')" alt="">
        </div>
    </div>
</template>
<script>
import TreeInput from "@/components/TreeInput.vue"
import { deleteDataItem, paramToObject, syntaxHighlight } from "../../utils/utils.js"
import { handleApi } from "@/api/index.js"
import { DELETE_API, UPDATE_API } from "@/store/mutation-types.js"
export default {
    data() {
        return {
            //展开的内容
            temp1: '1',
            temp2: '1',
            //删除按钮加载状态
            isDelBtnLoading: false,
            //修改按钮加载状态
            isUpdateLoading: false,
            data: null
        }
    },
    computed: {
        //请求参数代码
        requestFormData() {
            return syntaxHighlight(paramToObject(JSON.parse(this.data.requestParam)))
        },
        //响应参数代码
        responseFormData() {
            return syntaxHighlight(paramToObject(JSON.parse(this.data.responseParam)))
        },
        //模块集合
        moduleList() {
            return this.$store.state.module
        },
        //接口详情
        api() {
            return this.$store.state.api
        }
    },
    components: {
        TreeInput
    },
    methods: {
        //删除参数
        handleClickDelete(id) {
            let requestParam = this.data.requestParam
            this.param = deleteDataItem(requestParam, id)
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
        //修改api
        async  handliClickUpdateApi() {
            let valid = await this.$refs.update.validate()
            if (valid) {
                let params = this.data;
                let projectId = this.$route.params.id
                let moduleId = this.data.moduleId
                let apiId = this.data.apiId
                delete params.moduleId
                delete params.apiId
                try {
                    this.isUpdateLoading = true
                    let res = await handleApi(projectId, moduleId, apiId, params, 'PUT')
                    let api = res.data.data
                    api.apiId = apiId
                    api.moduleId = moduleId
                    if (res.data.code == 0) {
                        this.$Message.success("修改成功")
                        this.$store.commit(UPDATE_API, {
                            moduleId, apiId,
                            api: api
                        })
                    }
                } finally {
                    this.isUpdateLoading = false
                }
            }

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
        //询问是否删除
        confirmDel() {
            this.$Modal.confirm({
                title: '删除？',
                content: '确认删除此接口',
                onOk: () => {
                    this.handleClickDeleteApi();
                }
            });
        },
        //删除接口
        async  handleClickDeleteApi() {
            let projectId = this.$route.params.id
            let apiId = this.data.apiId
            let moduleId = this.data.moduleId
            try {
                this.isDelBtnLoading = true
                let res = await handleApi(projectId, moduleId, apiId, {}, "delete")
                if (res.data.code == 0) {
                    this.$store.commit(DELETE_API, {
                        apiId, moduleId
                    })
                    this.$Message.success("删除成功")

                }

            } catch (error) {
                this.$Message.error("删除失败")
            } finally {
                this.isDelBtnLoading = false
            }
        }
    },
    mounted() {
        this.data = this.api
    },
    watch: {
        api(val) {
            this.data = val
        }
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
    .null-data {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
}
</style>
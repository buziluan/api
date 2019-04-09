<!--
 * @Description: 我的项目首页
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-22 23:35:40
 * @LastEditTime: 2019-04-09 22:27:32
 -->
<template>
    <section class="project-content">
        <div class="nav">
            <breadcrumb>
                <breadcrumb-item to="/home/project/me">我的项目</breadcrumb-item>
            </breadcrumb>
            <transition name="fade" mode="out-in">
                <i-button @click="isShowAdd=!isShowAdd" v-if="!toPro">创建新项目</i-button>
                <div v-else>
                    <i-button @click="isShowModule=!isShowModule" style="margin-right:10px;">创建新模块</i-button>
                    <i-button @click="isShowUpdateModule=!isShowUpdateModule" style="margin-right:10px;" v-show="moduleList.length>0">修改模块</i-button>
                    <i-button @click="isShowAddApi=!isShowAddApi" v-show="moduleList.length>0">添加新的接口</i-button>
                </div>
            </transition>
        </div>
        <div class="project">
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </div>
        <modal v-model="isShowAdd" title="创建新的项目" width="500" :loading="true" @on-ok="handleClickAdd">
            <i-form label-position="top" ref="form" :model="formData" :rules="ruleCustom">
                <form-item label="项目名称" prop="name">
                    <i-input type="text" v-model="formData.name" placeholder="请输入项目名称"></i-input>
                </form-item>
                <form-item label="项目描述" prop="description">
                    <i-input type="text" v-model="formData.description" placeholder="请输入项目描述"></i-input>
                </form-item>
                <form-item label="项目根路径" prop="baseUrl">
                    <i-input type="text" v-model="formData.baseUrl" placeholder="请输入项目根路径">
                        <span slot="prepend">/</span>
                    </i-input>
                </form-item>
                <form-item label="是否公开" prop="open">
                    <i-select type="text" v-model="formData.open">
                        <i-option value="1">公开</i-option>
                        <i-option value="0">私有</i-option>
                    </i-select>
                </form-item>
            </i-form>
        </modal>

        <modal v-model="isShowModule" title="创建新的模块" width="500" :loading="true" @on-ok="handleClickAddModule">
            <i-form label-position="top" ref="module" :model="moduleData" :rules="ruleModule">
                <form-item label="模块名称" prop="moduleName">
                    <i-input type="text" v-model="moduleData.moduleName" placeholder="请输入模块名称"></i-input>
                </form-item>
                <form-item label="模块路径" prop='uri'>
                    <i-input type="text" v-model="moduleData.uri" placeholder="请输入模块路径">
                        <span slot="prepend">/</span>
                    </i-input>
                </form-item>
            </i-form>
        </modal>

        <modal v-model="isShowUpdateModule" title="修改模块信息" width="500" :loading="true" @on-ok="handleClickUpdateModule">
            <i-form label-position="top" ref="updateModule" :model="moduleUpdateData">
                <form-item label="模块">
                    <i-select v-model="moduleUpdateData.moduleId" @on-change="handleSelectModule">
                        <i-option v-for="item in moduleList" :key="item.moduleId" :value="item.moduleId">
                            {{item.moduleName}}</i-option>
                    </i-select>
                </form-item>
                <form-item label="模块名称">
                    <i-input v-model="moduleUpdateData.moduleName" />
                </form-item>
                <form-item label="模块路径">
                    <i-input v-model="moduleUpdateData.uri"><span slot="prepend">/</span></i-input>
                </form-item>
            </i-form>
        </modal>

        <modal v-model="isShowAddApi" :styles="{top: '30px'}" title="创建新的接口" width="1000" :loading="true">
            <div class="add-api-content">
                <i-form label-position="right" :label-width="100" ref="api" :model="apiData" :rules="ruleApi">
                    <form-item label="接口名称:" prop="apiName">
                        <i-input v-model="apiData.apiName" style="width:50%" />
                    </form-item>
                    <form-item label="接口描述:" prop="description">
                        <i-input v-model="apiData.description" style="width:50%" />
                    </form-item>
                    <form-item label="接口路径:" prop="uri">
                        <i-input v-model="apiData.uri" style="width:50%">
                            <span slot="prepend">/</span>
                        </i-input>
                    </form-item>
                    <form-item label="请求方法:" prop="method">
                        <i-select v-model="apiData.method" style="width:50%">
                            <i-option value="GET">GET</i-option>
                            <i-option value="POST">POST</i-option>
                            <i-option value="PUT">PUT</i-option>
                            <i-option value="DELETE">DELETE</i-option>
                        </i-select>
                    </form-item>
                    <form-item label="所属模块:" prop="moduleId">
                        <i-select v-model="apiData.moduleId" style="width:50%">
                            <i-option :value="item.moduleId" v-for="(item, index) in moduleList" :key="index">{{ item.moduleName }}</i-option>
                        </i-select>
                    </form-item>
                    <form-item label="Content-Type:" prop="contentType">
                        <i-select v-model="apiData.contentType" style="width:50%">
                            <i-option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</i-option>
                            <i-option value="multipart/form-data">multipart/form-data</i-option>
                            <i-option value="application/json">application/json</i-option>
                        </i-select>
                    </form-item>
                    <form-item label="请求参数:">
                        <div class="request-param">
                            <i-button icon="md-add" @click="handleClickAddRequestParam">新增参数</i-button>
                            <tree-input :data="item" v-for="(item, index) in requestParam" :key="index" @on-delete="handleClickDeleteRequest" />
                            <pre v-html="requireFormData" />
                            </div>
                    </form-item>
                    <form-item label="响应参数:"  >
                        <div class="request-param">
                            <i-button icon="md-add" @click="handleClickAddResponse">新增参数</i-button>
                            <tree-input :data="item" v-for="(item, index) in responseParam" :key="index" @on-delete="handleClickDeleteResponse" />
                            <pre v-html="responseFormData" />
                            </div>
                    </form-item>
                </i-form>
            </div>
            <div slot="footer">
                    <i-button @click="handleClickAddApi" :loading="addApiBtnLoading" type="primary">确认</i-button>
            </div>
        </modal>
    </section>
</template>
<script>
import {
    addPro,
    addModule,
    handleModule,
    addApi
} from "../../api/index.js"
import {
    ADD_PROJECT,
    ADD_MODULE,
    UPDATE_ONEMODULE,
    ADD_API
} from "../../store/mutation-types.js"
import TreeInput from "@/components/TreeInput.vue"
import { deleteDataItem, paramToObject, syntaxHighlight } from "@/utils/utils.js"
export default {
    data() {
        return {
            //项目表单对象
            formData: {
                name: "",
                description: "",
                baseUrl: "",
                open: 0
            },
            //模块表单对象
            moduleData: {
                moduleName: '',
                uri: ''
            },
            //修改模块表单对象
            moduleUpdateData: {
                moduleId: '',
                moduleName: '',
                uri: ''
            },
            //接口表单对象
            apiData: {
                apiName: '',
                description: '',
                uri: '',
                method: '',
                moduleId: '',
                contentType: ''
            },
            //项目验证对象
            ruleCustom: {
                name: [{
                    required: true,
                    message: '项目名称不能为空',
                    trigger: 'blur'
                }],
                description: [{
                    required: true,
                    message: '项目描述不能为空',
                    trigger: 'blur'
                }],
                baseUrl: [{
                    required: true,
                    message: '项目根路径不能为空',
                    trigger: 'blur'
                }],
                open: [{
                    required: true,
                    message: '项目是否公开',
                    trigger: 'change'
                }],
            },
            //模块验证对象
            ruleModule: {
                moduleName: [{
                    required: true,
                    message: '模块名称不能为空',
                    trigger: 'blur'
                }],
                uri:[{
                     required: false
                }]
            },
            //修改模块验证对象
            ruleModuleUpdate: {
                moduleId: [{
                    required: true,
                    message: '请选择模块',
                    trigger: 'change'
                }]
            },
            //接口验证对象
            ruleApi: {
                apiName: [{
                    required: true,
                    message: '接口名称不能为空',
                    trigger: 'blur'
                }],
                description: [{
                    required: true,
                    message: '接口描述不能为空',
                    trigger: 'blur'
                }],
                uri: [{
                    required: true,
                    message: '接口路径不能为空',
                    trigger: 'blur'
                }],
                method: [{
                    required: true,
                    message: '请求方法不能为空',
                    trigger: 'change'
                }],
                moduleId: [{
                    required: true,
                    message: '所属模块不能为空',
                    trigger: 'change',
                    type: "number"
                }],
                contentType: [{
                    required: true,
                    message: 'contentType不能为空',
                    trigger: 'change'
                }],
            },
            //显示新增项目窗口
            isShowAdd: false,
            //显示新增模块窗口
            isShowModule: false,
            //显示哪个按钮
            isShowBtn: this.$route.name == 'myproject',
            //显示修改模块接口
            isShowUpdateModule: false,
            //显示添加api弹窗
            isShowAddApi: false,
            //请求参数对象
            requestParam: [],
            //响应参数对象
            responseParam: [],
            //添加api按钮加载状态
            addApiBtnLoading: false
        }
    },
    components: {
        TreeInput
    },
    methods: {
        //点击添加项目
        async handleClickAdd() {
            let validate = await this.$refs.form.validate()
            if (validate) {
                try {
                    let data = this.formData;
                    let res = await addPro(data, "POST")
                    this.$store.commit(ADD_PROJECT, {
                        project: res.data.data
                    })
                    this.$Message.success({
                        content: "创建成功"
                    })
                    this.$refs.form.resetFields();

                } catch (error) {
                    this.$Message.error({
                        content: "服务器异常"
                    })
                } finally {
                    this.isShowAdd = false
                }
            }
        },
        //点击添加新的模块
        async handleClickAddModule() {
            let validate = await this.$refs.module.validate()
            if (validate) {
                try {
                    let id = this.$route.params.id
                    let res = await addModule(id, this.moduleData, "post")
                    this.$store.commit(ADD_MODULE, res.data.data)
                    this.$Message.success({
                        content: "创建成功"
                    })
                    this.$refs.module.resetFields();
                } catch (error) {
                    this.$Message.error({
                        content: "服务器异常"
                    })
                } finally {
                    this.isShowModule = false
                }
            }
        },
        //确认修改模块
        async handleClickUpdateModule() {

            try {
                if (!this.moduleUpdateData.moduleId) {
                    this.$Message.error({
                        content: "请先选择模块"
                    })
                    this.isShowUpdateModule = true;
                    return
                }
                let projectId = this.$route.params.id
                let data = {
                    moduleName: this.moduleUpdateData.moduleName,
                    uri: this.moduleUpdateData.uri
                }
                let res = await handleModule(projectId, this.moduleUpdateData.moduleId, data, "PUT")
                this.$store.commit(UPDATE_ONEMODULE, res.data.data)
                this.$Message.success({
                    content: "修改成功"
                })
                this.moduleUpdateData = {}
            } catch (error) {
                this.$Message.error({
                    content: "服务器异常"
                })
            } finally {
                this.isShowUpdateModule = false;
            }
        },
        //选择模块
        handleSelectModule(value) {
            if (value == '' || value == undefined || value == null) {
                return
            }
            let module = this.moduleList.filter(item => item.moduleId == value)[0]
            this.moduleUpdateData.moduleName = module.moduleName;
            this.moduleUpdateData.uri = module.uri;
        },
        //新增请求参数
        handleClickAddRequestParam() {
            let id = this.requestParam.length + 1 + ''
            this.requestParam.push({
                name: '',
                cate: '',
                default: '',
                describe: '',
                id: id,
                require: '',
                property: []
            })
        },
        //删除请求参数对象
        handleClickDeleteRequest(id) {
            this.requestParam = deleteDataItem(this.requestParam, id)
        },
        //新增响应参数
        handleClickAddResponse() {
            let id = this.responseParam.length + 1 + ''
            this.responseParam.push({
                name: '',
                cate: '',
                default: '',
                describe: '',
                id: id,
                require: '',
                property: []
            })
        },
        //删除响应参数对象
        handleClickDeleteResponse(id) {
            if ((this.responseParam.length == 1 && this.responseParam[0].property.length == 0) || (this.responseParam.length == 1 && this.responseParam[0].property.length > 0 && this.responseParam[0].id == id)) {
                return
            }
            this.responseParam = deleteDataItem(this.responseParam, id)
        },
        //添加新的api
        async handleClickAddApi() {
            let validate = await this.$refs.api.validate()
            if (validate) {
                this.addApiBtnLoading = true
                let params = this.apiData
                params.requestParam = JSON.stringify(this.requestParam)
                params.responseParam = JSON.stringify(this.responseParam)
                let projectId = this.$route.params.id
                let moduleId = params.moduleId
                delete params.moduleId
                try {
                    let res = await addApi(projectId, moduleId, params, 'POST')
                    if (res.data.code == 0) {
                        this.$Message.success("创建成功")
                        this.$store.commit(ADD_API, {
                            moduleId: moduleId,
                            api: res.data.data
                        })
                        this.$refs.api.resetFields()
                        this.requestParam = []
                        this.responseParam = []
                    }
                } catch (error) {
                    this.$Message.error("创建失败")
                } finally {
                    this.addApiBtnLoading = false
                    this.isShowAddApi = false
                }
            }
        }
    },
    created() {

    },
    computed: {
        //是否进入项目
        toPro() {
            return this.$store.state.toPro
        },
        //项目集合
        moduleList() {
            return this.$store.state.module
        },
        //请求参数代码
        requireFormData() {
            return syntaxHighlight(paramToObject(this.requestParam))
        },
        //响应参数代码
        responseFormData() {
            return syntaxHighlight(paramToObject(this.responseParam))
        }
    }
}
</script>
<style lang="less" scoped>
.project-content {
    // max-width: 1200px;
    height: 100%;
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;

    .project {
        margin-top: 20px;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.add-api-content {
    height: 600px;
    overflow: hidden;
    overflow-y: scroll;
    width: 100%;
    .request-param {
        width: 100%;
        padding: 10px;
        padding-top: 5px;
    }
}
</style>
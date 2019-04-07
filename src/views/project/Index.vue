<!--
 * @Description: 我的项目首页
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-22 23:35:40
 * @LastEditTime: 2019-04-07 21:50:24
 -->
<template>
    <section class="project-content">
        <div class="nav">
            <breadcrumb>
                <breadcrumb-item to="/home/project/me">我的项目</breadcrumb-item>
                <breadcrumb-item>演示项目</breadcrumb-item>
            </breadcrumb>
            <transition name="fade" mode="out-in">
                <i-button @click="isShowAdd=!isShowAdd" v-if="!toPro">创建新项目</i-button>
                <div v-else>
                    <i-button @click="isShowModule=!isShowModule" style="margin-right:10px;">创建新模块</i-button>
                    <i-button @click="isShowUpdateModule=!isShowUpdateModule" v-show="moduleList.length>0">修改模块
                    </i-button>
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
                <form-item label="模块路径">
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
                    <i-input v-model="moduleUpdateData.uri" />
                </form-item>
            </i-form>
        </modal>
    </section>
</template>
<script>
    import {
        addPro,
        addModule,
        handleModule
    } from "../../api/index.js"
    import {
        ADD_PROJECT,
        ADD_MODULE,
        UPDATE_ONEMODULE
    } from "../../store/mutation-types.js"
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
                //显示新增项目窗口
                isShowAdd: false,
                //显示新增模块窗口
                isShowModule: false,
                //显示哪个按钮
                isShowBtn: this.$route.name == 'myproject',
                //显示修改模块接口
                isShowUpdateModule: false,
            }
        },
        components: {},
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
</style>
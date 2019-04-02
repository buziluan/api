<!--
 * @Description: 项目详情
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-27 11:54:00
 * @LastEditTime: 2019-04-02 22:27:45
 -->
<template>
    <div class="project-content1">
        <row :gutter="10" v-if="moduleList.length>0">
            <!--  -->
            <i-col span="4">
                <i-menu :theme="theme2" @on-select="handleSelectMenu" accordion @on-open-change="handleSelectModule">
                    <submenu :name="item.moduleId" v-for="item in moduleList" :key="item.moduleId">
                        <template slot="title">
                            {{item.moduleName}}
                        </template>
                        <menu-item :name="api.apiId" v-for="api in item.apiList" :key="api.apiId">{{api.apiName}}
                        </menu-item>
                    </submenu>
                </i-menu>
            </i-col>
            <i-col span="20">
                <tabs type="card">
                    <tab-pane label="预览">
                        <preview />
                    </tab-pane>
                    <tab-pane label="编辑">
                        
                    </tab-pane>
                    <tab-pane label="新增">
                        <add-api />
                    </tab-pane>
                </tabs>
            </i-col>
        </row>
        <row v-else>
            <i-col span="24">
                <div class="notdata">
                    <img :src="require('../../assets/null.svg')" alt="">
                    <p>暂无数据</p>
                </div>
            </i-col>
        </row>
        <spin v-if="isSpin" size="large" fix />
    </div>
</template>
<script>
    import {
        handlePro
    } from "../../api/index.js"
    import Preview from "./Preview.vue"
    import AddApi from "./AddAPI.vue"
    import {
        UPDATE_TOPRO,
        UPDATE_MODULES,
        EMPTY_MODULE
    } from "../../store/mutation-types.js"
    export default {
        data() {
            return {
                theme2: 'light',
                //加载框
                isSpin: false,
                //moduleid
                moduleId: '',
                //apiid
                apiId: ''
            }
        },
        created() {
            this.$store.commit(UPDATE_TOPRO, true)
            this.getInt()
        },
        computed: {
            //项目集合
            moduleList() {
                return this.$store.state.module
            }
        },
        components: {
            Preview,
            AddApi
        },
        methods: {
            //点击列表接口名称后触发事件
            handleSelectMenu() {
               
            },
            //点击获取模块id
            handleSelectModule(data) {
                this.moduleId = data
            },
            //初始化加载
            async getInt() {
                let shorthand = this.$route.params.id
                this.isSpin = true
                try {
                    let res = await handlePro(shorthand, "get")
                    this.$store.commit(UPDATE_MODULES, {
                        module: res.data.data.moduleList
                    })
                } catch (error) {
                    this.$Message.error({
                        content: "服务器异常"
                    })
                } finally {
                    this.isSpin = false
                }
            },
        },
        beforeDestroy(){
            //组件销毁之前清空模块集合
             this.$store.commit(EMPTY_MODULE)
        }
    }
</script>
<style lang="less" scoped>
    /deep/ .ivu-menu-light {
        background-color: transparent;
        width: 100% !important;
    }

    /deep/ .ivu-menu {
        z-index: 7;
    }

    .project-content1 {
        position: relative;

        .notdata {
            width: 100%;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            font-size: 20px;
        }
    }
</style>
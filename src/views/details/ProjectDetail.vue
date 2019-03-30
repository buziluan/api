<!--
 * @Description: 项目详情
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-27 11:54:00
 * @LastEditTime: 2019-03-30 23:36:41
 -->
<template>
    <div>
        <row :gutter="10">
            <i-col span="4">
                <i-menu :theme="theme2" @on-select="handleSelectMenu">
                    <submenu name="1">
                        <template slot="title">
                            登录模块
                        </template>
                        <menu-item name="1-1">login</menu-item>
                        <menu-item name="1-2">logout</menu-item>
                    </submenu>
                    <submenu name="2">
                        <template slot="title">
                            商品模块
                        </template>
                        <menu-item name="2-1">商品列表</menu-item>
                        <menu-item name="2-2">商品详情</menu-item>
                    </submenu>
                </i-menu>
            </i-col>
            <i-col span="20">
                <Tabs type="card">
                    <TabPane label="预览">
                        <preview />
                    </TabPane>
                    <TabPane label="编辑">标签二的内容</TabPane>
                </Tabs>
            </i-col>
        </row>
    </div>
</template>
<script>
    import {
        handlePro
    } from "../../api/index.js"
    import Preview from "./Preview.vue"
    export default {
        data() {
            return {
                theme2: 'light',
            }
        },
        created() {
            this.getInt()
        },
        computed: {

        },
        components: {
            Preview
        },
        methods: {
            //点击列表接口名称后触发事件
            handleSelectMenu() {

            },
            //初始化加载
            async getInt() {
                let shorthand = this.$route.params.id
                try {
                    await handlePro(shorthand, "get")
                } catch (error) {
                    this.$Message.error({
                        content: "服务器异常"
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    /deep/ .ivu-menu-light {
        background-color: transparent;
        width: 100% !important;
    }
</style>
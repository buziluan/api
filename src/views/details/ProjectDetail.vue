<!--
 * @Description: 项目详情
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-27 11:54:00
 * @LastEditTime: 2019-03-27 22:07:12
 -->
<template>
    <div>
        <row :gutter="10">
            <i-col span="6">
                <i-menu :theme="theme2" active-name="1-1" :open-names="['1']">
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
            <i-col span="18">
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
    import Preview from "./Preview.vue"
    export default {
        data() {
            return {
                theme2: 'light',
            }
        },
        created() {

        },
        computed: {

        },
        components: {
            Preview
        }
    }
</script>
<style lang="less" scoped>
    /deep/ .ivu-menu-light {
        background-color: transparent;
        width: 100% !important;
    }
</style>
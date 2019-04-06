<!--
 * @Description: 接口预览页面
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-27 21:15:48
 * @LastEditTime: 2019-04-05 16:51:58
 -->

<template>
    <div class="content">
        <i-form label-position="top">
            <form-item label="接口描述">
                <div class="content-item">
                    <span>登录使用接口</span>
                </div>
            </form-item>
            <form-item label="接口路径">
                <div class="content-item">
                    <span>/user/login</span>
                </div>
            </form-item>
            <form-item label="Content-Type">
                <div class="content-item">
                    <span>application/json</span>
                </div>
            </form-item>
            <form-item label="请求方法">
                <div class="content-item">
                    <span>POST</span>
                </div>
            </form-item>
            <form-item label="请求参数">
                <i-table :columns="columns1" :data="data1" disabled-hover />
            </form-item>
            <form-item label="示例">
                <pre v-html="showData"></pre>
            </form-item>
            <form-item label="响应参数">
                <i-table :columns="columns1" :data="data1" disabled-hover />
            </form-item>
            <form-item label="示例">
                <pre v-html="showData"></pre>
            </form-item>
        </i-form>
       
    </div>
</template>
<script>
    import {
        syntaxHighlight
    } from "@/utils/utils.js"
    export default {
        props: {

        },
        data() {
            return {
                obj: {
                    username: "admin",
                    password: "admin",
                },
                columns1: [{
                        title: '属性',
                        key: 'property',
                        align: "left"
                    },
                    {
                        title: '类型',
                        key: 'className'
                    },
                    {
                        title: '默认值',
                        key: 'default'
                    },
                    {
                        title: '必填',
                        key: 'required'
                    },
                    {
                        title: '描述',
                        key: 'describe'
                    }
                ],
                data1: [{
                    property: "username",
                    className: "String",
                    default: "",
                    required: "是",
                    describe: "登录用户名"
                }, {
                    property: "password",
                    className: "String",
                    default: "",
                    required: "是",
                    describe: "登录密码"
                }]
            }
        },
        computed: {
            showData() {
                return syntaxHighlight(this.obj)
            }
        }
    }
</script>
<style lang="less" scoped>
    .content {
        width: 100%;
        padding: 0 20px 20px 20px;
        height: auto;
        overflow: hidden;
        min-width: 500px;
        .content-item {
            padding: 10px;
            margin: 5px;
            width: 100%;
            text-align: left;
            background-color: #909399;
            border-radius: 10px;
            color: white;
        }

        /deep/ .ivu-form-item-label {
            font-size: 20px;
            font-weight: 500;
        }

        /deep/ .ivu-form-item-content {
            padding: 20px 0px 10px 20px;
            font-size: 16px;
        }

        pre {
            padding: 10px;
            margin: 5px;
            width: 100%;
            text-align: left;
            background-color: rgb(232, 236, 241);
            border-radius: 10px;

            pre .string {
                color: red !important;
            }

            /deep/ .number {
                color: #3e76f7 !important;
            }

            /deep/ .boolean {
                color: #3e76f7 !important;
            }

            /deep/ .null {
                color: magenta !important;
            }

            /deep/ .key {
                color: red;
            }
        }
    }
</style>
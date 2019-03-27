<!--
 * @Description: 接口预览页面
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-27 21:15:48
 * @LastEditTime: 2019-03-27 22:07:56
 -->

<template>
    <div class="content">
        <row>
            <i-form label-position="top">
                <i-col span="24">
                    <form-item label="请求路径：">
                        <i-input readonly value="/user/login">
                            <span slot="prepend">POST</span>
                        </i-input>
                    </form-item>
                </i-col>
                <i-col span="24">
                    <form-item label="参考示例：">
                        <pre v-html="showData" />
                        </form-item>
                </i-col>
            </i-form>
        </row>

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
                    name: "房旭",
                    age: 24,
                }
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
                color: #3E76F7 !important;
            }



            /deep/ .boolean {
                color: #3E76F7 !important;
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
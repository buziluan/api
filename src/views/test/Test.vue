<template>
    <div class="main">
        这个是测试页面
        <!-- <p>{{showData}}</p> -->
        <input type="text" v-model="obj.name">
        <pre v-html="showData">

        </pre>
    </div>
</template>
<script>
    import {
        syntaxHighlight
    } from "@/utils/utils.js"
    export default {
        data() {
            return {
                obj: {
                    name: "房旭",
                    age: 24,
                },
                data: "1"
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
    .main {
        width: 1200px;
        padding: 20px;
        height: 500px;
    }

    pre {
        outline: 1px solid #ccc;
        padding: 10px;
        margin: 5px;
        width: 400px;
        text-align: left;
    }

    pre .string {
        color: red !important;
    }

    /*字符串的样式*/

    /deep/ .number {
        color: darkorange !important;
    }

    /*数字的样式*/

    /deep/ .boolean {
        color: blue !important;
    }

    /*布尔型数据的样式*/

    /deep/ .null {
        color: magenta !important;
    }

    /*null值的样式*/

    /deep/ .key {
        color: red;
    }
</style>
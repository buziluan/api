<!--
 * @Description: 测试页面
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-23 18:50:19
 * @LastEditTime: 2019-04-06 23:06:33
 -->
<template>
    <div class="main">
        <tree-input :data="showData" />
    </div>
</template>
<script>
import TreeInput from "@/components/TreeInput.vue"
export default {
    data() {
        return {
            obj: {
                name: "房旭",
                age: 24,
            },
            data: "1",
            showData: {
                name: '1',
                child: [
                    { name: '11', child: [{ name: '111', child: [] }, { name: '112', child: [] }, { name: '113', child: [] }] },
                    { name: '12', child: [] },
                    { name: '13', child: [] }
                ]
            }

        }
    },
    computed: {

    },
    components: {
        TreeInput
    }
}
</script>
<style lang="less" scoped>
.main {
    width: 1200px;
    padding: 20px;
    height: 500px;
    pre {
        padding: 10px;
        margin: 5px;
        width: 400px;
        text-align: left;
        background-color: rgb(176, 180, 185);
        border-radius: 10px;
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
    }
}
</style>
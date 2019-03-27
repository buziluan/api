<!--
 * @Description: 我的项目
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-27 11:19:32
 * @LastEditTime: 2019-03-27 15:25:40
 -->
<template>
    <div class="main">
        <row :gutter="25">
            <i-col :xl="4" :lg="6" :md="8" :sm="12">
                <project-item :data="item" />
            </i-col>
            <i-col :xl="4" :lg="6" :md="8" :sm="12">
                <project-item :data="item" />
            </i-col>
            <i-col :xl="4" :lg="6" :md="8" :sm="12">
                <project-item :data="item" />
            </i-col>
            <i-col :xl="4" :lg="6" :md="8" :sm="12">
                <project-item :data="item" />
            </i-col>
            <i-col :xl="4" :lg="6" :md="8" :sm="12">
                <project-item :data="item" />
            </i-col>
            <i-col :xl="4" :lg="6" :md="8" :sm="12">
                <project-item :data="item" />
            </i-col>
        </row>
        <spin v-show="isSpin" fix />
    </div>
</template>
<script>
    import ProjectItem from "@/components/ProjectItem.vue"
    export default {
        components: {
            ProjectItem
        },
        data() {
            return {
                item: {
                    title: "演示项目"
                },
                //加载状态
                isSpin: true
            }
        },
        created() {
            setTimeout(() => {
                this.isSpin = false
            }, 200);
        }
    }
</script>
<style lang="less" scoped>
    .main {
        position: relative;
    }
</style>
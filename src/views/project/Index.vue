<!--
 * @Description: 我的项目首页
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-22 23:35:40
 * @LastEditTime: 2019-03-23 18:30:18
 -->
<template>
    <section class="project-content">
        <div class="nav">
            <breadcrumb>
                <breadcrumb-item :to="{name:'project'}">我的项目</breadcrumb-item>
                <!-- <breadcrumb-item :to="{name:'home'}">Components</breadcrumb-item> -->
            </breadcrumb>
        </div>
        <div class="project">
            <row :gutter="25">
                <i-col :xl="4" :lg="6" :md="8" :sm="12">
                    <project-item :data="item"/>
                </i-col>
            </row>
        </div>
    </section>
</template>
<script>
    import ProjectItem from "@/components/ProjectItem.vue"
    export default {
        data() {
            return {
                item:{
                    title:"演示项目"
                }
            }
        },
        components: {
            ProjectItem
        }
    }
</script>
<style lang="less" scoped>
    .project-content {
        max-width: 1000px;
        height: 100%;
        width: 70%;
        margin: 0 auto;
        padding-top: 20px;

        .project {
            margin-top: 20px;


        }
    }
</style>
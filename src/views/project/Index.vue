<!--
 * @Description: 我的项目首页
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-22 23:35:40
 * @LastEditTime: 2019-03-23 00:54:54
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
                    <card class="item">
                        <div slot="title" class="item-title">
                            项目名称
                        </div>
                        <div class="item-content">
                            <div>
                                描述
                            </div>
                            <div>
                                url
                            </div>
                             <div>
                                属性
                            </div>
                            <div>
                                操作
                            </div>
                        </div>
                    </card>
                </i-col>

            </row>

        </div>
    </section>
</template>
<script>
    export default {

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

            .item {
                width: 100%;
                height: 300px;
                margin-bottom: 20px;
                cursor: pointer;

                .item-title {
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 16px;
                    text-align: center;
                }
            }

            .item-content {
                width: 100%;
                display: flex;
                flex-direction: column;
            }
        }
    }
</style>
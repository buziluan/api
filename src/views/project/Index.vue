<!--
 * @Description: 我的项目首页
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-22 23:35:40
 * @LastEditTime: 2019-03-26 21:48:56
 -->
<template>
    <section class="project-content">
        <div class="nav">
            <breadcrumb>
                <breadcrumb-item :to="{name:'project'}">我的项目</breadcrumb-item>
                <!-- <breadcrumb-item :to="{name:'home'}">Components</breadcrumb-item> -->
            </breadcrumb>
            <i-button @click="isShowAdd=!isShowAdd">新增</i-button>
        </div>
        <div class="project">
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
        </div>

        <modal v-model="isShowAdd" title="创建新的项目" width="1000">
            <i-form label-position="top" :model="formData" :rules="ruleCustom">
                <form-item label="项目名称" prop="titel">
                    <i-input type="text" v-model="formData.title" placeholder="请输入项目名称"></i-input>
                </form-item>
                <form-item label="项目描述">
                    <i-input type="text" placeholder="请输入项目描述"></i-input>
                </form-item>
                <form-item label="请求头类别">
                    <i-select clearable>
                        <i-option v-for="item in headerSelectData" :key="item.label" :value="item.value">{{item.label}}
                        </i-option>
                    </i-select>
                </form-item>
            </i-form>
        </modal>
    </section>
</template>
<script>
    import ProjectItem from "@/components/ProjectItem.vue"
    export default {
        data() {
            return {
                //表单对象
                formData: {
                    titel: ""
                },
                //验证对象
                ruleCustom: {
                    titel: [{
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }],
                },
                isShowAdd: false, //显示新增窗口
                headerSelectData: [ //请求头常用方式
                    {
                        label: "application/x-www-form-urlencoded",
                        value: "application/x-www-form-urlencoded"
                    },
                    {
                        label: "multipart/form-data",
                        value: "multipart/form-data"
                    },
                    {
                        label: "application/json",
                        value: "application/json"
                    }
                ],
                item: {
                    title: "演示项目"
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

        .nav {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
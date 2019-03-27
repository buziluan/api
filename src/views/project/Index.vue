<!--
 * @Description: 我的项目首页
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-22 23:35:40
 * @LastEditTime: 2019-03-27 12:52:18
 -->
<template>
    <section class="project-content">
        <div class="nav">
            <breadcrumb>
                <breadcrumb-item :to="{name:'myproject'}">我的项目</breadcrumb-item>
                <!-- <breadcrumb-item :to="{name:'detail'}">项目</breadcrumb-item> -->
            </breadcrumb>
            <i-button @click="isShowAdd=!isShowAdd">新增</i-button>
        </div>
        <div class="project">
            <router-view />
        </div>
        <modal v-model="isShowAdd" title="创建新的项目" width="500" :loading="true" @on-ok="handleClickAdd">
            <i-form label-position="top" :model="formData" :rules="ruleCustom">
                <form-item label="项目名称" prop="titel">
                    <i-input type="text" v-model="formData.title" placeholder="请输入项目名称"></i-input>
                </form-item>
                <form-item label="项目描述" prop="describe">
                    <i-input type="text" v-model="formData.describe" placeholder="请输入项目描述"></i-input>
                </form-item>
                <form-item label="项目根路径" prop="baseurl">
                    <i-input type="text" v-model="formData.baseurl" placeholder="请输入项目根路径">
                        <span slot="prepend">/</span>
                    </i-input>
                </form-item>
                <form-item label="是否公开" prop="public">
                    <i-select type="text" v-model="formData.public">
                        <i-option value="public">公开</i-option>
                        <i-option value="private">私有</i-option>
                    </i-select>
                </form-item>
            </i-form>
        </modal>
    </section>
</template>
<script>
    import {
        setTimeout
    } from 'timers';
    export default {
        data() {
            return {
                //表单对象
                formData: {
                    titel: "",
                    describe: "",
                    baseurl: "",
                    public: ""
                },
                //验证对象
                ruleCustom: {
                    titel: [{
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }],
                    describe: [{
                        required: true,
                        message: '项目描述不能为空',
                        trigger: 'blur'
                    }],
                    baseurl: [{
                        required: true,
                        message: '项目根目录不能为空',
                        trigger: 'blur'
                    }],
                    public: [{
                        required: true,
                        message: '项目是否公开',
                        trigger: 'change'
                    }],
                },
                //显示新增窗口
                isShowAdd: false,
                item: {
                    title: "演示项目"
                }
            }
        },
        components: {},
        methods: {
            handleClickAdd() {
                setTimeout(() => {
                    this.$Message.success({
                        content: "创建成功"
                    })
                    this.isShowAdd = false
                }, 3000)
            }
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
            align-items: center;
        }
    }
</style>
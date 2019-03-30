<!--
 * @Description: 我的项目首页
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-22 23:35:40
 * @LastEditTime: 2019-03-30 23:38:26
 -->
<template>
    <section class="project-content">
        <div class="nav">
            <breadcrumb>
                <breadcrumb-item :to="{name:'myproject'}">我的项目</breadcrumb-item>
                <!--  <breadcrumb-item :to="{name:'detail'}">演示项目</breadcrumb-item> -->
            </breadcrumb>
            <i-button @click="isShowAdd=!isShowAdd">创建新项目</i-button>
        </div>
        <div class="project">
            <router-view />
        </div>
        <modal v-model="isShowAdd" title="创建新的项目" width="500" :loading="true" @on-ok="handleClickAdd">
            <i-form label-position="top" ref="form" :model="formData" :rules="ruleCustom">
                <form-item label="项目名称" prop="name">
                    <i-input type="text" v-model="formData.name" placeholder="请输入项目名称"></i-input>
                </form-item>
                <form-item label="项目描述" prop="description">
                    <i-input type="text" v-model="formData.description" placeholder="请输入项目描述"></i-input>
                </form-item>
                <form-item label="项目根路径" prop="baseUrl">
                    <i-input type="text" v-model="formData.baseUrl" placeholder="请输入项目根路径">
                        <span slot="prepend">/</span>
                    </i-input>
                </form-item>
                <form-item label="是否公开" prop="open">
                    <i-select type="text" v-model="formData.open">
                        <i-option value="1">公开</i-option>
                        <i-option value="0">私有</i-option>
                    </i-select>
                </form-item>
            </i-form>
        </modal>
    </section>
</template>
<script>
    import {
        addPro
    } from "../../api/index.js"
    import {
        ADD_PROJECT
    } from "../../store/mutation-types.js"
    export default {
        data() {
            return {
                //表单对象
                formData: {
                    name: "",
                    description: "",
                    baseUrl: "",
                    open: 0
                },
                //验证对象
                ruleCustom: {
                    name: [{
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }],
                    description: [{
                        required: true,
                        message: '项目描述不能为空',
                        trigger: 'blur'
                    }],
                    baseUrl: [{
                        required: true,
                        message: '项目根目录不能为空',
                        trigger: 'blur'
                    }],
                    open: [{
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
            async handleClickAdd() {
                let validate = await this.$refs.form.validate()
                if (validate) {
                    try {
                        let data = this.formData;
                        let res = await addPro(data, "POST")
                        this.$store.commit(ADD_PROJECT, {
                            project: res.data.data
                        })
                        this.$Message.success({
                            content: "创建成功"
                        })
                        this.$refs.form.resetFields();

                    } catch (error) {
                        this.$Message.error({
                            content: "服务器异常"
                        })
                    } finally {
                        this.isShowAdd = false
                    }
                }
            }
        },
        created() {

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
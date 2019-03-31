<!--
 * @Description: 项目组件
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-23 17:30:42
 * @LastEditTime: 2019-03-31 18:05:01
 -->
<template>
    <div>
        <card class="item">
            <div slot="title" class="item-title">
                {{data.name}}
            </div>
            <div class="item-content">
                <div class="describe">
                    {{data.description}}
                </div>
                <div class="baseurl">
                    /{{data.baseUrl}}
                </div>
                <div class="own">
                    <img :src="data.open==1?require('../assets/public.svg'):require('../assets/private.svg')" alt="">
                </div>
                <div class="operation">
                    <button-group>
                        <i-button icon="ios-eye" @click="toDetail(data.shorthand)">查看</i-button>
                        <i-button icon="ios-trash-outline" @click="handleClickDelete(data)">删除</i-button>
                    </button-group>
                </div>
            </div>
        </card>
    </div>
</template>
<script>
    import {
        handlePro
    } from "../api/index.js"
    import {
        DELETE_PROJECT
    } from "../store/mutation-types.js"
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        computed: {
            //项目列表
            list() {
                return this.$store.state.projectList
            }
        },
        methods: {
            //进入详情页面
            toDetail(id) {
                this.$router.push({
                    path: 'detail/' + id
                })
            },
            //删除项目操作
            async deleteProject(shorthand) {
                try {
                    let res = await handlePro(shorthand, "DELETE")
                    if (res.data.code == 0) {
                        let i = 0
                        this.list.forEach((item, index) => {
                            if (item.shorthand == shorthand) {
                                i = index
                            }
                        })
                        this.$store.commit(DELETE_PROJECT, i)
                        this.$Message.info('删除成功');
                    }

                } catch (error) {
                    this.$Message.error({
                        content: "服务器异常，删除失败"
                    })
                } finally {
                    this.$Modal.remove();
                }


            },
            //点击删除按钮弹出提示
            handleClickDelete(data) {
                this.$Modal.confirm({
                    title: '删除项目',
                    content: `是否确认删除${data.name}`,
                    loading: true,
                    onOk: () => {
                        this.deleteProject(data.shorthand)
                    }
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .item {
        width: 100%;
        margin-bottom: 20px;
        // cursor: pointer;

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
        justify-content: space-between;

        .describe {
            width: 100%;
            height: 90px;
            line-height: 30px;
            overflow-y: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin: 0 auto;
            margin-bottom: 10px;
            background-color: rgb(245, 245, 245);
            padding: 0 5px 0 5px;
            border-radius: 7px;
            color: black;
        }

        .baseurl {
            width: 100%;
            height: 30px;
            line-height: 30px;
            margin: 0 auto;
            background-color: rgb(245, 245, 245);
            padding: 0 10px 0 10px;
            border-radius: 7px;
            color: black;
        }

        .own {
            width: 100%;
            height: 30px;
            margin-top: 15px;

            img {
                height: 30px;
            }
        }

        .operation {
            margin-top: 10px;
            width: 100%;
            text-align: center;
        }
    }
</style>
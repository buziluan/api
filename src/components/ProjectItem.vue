<!--
 * @Description: 项目组件
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-23 17:30:42
 * @LastEditTime: 2019-03-27 12:50:04
 -->
<template>
    <div>
        <card class="item">
            <div slot="title" class="item-title">
                {{data.title}}
            </div>
            <div class="item-content">
                <div class="describe">
                    这个是描述。 这个是描述。
                </div>
                <div class="baseurl">
                    /close
                </div>
                <div class="own">
                    <img :src="require('../assets/public.svg')" alt="">
                </div>
                <div class="operation">
                    <button-group>
                        <i-button icon="ios-eye" @click="toDetail">查看</i-button>
                        <i-button icon="ios-trash-outline">删除</i-button>
                    </button-group>
                </div>
            </div>
        </card>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        methods: {
            //进入详情页面
            toDetail() {
               this.$router.push({path:'detail',params:{id:1}})
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
            height: 30px;
            line-height: 30px;
            overflow-y: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            margin: 0 auto;
            margin-bottom: 10px;
            background-color: #515a6e;
            padding: 0 5px 0 5px;
            border-radius: 7px;
            color: white;
        }

        .baseurl {
            width: 100%;
            height: 30px;
            line-height: 30px;
            margin: 0 auto;
            background-color: #808695;
            padding: 0 10px 0 10px;
            border-radius: 7px;
            color: white;
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
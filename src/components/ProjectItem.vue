<!--
 * @Description: 项目组件
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-23 17:30:42
 * @LastEditTime: 2019-03-23 18:29:57
 -->
<template>
    <div>
        <card class="item">
            <div slot="title" class="item-title">
                {{data.title}}
            </div>
            <div class="item-content">
                <div class="description">
                    描述
                </div>
                <div>
                    url
                </div>
                <div>
                    属性
                </div>
                <div class="operation">
                    <ButtonGroup>
                        <Button>Yesterday</Button>
                        <Button>Today</Button>
                        <Button>Tomorrow</Button>
                    </ButtonGroup>
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
        }
    }
</script>
<style lang="less" scoped>
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
        padding: 10px;
    }
</style>
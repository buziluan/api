<!--
 * @Description: 我的项目
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-27 11:19:32
 * @LastEditTime: 2019-03-31 19:32:38
 -->
<template>
    <div class="main">
        <row :gutter="25" v-if="projectList.length">
            <transition-group name="list">
                <i-col :xl="4" :lg="6" :md="8" :sm="12" v-for="item in projectList" :key="item.shorthand">
                    <project-item :data="item" />
                </i-col>
            </transition-group>
        </row>
        <row v-else>
            <i-col span="24">
                <div class="notdata">
                    <img :src="require('../../assets/null.svg')" alt="">
                    <p>暂无项目</p>
                </div>
            </i-col>
        </row>
        <spin v-show="isSpin" fix />
    </div>
</template>
<script>
    import ProjectItem from "@/components/ProjectItem.vue"
    import {UPDATE_TOPRO} from "../../store/mutation-types.js"
    export default {
        components: {
            ProjectItem
        },
        data() {
            return {
                //项目集合
                list: [],
                //加载状态
                isSpin: false
            }
        },
        created() {
           this.$store.commit(UPDATE_TOPRO,false)
        },
        computed: {
            //项目集合
            projectList() {
                return this.$store.state.projectList;
            }
        },
        methods: {}
    }
</script>
<style lang="less" scoped>
    .main {
        position: relative;

        .notdata {
            width: 100%;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            font-size: 20px;
        }
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 1s;
    }

    .list-enter,
    .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
<!--
 * @Description: 首页
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-19 12:56:43
 * @LastEditTime: 2019-03-26 20:30:14
 -->
<template>

    <layout class="layout">
        <header>
            <i-menu mode="horizontal" theme="dark" active-name="1">
                <div class="menu">
                    <div class="menu-logo">
                        <p>三人行，必有我师</p>
                    </div>
                    <div class="menu-nav">
                        <menu-item name="1" :to="{name:'project'}">
                            <Icon type="ios-folder-open" />
                            我的项目
                        </menu-item>
                        <menu-item name="2" :to="{name:'test'}">
                            <Icon type="ios-build" />
                            我的配置
                        </menu-item>
                        <submenu name="3">
                            <template slot="title">
                                <Icon type="md-person" />
                                我的信息
                            </template>
                            <menu-item name="3-1">编辑</menu-item>
                            <menu-item name="3-2" :to="{name:'logout'}">退出</menu-item>
                        </submenu>
                    </div>
                </div>
            </i-menu>
        </header>
        <content class="content">
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </content>

        <footer class="footer">三人行出品 ©2019 </footer>
    </layout>

</template>
<script>
    export default {

    }
</script>
<style lang="less" scoped>
    .layout {
        width: 100%;
        height: 100vh;
        //   background-image: url("../../assets/bg.jpg");
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: 100% 100%;

        .menu {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 50px 0 50px;

            .menu-logo {
                color: white;
                font-size: 30px;
                font-weight: 700;
                font-family: "楷体";
            }
        }

        .content {
            width: 100%;
            margin: 0 auto;
            height: calc(100vh - 120px);
            background-color: #F5F7FA;
            overflow: scroll;
            overflow-x: hidden;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        .footer {
            height: 60px;
            text-align: center;
            line-height: 60px;
            background-color: #515a6e;
            color: white;
            font-size: 16px;
            font-family: "宋体";
        }
    }
</style>
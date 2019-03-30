<!--
 * @Description: 登录页面
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-03-25 19:11:06
 * @LastEditTime: 2019-03-31 00:18:06
 -->
<template>
    <div class="wrap">

        <div class="login">
            <div class="title">
                <span> 三人行文档</span>
            </div>
            <i-input type="text" v-model="username" placeholder="用户名" class="input"></i-input>
            <i-input type="password" placeholder="密码" v-model="password" @on-enter="handleClickSubmit" class="input">
            </i-input>
            <i-button type="success" :loading="isLoading" @click="handleClickSubmit">登录</i-button>
        </div>
        <div class="bottom">

        </div>
    </div>
</template>
<script>
    import {
        Login
    } from "../../api/index.js"
    export default {
        data() {
            return {
                username: "", //用户名
                password: "", //密码
                isLoading: false, //按钮加载
            }

        },
        methods: {
            //提交方法
            async handleClickSubmit() {
                try {
                    this.isLoading = true;
                    let params = {
                        loginName: this.username,
                        password: this.password
                    };
                    if (!this.username) {
                        this.$Message.error({
                            content: "用户名不能为空"
                        })
                        this.isLoading = false
                        return
                    }
                    if (!this.password) {
                        this.$Message.error({
                            content: "密码不能为空"
                        })
                        this.isLoading = false
                        return
                    }
                    let res = await Login(params, "POST", {
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[
                                        it]) +
                                    '&'
                            }
                            return ret
                        }],
                        headers: {
                            "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
                        }
                    })

                    sessionStorage.setItem("token",res.data)
                    this.isLoading = false
                    if (res.status === 200) {
                        this.$Message.success({
                            content: "登录成功"
                        })
                        this.$router.replace({
                            path: '/home'
                        })
                       
                    } else {
                        this.$Message.success({
                            content: "用户密码错误"
                        })
                    }

                } finally {
                    this.isLoading = false
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .wrap {
        width: 100vw;
        height: 100vh;
        background-image: url("../../assets/bg.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: top left;
        padding-top: 200px;

        .login {
            width: 400px;
            height: 400px;
            margin: 0px auto;
            padding: 30px;
            border-radius: 20px;
            display: flex;
            flex-direction: column;

            .input {
                margin-bottom: 30px;
            }

            .title {
                line-height: 30px;
                font-size: 34px;
                font-family: "楷体";
                text-align: center;
                margin-bottom: 40px;
                color: white;
            }

            /deep/ .ivu-input {
                height: 40px;
            }

            /deep/ .ivu-btn {
                height: 40px;
            }
        }
    }
</style>
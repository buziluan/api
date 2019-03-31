import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/home/Home.vue"
Vue.use(Router)

//创建一个路由
const router = new Router({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes: [{
            path: "/home",
            component: Home,
            children: [{
                    path: "project",
                    component: () => import("@/views/project/Index.vue"),
                    children: [{
                        path: "me",
                        name: "myproject",
                        component: () => import("@/views/project/MyProject.vue"),
                    }, {
                        path: "",
                        redirect: {
                            name: 'myproject'
                        }
                    }, {
                        path: "detail/:id",
                        name: "detail",
                        component: () => import("@/views/details/ProjectDetail.vue"),
                        beforeRouteLeave(to, from, next) {
                            this.$store.commit('UPDATE_MODULES', {
                                module: []
                            })
                            next()
                        }
                    }]
                },
                {
                    path: "",
                    redirect: {
                        name: 'myproject'
                    }
                },
                {
                    path: "test",
                    name: 'test',
                    component: () => import("@/views/test/Test.vue")
                }
            ]
        },
        {
            path: "/",
            redirect: "login"
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/login/Login.vue")
        },
        {
            path: "logout",
            name: "logout",
            beforeEnter: (to, from, next) => {
                window.sessionStorage.clear()
                router.replace({
                    name: 'login'
                })
                next()
            }
        },
        {
            path: "*",
            redirect: "login"
        },
    ]
})

//全局前置守卫
router.beforeEach((to, from, next) => {
    let token = window.sessionStorage.getItem("token")
    if (to.name == 'login') {
        next()
    } else {
        if (token == null) {
            router.replace({
                name: 'login'
            })
        }
        next()
    }
})

//全局后置守卫
router.afterEach(() => {
    let token = window.sessionStorage.getItem("token")
    if (token == null) {
        router.replace({
            name: 'login'
        })
    }
})

export default router
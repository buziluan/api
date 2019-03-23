import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/home/Home.vue"
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            component: Home,
            children: [{
                    path: "/myproject",
                    name: "project",
                    component: () => import("@/views/project/Index.vue")
                },
                {
                    path: "",
                    redirect: {
                        name: 'project'
                    }
                },
                {
                    path: "test",
                    name:'test',
                    component: () => import("@/views/test/Test.vue")
                }
            ]
        },
        {
            path: "/",
            redirect: "home"
        }
    ]
})
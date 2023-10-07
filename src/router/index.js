import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component:Main,
        name:'Main',
        redirect:'/home',
        children:[
            // { path: '/home' ,name:"home" ,component: Home},
            // { path: '/user' ,name:"user" ,component: User},
            // { path: '/mall' ,name:"mall" ,component: Mall},
            // { path: '/page1' ,name:"page1" ,component: PageOne},
            // { path: '/page2' ,name:"page2" ,component: PageTwo}
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = new VueRouter({
    routes
})

export default router
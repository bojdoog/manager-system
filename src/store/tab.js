import Cookies from "js-cookie";
export default {
    state: {
        isCollapse: false, //控制菜单折叠
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }, // 面包屑数据
        ],
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            console.log(val, 'val');
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                // 如果不存在
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        closeTag(state, item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index, 1)
        },
        // 动态设置menu的数据
        setMenu(state, val) {
            state.menu = val
            Cookies.set('menu', JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state, router) {
            // 判断缓存中是否有数据
            if (!Cookies.get('menu')) return
            const menu = JSON.parse(Cookies.get('menu'))
            state.menu = menu
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    // item.children 新数组
                    item.children = item.children.map(item2 => {
                        item2.component = () => import(`../views/${item2.url}`)
                        return item2
                    })
                    console.log(item.children);
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray, 'menuArray');
            // 路由动态添加
            menuArray.forEach(item => {
                // item:子路由
                router.addRoute('Main', item)
                console.log(item);
            })
            console.log(router, 'router');
        }
    }
}
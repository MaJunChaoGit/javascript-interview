### Vue-Router导航解析过程

Vue-Router分为三种类型的钩子函数

1. 全局钩子函数

   通过Vue-Router实例中的beforeEach和afterEach函数我们可以对所有的路由进行跳转的前后控制

2. 路由独享钩子函数

   通过在单独的路由对象配置beforeEnter钩子可以对当前路由进行一些前置的操作,如权限验证等

3. 组件内钩子函数

   在组件对象中可以有三种路由钩子,并且此钩子只针对当前组件

   - beforeRouteEnter

     在渲染组件对应的路由被confirm前调用,此时无法访问this.如果需要使用this,可以通过next回调函数进行使用

   - beforeRouteUpdate

     当前的路由改变时被调用,有点类似于监听hashchange函数.比如用户的id产生变化时进行调用

   - beforeRouteLeave

     当前路由即将跳转时调用



整个解析过程大致为

1. 首先导航被触发
2. 所有失活的组件里内部beforeRouteLeave
3. 调用全局的beforEach
4. 如果有组件重用的话,会调用beforeRouteUpdate
5. 调用路由独享钩子beforeEnter
6. 解析异步路由组件
7. 在被激活的组件中调用beforeRouteEnter
8. 调用全局的beforeResolve
9. 导航被confirm
10. 调用全局的afterEach
11. 触发DOM的更新
12. 用创建好的实例传入beforeRouteEnter的回调函数next中
### Vue-Router面试题

1. **$router和\$route的区别**

   $router是Vue-Router的实例对象,我们通过他来进行路由的配置,钩子函数等.

   $route是路由信息对象,他记录的Vue-Router中跳转带入的参数等信息,如name,query,params这些

2. **完整的 Vue-Router 导航解析流程**

   已有文章

3. **Vue-Router的及参数传递**

   已有文章

4. **Vue-Router实现路由懒加载**

   懒加载的实现原理是在需要的时候进行建\<script>标签,并通过src属性加载资源

   - 使用Vue的require异步组件
   - 使用import()方法
   - 使用webpack的require.ensure实现按需加载

5. **Vue-Router路由的两种模式实现原理**

   已有文章

6. **Vue-Router如何响应路由参数的变化？**

   当使用路由参数匹配时,原来的组件将被复用,也就是说,生命周期的钩子函数不会被触发.如果我们想要对路由参数的变化进行相应需要通过watch技术对$route对象进行监测





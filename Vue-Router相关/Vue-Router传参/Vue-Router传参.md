### Vue-Router传参与接收参数

Vue-Router传参主要有三种模式

1. 通过配置path来进行传参

   通过配置路由表中的path预定义参数,在跳转路由时保持路径上的一致即可

2. 通过params进行传参

   通过params对象进行参数传递,该方法类似于post请求表现形式,如果是直接刷新页面,将丢失参数信息

3. 通过query进行传参

   通过query对象进行参数传递时,参数会以get请求的表现形式体现在url上,该模式的好处是如果进行页面的刷新也不会对其造成影响



Vue-Router接收参数主要有三种模式

1. 通过命令式的\$route.params或\$route.query对象访问参数

   通过这样的方式访问参数对象会造成代码上的耦合

2. 通过props模式

   组件通过props接收传入的参数,这样减少了代码上的耦合性

3. 通过函数模式接收参数

   更加灵活,可以自己处理路由与props的逻辑
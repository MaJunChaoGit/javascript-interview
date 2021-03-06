### Vue中生命周期的理解

Vue的生命周期主要分为8个部分

1. **beforeCreate**

   在此阶段前会初始化事件和生命周期,此阶段下$el,\$data都为undefined


1. **created**

   此时实例已经完成数据劫持和事件配置的工作,然而由于挂载还没有开始,$el属性还是不可见,此阶段下可以拿到data的值,但是\$el还是为undefined

2. **beforeMount**

   在这个阶段之前首先会判断传入的参数是否有el选项,如果没有的话就会停止编译,直到等到手动调用$mount方法的时候继续该周期,如果有的话就会进行模板的渲染,模板渲染中会判断是否有template选项,如果有template的话会将其转换为render函数,如果没有template选项的话会将其外部HTML作为template进行编译转换.此时\$el中为虚拟DOM对象,并没有挂载到DOM树上.

3. **mounted**

   在这个阶段之前Vue会将el替换为vm.$el,并且挂载到DOM树上,触发mounted钩子.

4. **beforeUpdate**

   当数据发生变化时进入这个阶段,在这个阶段可以监听拦截数据的变化,但是并没有进行页面的渲染,变化的只是虚拟DOM.

5. **updated**

   在这个阶段之前虚拟DOM重新渲染完成,组件的状态已经为最新了,但是如果在此阶段对其数据进行操作时可能导致无限渲染.

6. **beforeDestory**

   实例销毁前进行调用,在这一步还是可以用this来获取到实例

7. **detoryed**

   在这个阶段之前Vue会卸载掉所有watcher和子组件还有事件监听,一般我们在这一步清除定时器和监听事件




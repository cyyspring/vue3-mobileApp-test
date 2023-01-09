## 项目适配
项目想使用 vw 可以使用插件 `npm install postcss-px-to-viewport --save-dev`
~~~js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
};
~~~
2. 移动端增加meta 源配置
~~~html
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />

~~~
## assets

### css 文件
1. `index.less` 中使用了 `normalize.css`,安装指令如下

~~~bash
npm install normalize.css
~~~
* 创建网页的时候活多或少的需要清除一些标签的自带样式方便我们创建页面例如{margin:0}
* 我们可以引入两种对css 重置预处理的方式reset.css/normalize.css
* 他们的共同点：都是重置样式库，增强浏览器的表现一致性
* 他们的不同点：
    * 举个例子：ul
    * reset.css   list-style:none ---因为需求
    * normalize.css 不会重置ul样式 ---本身已经在每个浏览器表现一致的元素

其作用都是增强浏览器的表现一致性但是**normalize**不会重置已经一致的元素

## components 文件

### tab-bar-common
1. `tab-bar-common.vue` 完全按照业务不做抽取动态组件编写，其中使用了`router-link` 提供的插槽形式，这种形式相当类似于`vue-router3.x` 的tag属性的表现形式，但`4.x` 该属性被移除，采用了更加具有灵活性的`v-slot`的方式来定制渲染的内容,注意`router-link` **默认a 是标签因此会出现a 标签包裹其他标签效果需要使用`custom` 属性**

2. 作用域插槽中使用的两个属性 `navigate`, `isExactActive`
* `navigate` ：触发导航的函数；当使用 custom 相当于不再是a 标签包裹想触发路由跳转可以采用函数编程的形式即'$router.push()' 但是作用域插槽中navigate 相当于帮你提供了这一过程函数封装
* `isExactActive`：是否是精准匹配的状态

3. 关于`img`标签src 使用图片地址，如果是纯静态引入图片可以发现是能够使用`@`作为路径拼接，但当动态路径时 需要以相对路径不能使用`@`作为别名
~~~html
<img
	:src="`src/assets/img/tabbar/tab_home${
	isExactActive ? '_active' : ''
	}.png`"
	alt=""
/>
~~~

### tab-bar-cpns
1. 自定义封装组件，主要注意点在 `vite` 使用动态图片上,在`webpack` 使用动态图片地址需要`require('地址')`,vite 这里推荐使用import.meta.url 是一个 ESM 的原生功能，会暴露当前模块的 URL，将它与原生的 URL 构造器 组合使用，在一个 JavaScript 模块中，通过相对路径我们就能得到一个被完整解析的静态资源 URL 可以参考`utils/load_assets.js` 这个方法注意的是`import.meta.url` 是从当前文件夹开始算
 
## router 文件夹
1. `vue-router4.x`  作为路由管理,这里 `index.js ` 作为项目对外暴露入口
2. 参考了vben 将绑定 部分封装了方法`setupRouter`, 使其注册调用时候更加语义化
~~~js
export default function setupRouter(app) {
  app.use(router);
}
~~~
1. `router` 这里没有使用重定向，而是用了`alias` ,作为用来定义路由别名的属性，可以当用户访问`/` 和 `/home` 时候都可以加载路由组件`@/views/home/index.vue`
~~~js
  {
      path: "/home",
      alias: "/",
      component: () => import("@/views/home/index.vue"),
    },
~~~
1. 配置属性`strict` 严格检查路径末尾不能有 `/` 匹配到路由组件 
   
## stores 文件夹
1. `stores`  文件用来定义 `pinia` 的全局状态管理,这里 `index.js ` 作为项目对外暴露入口
2. 参考了vben 将绑定 部分封装了方法`setupStore`, 使其注册调用时候更加语义化
~~~js
export default function setupStore(app) {
  app.use(pinia);
}
~~~



## views

### city
1. 可以发现 [city](./readmeImg/city.png) 路由的下半部分是没有导航栏，隐藏导航栏可以采用两种方法
* 使用js 的方式需要在路由 `router` 中的 `meta` 元素声明控制显示隐藏的变量，在`App.vue` 去获取信息来决定显示隐藏
~~~js

const route = useRoute();

const isShowTabBar = computed(() => route.meta.isShowTabBar);
~~~
* 另一种方式通过[css](./readmeImg/city%E5%9B%BE%E5%B1%82.png)，这种方式就是利用定位使用 基于`z-index` 形成覆盖,注意设置背景色
2. 在控制 展示底边时候最好使用`v-show` 防止出现一些声明周期重新渲染一类的错误
### detail
1. 详情这里要注意使用了 `$ref函数形式`收集了组件实例，官网中说到这种函数收集形式`会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数`，会发现每次当触发页面`showTabControl`导致，因此为了保证不重复触发使用 `v-memo`
2. 使用 `$ref函数形式`收集 要注意卸载的时候也会触发因此做了非空判断
~~~js
const getSectionRef = (value) => {
  if (!value) return; // 卸载时候也会触发做非空判断
  const name = value.$el.getAttribute("name");
  sectionEls.value.push({ name, el: value.$el });
};
~~~
3. 点击tab 时候需要到指定的位置`offsetTop` 来记录每个组件实际要滚动的距离 `behavior: "smooth"` 可以设置滚动的动效
4. 滚动时候使用到了一个计算公式在一个有序数组中 找到当前值接近的最小值 所在的位置index
~~~js
    const values = [100, 300, 500, 800, 1000]

    // 封装函数: 根据value去匹配索引
    function matchIndex(currentValue) {
      // 核心代码
      let currentIndex = values.length - 1

      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        if (value > currentValue) {
          currentIndex = i - 1
          break
        }
      }
      if (currentIndex === -1) return
      console.log("value:", currentValue, "index:", currentIndex)
    }
~~~
5. tab 可以直接使用vant 提供封装好的
## hooks 封装

### useInit.js
使用hooks 不一定只能使用回调，也可定义变量，在组件使用时候通过 `watch` 监听值变量进行触发

# 注意点
滚动时候最好使用自己容器滚动，使用window 全局滚动要注意在不用的时候卸载事件



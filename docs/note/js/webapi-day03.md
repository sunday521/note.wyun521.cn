## webapi-day03

### 事件进阶

#### 事件流

`事件流` 是事件在执行过程中完整的传播路径

当触发一个事件时，会依次经历事件捕获、事件冒泡两个阶段，如下图所示：

![image-20230825192754714](https://post-src.wyun521.top/images/image-20230825192754714.png)

> 同名事件在捕获阶段从父到子传播，在冒泡阶段从子到父传播

##### 事件捕获

`事件捕获`：一个元素的事件被触发时，是先从 HTML 的根元素开始依次向下传播的

父元素的同名事件默认会在冒泡阶段被触发，我们可以在事件监听中传入一个参数值 true ，让事件在捕获阶段触发

![image-20230825195041158](https://post-src.wyun521.top/images/image-20230825195041158.png)

```js
father.addEventListener(
  "click",
  function () {
    alert("我是爸爸");
  },
  true
); //true 在捕获阶段触发
son.addEventListener("click", function () {
  alert("我是儿子");
});
```

![buhuo-demo](https://post-src.wyun521.top/images/buhuo-demo.gif)

##### 事件冒泡

`事件冒泡`：当子元素触发事件后，会依次向上调用所有父级元素的 `同名事件`

```js
father.addEventListener(
  "click",
  function () {
    alert("我是爸爸");
  },
  false //在冒泡阶段触发（默认）
);
son.addEventListener("click", function () {
  alert("我是儿子");
});
```

![maopao-demo](https://post-src.wyun521.top/images/maopao-demo.gif)

**阻止事件冒泡**

事件冒泡的存在，容易影响到父级元素。有时我们需要阻止事件冒泡的向上传播

`e.stopPropagation()` 可以阻止同名事件的继续传播（一般是阻止向上冒泡）

```js
father.addEventListener("click", function () {
  alert("我是爸爸");
});
son.addEventListener("click", function (e) {
  alert("我是儿子");
  e.stopPropagation();
});
```

![maopao-zuzhi](https://post-src.wyun521.top/images/maopao-zuzhi.gif)

> 事件冒泡并不总是有害的，有时我们可以利用这个特性，比如下面的事件委托

**阻止事件默认行为**

`e.preventDefault()` 可以阻止事件触发时的默认行为，如链接跳转，表单提交等

```js
a.addEventListener("click", function (e) {
  // 阻止链接跳转
  e.preventDefault();
});
form.addEventListener("submit", function (e) {
  // 如果input表单的值为空则不允许提交
  if (input.value === "") {
    e.preventDefault();
  }
});
```

##### 解绑事件

`解绑事件`：移除事件绑定的事件处理函数，也叫移除事件监听

| 事件监听版本 | 解绑方式                                        |
| ------------ | ----------------------------------------------- |
| L0           | box.onclick = null                              |
| L2           | box.removeEventListener(事件类型，事件处理函数) |

```js
// 需求：按钮只能点击一次
// L0版本
btn2.onclick = function () {
  alert("我被点击了~");
  // 移除事件监听
  btn2.onclick = null;
};
// L2版本
function fn() {
  alert("我被点击了~");
  // 移除事件监听
  btn.removeEventListener("click", fn);
}
btn.addEventListener("click", fn);
```

> L2 版本的事件监听如果事件处理函数是匿名函数则无法解绑

#### 事件委托

`事件委托`：利用事件流的特点，将原本需要注册在子元素上的事件注册在父元素身上。当我们操作子元素的时候，会冒泡到父元素身上，从而触发父元素中的事件

优点：减少注册次数，提高程序性能

```js
// 需求：点击每个小li都会有弹窗效果
const ul = document.querySelector("ul");
ul.addEventListener("click", function (e) {
  alert("我被点击了~");
});
```

上面的代码有个问题，因为我们是给 ul 注册的事件，所以点击 ul 也会有弹窗

解决办法是使用 `e.target` 获取真正触发事件的那个元素，然后加一层判断

```js
// 需求：点击哪个小li，对应的li变色
// 如果点击的是ul，不会有效果
const ul = document.querySelector("ul");
ul.addEventListener("click", function (e) {
  // e.target得到真正触发事件的目标元素
  console.log(e.target);
  if (e.target.tagName === "LI") {
    e.target.style.color = "red";
  }
});
```

![e-target](https://post-src.wyun521.top/images/e-target.gif)

**eg.Tab 栏切换的委托版本**

```js
// 把事件委托给父元素ul
ul.addEventListener("mouseover", function (e) {
  if (e.target.tagName === "A") {
    // 导航栏样式切换
    ul.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    // item内容展示切换
    const index = e.target.dataset.id;
    document.querySelector(".tab-content .active").classList.remove("active");
    items[index].classList.add("active");
  }
});
```

![tab-toggle](https://post-src.wyun521.top/images/tab-toggle.gif)

#### 其他事件

##### 页面加载事件

- `load`：页面加载完成事件（耗时）

- `DOMContentLoaded`：html 结构加载完成事件

```js
// load 等待所有的外部资源加载完毕后触发，包括图片、外部的css等等
window.addEventListener("load", function () {
  console.log("页面全部资源加载完毕");
});

// DOMContentLoaded HTML文档加载完毕时就触发，不需要等待外部的图片、css等等
document.addEventListener("DOMContentLoaded", function () {
  console.log("HTML文档加载完毕");
});
```

![image-20230826121347178](https://post-src.wyun521.top/images/image-20230826121347178.png)

##### 页面滚动事件

`scroll`：页面滚动事件，在页面滚动的时候持续触发

可以在页面滚动到某个区域后做一些处理， 比如固定导航栏，显示侧边栏等

- `document.documentElement`：获取 html 根元素

- `document.documentElement.scrollTop`：获取 html 元素向上滚动的距离（可读写）

![image-20230826180849645](https://post-src.wyun521.top/images/image-20230826180849645.png)

```js
window.addEventListener("scroll", function () {
  // 得到html标签滚动的距离（不带单位，可读写）
  console.log("我滚了：", document.documentElement.scrollTop);
  // 修改滚动的距离
  document.documentElement.scrollTop = 100;
});
```

![scroll](https://post-src.wyun521.top/images/scroll.gif)

**eg.显示电梯导航**

```js
// 当页面滚动距离大于300时显示电梯导航
window.addEventListener("scroll", function () {
  console.log(document.documentElement.scrollTop);
  let dst = document.documentElement.scrollTop;
  elevator.style.opacity = dst >= 300 ? 1 : 0;
});
```

**eg.回到顶部**

```js
// 回到顶部
const backTop = document.querySelector("#backTop");
backTop.addEventListener("click", function () {
  document.documentElement.scrollTop = 0;
});
```

```css
/* 让页面平滑地滚动 */
html {
  scroll-behavior: smooth;
}
```

![tu-one](https://post-src.wyun521.top/images/tu-one.gif)

##### 页面尺寸变化事件

`resize`：页面尺寸变化事件

```js
window.addEventListener("resize", function () {
  console.log("页面尺寸改变~");
});
```

查看 `flexible.js` 源码，我们现在可以知道它是如何修改灵活修改根字号大小的了：

![image-20230826154313472](https://post-src.wyun521.top/images/image-20230826154313472.png)

> 页面加载事件、页面滚动事件、页面尺寸改变事件的事件源都是 window 对象

#### 元素尺寸与位置

很多时候数据是变化的，我们可以通过 js 的方式，得到元素在页面中的位置和元素的实际大小

| 属性                     | 功能                                               | 特点   |
| ------------------------ | -------------------------------------------------- | ------ |
| scrollLeft/scrollTop     | 页面被卷去的左侧/顶部的距离                        | 可读写 |
| clientWidth/clientHeight | 元素大小，包含 content+padding                     | 只读   |
| offsetWidth/offsetHeight | 元素大小，包含 content+padding+border 和滚动条大小 | 只读   |
| offsetLeft/offsetTop     | 元素位置距离已定位父级左侧/顶部的距离              | 只读   |

**eg.B 站导航栏**

```js
// 需求：滑块跟随链接移动
// 把点击事件委托给父级
list.addEventListener("click", function (e) {
  // 如果点击的是a
  if (e.target.tagName === "A") {
    // 获取a距离屏幕左侧的距离
    let dst = e.target.offsetLeft;
    // 将滑块移动到这个距离
    line.style.transform = `translateX(${dst}px)`;
  }
});
```

![blibli](https://post-src.wyun521.top/images/blibli.gif)

**eg.小兔鲜电梯导航**

![image-20230826180104740](https://post-src.wyun521.top/images/image-20230826180104740.png)

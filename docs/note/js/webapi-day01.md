## webapi-day01

### webapi 介绍

> 通过对 JavaScript 基础语法的学习，我们已经能够动态地渲染页面内容了。在 webapi 阶段，我们会学习一系列操作页面元素的方法，并能够做出炫酷的页面交互效果

#### 什么是 API

`API(Application Programming Interface)`： 应用程序接口

在学习前期可以简单地把接口理解为对象中的方法，我们不需要关心接口内部如何实现，只需要调用它们实现需要的功能。 `webapi` 就是使用 JavaScript 提供的一系列方法去操作页面文档和浏览器

- DOM：文档对象模型
- BOM：浏览器对象模型

> 接口由官方定义、由各大浏览器厂商实现、最后交给开发者调用

#### 什么是 DOM

DOM 的核心思想就是把网页内容当做对象来处理，通过对象的属性和方法对网页内容进行操作（把标签解析成对象，把标签属性解析成对象的属性）。比如：

```html
<div id=''box''>我是盒子</div>
```

最后会被解析成：

```js
{
    id:"box",
    innerHTML="我是盒子"
    ... ...
}
```

我们可以使用 `console.dir()` 打印解析后的对象：

![image-20230823103722306](https://post-src.wyun521.top/images/image-20230823103722306.png)

> document 是 DOM 的顶级对象，也是页面文档的入口

#### 什么是 BOM

BOM 是浏览器对象模型，定义了一套操作浏览器窗口的 API

![image-20230824215727877](https://post-src.wyun521.top/images/image-20230824215727877.png)

> window 是 JavaScript 中的顶级对象，包含一些全局属性和方法，调用时可以省略 window

### DOM 基础操作

#### 获取 DOM 元素

##### querySelector

`querySelector()` ：获取满足条件的第一个元素，该方法返回一个对象

```js
const li = document.querySelector(".nav li");
```

> 如果没有找到满足条件的元素，返回 null

> 在使用 querySelector 和类名获取元素时，不要忘了加点！

##### querySelectorAll

`querySelectorAll()` ：获取满足条件的所有元素

```js
const lis = document.querySelectorAll(".nav li");
```

![image-20230823104802495](https://post-src.wyun521.top/images/image-20230823104802495.png)

该方法返回一个伪数组，数组中每个对象都是一个满足条件的 html 元素

> 如果没有找到满足条件的元素，返回一个空的伪数组

> 伪数组：有长度有索引可以遍历，但没有操作数组元素的方法

##### 其他方法

JavaScript 也提供了一些其他获取元素的方法：

![image-20230823105302247](https://post-src.wyun521.top/images/image-20230823105302247.png)

> 在使用这些方法时，不需要书写 CSS 选择器前缀

#### 操作 DOM 元素

##### 修改元素内容

使用 `innerHTML` 和 `innerText` 都可以操作元素内容

`innerHTML` ：

- 可以解析字符串中的 html 标签
- 保留字符串中的换行

`innerText `：

- 不能解析标签
- 将字符串中的换行解析为一个空格

下面是一个例子：

```js
const box = document.querySelector(".box");
const box2 = document.querySelector(".box2");
box.innerText = "<h1>迪丽热巴</h1>";
box2.innerHTML = "<h1>迪丽热巴</h1>";
```

![image-20230823112049955](https://post-src.wyun521.top/images/image-20230823112049955.png)

> 赋值为空字符串会清空元素中的所有内容

##### 修改元素原有属性

DOM 会把标签解析成对象，把标签属性解析成对象中的属性。因此我们可以直接用 `对象.属性=值` 的方式修改元素的原有属性

常见的原有属性有：

- `src`：图片地址
- `href`：链接地址
- `title`：提示文本
- `id`：元素唯一标识

```js
// 随机更换图片
let arr = [
  "./images/1.png",
  "./images/2.png",
  "./images/3.png",
  "./images/4.png",
];
const img = document.querySelector("img");
const random = Math.floor(Math.random() * arr.length);
img.src = arr[random];
```

![img-suiji](https://post-src.wyun521.top/images/img-suiji.gif)

##### 修改元素样式属性

**style**

语法：`元素.style.属性=属性值`

```js
box.style.width = "300px";
box.style.marginTop = "50px";
box.style.backgroundColor = "skyblue";
```

> 如果样式属性中包含中横线，需要转换为小驼峰命名法

> 这种方式是直接修改的行内样式，一般在修改单个样式属性时使用

**className**

当样式属性过多时，style 方式就会变的很繁琐

我们可以把多个样式放到一个 CSS 类选择器中，然后把这个类添加到元素身上，这就是 className 操作样式的核心思想

语法：`元素.className=类名字符串`

```html
<div class="main">123</div>
<script>
  const box = document.querySelector(".main");
  // box.className = "content"; //错误写法,原有类名被覆盖
  box.className = "main content"; // 或 box.className += " content";
</script>
```

> 为什么不用 class 获取类名？因为 class 是类关键字，已经被占用了

> className 会覆盖原有类名，不推荐使用

**classList**

相比 className，使用 classList 添加类或许是一个更好的方式

- `元素.classList.add(类名字符串)`：追加类名
- `元素.classList.remove(类名字符串)`：移除类名
- `元素.classList.toggle(类名字符串)`：切换类名的有无
- `元素.classList.contains(类名字符串)`：判断类名是否存在

> classList 不会覆盖已有的类名，推荐使用！

##### 修改表单相关属性

- `元素.type`：修改表单元素的类型
- `元素.value`：修改表单元素的值
- `元素.checked`：是否选中
- `元素.disabled`：是否禁用

```html
<input type="text" name="username" value="abc" />
<button>按钮</button>
<input type="checkbox" name="agree" />
```

```js
// 修改输入框类型和值
const input = document.querySelector("input[name=username]");
input.value = "123";
input.type = "password";
// 禁用按钮
const button = document.querySelector("button");
button.disabled = true;
// 选择按钮
const multSelect = document.querySelector("input[type=checkbox]");
multSelect.checked = true;
```

![image-20230823212521821](https://post-src.wyun521.top/images/image-20230823212521821.png)

##### 修改自定义属性

自定义属性可以暂时存储数据供 JavaScript 使用：

使用 `元素.dataset` 可以获取元素所有自定义属性的集合(一个对象)

![image-20230824223111934](https://post-src.wyun521.top/images/image-20230824223111934.png)

> html5 规定自定义属性必须使用 `data-` 前缀， `元素.dataset` 返回一个对象，是元素所有自定义属性的集合

### 定时器

定时器可以每隔一段时间自动执行一次代码：

- `setInterval(fn,ms)`：间隔函数，每隔一段时间执行一次
- `setTimeout(fn,ms)`：延迟函数，等待一段时间后执行一次（仅一次）
- `clearInterval(timer)/clearTimeout(timer)`：停止一个定时器

```js
// 使用定时器在控制台打印3次hello
let num = 0;
let fn = function () {
  num++;
  if (num >= 3) {
    clearInterval(timer);
  }
  console.log("hello");
};
let timer = setInterval(fn, 1000);
```

> setInterval 和 setTimeout 都是由 window 顶级对象直接调用的

> setInterval 和 setTimeout 都会返回一个定时器 ID，以便清除定时器

> fn 是一个回调函数，在 setInterval/setTimeout 中做参数，不需要加小括号（不是函数调用）

**回调函数**

一个函数在另一个函数中做参数，这个函数就是回调函数。比如：

![image-20230824210703515](https://post-src.wyun521.top/images/image-20230824210703515.png)

> 回调函数通常是一个匿名函数

**综合案例**

```js
// 初始数据
const sliderData = [
    {
        url: "./images/slider01.jpg",
        title: "对人类来说会不会太超前了？",
        color: "rgb(100, 67, 68)",
    },
	... ...
];
// 1.获取元素
const img = document.querySelector(".slider-wrapper img");
const p = document.querySelector(".slider-footer p");
const footer = document.querySelector(".slider-footer");

let i = 0;
function change() {
    i++;
    i = i >= sliderData.length ? 0 : i;
    // 2.更改元素样式
    img.src = sliderData[i].url;
    p.innerHTML = sliderData[i].title;
    footer.style.backgroundColor = sliderData[i].color;
    // 移动小圆点
    document
        .querySelector(`.slider-indicator li.active`)
        .classList.remove("active");
    const li = document.querySelector(
        `.slider-indicator li:nth-child(${i + 1})`
    );
    li.classList.add("active");
}
// 定时器自动轮播
setInterval(change, 1000);
```

![lunbo-auto2](https://post-src.wyun521.top/images/lunbo-auto2.gif)

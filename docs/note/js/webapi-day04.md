## webapi-day04

### Date 日期对象

#### Date 的实例化

Date 是 JavaScript 内置的日期对象，用来表示日期和时间

使用 `new` 关键字实例化一个 Date 对象：

```js
// 1.获取当前日期/时间
const date = new Date();
console.log(date);
// 2.获取指定日期/时间
const date2 = new Date("2000-07-07 09:00:00");
console.log(date2);
// 3.获取指定日期/时间（使用时间戳）
const date3 = new Date(1693099960313);
console.log(date3);
```

![image-20230827093539833](https://post-src.wyun521.top/images/image-20230827093539833.png)

#### Date 的格式化

日期方法允许您获取并设置日期值（年、月、日、时、分、秒、毫秒）：

| 方法          | 描述                                        |     |
| ------------- | ------------------------------------------- | --- |
| getFullYear() | 年份 (四位数字)                             |     |
| getMonth()    | 月份 (0 ~ 11)，获取时要加一                 |     |
| getDate()     | 天 (1 ~ 31)                                 |     |
| getHours()    | 小时 (0 ~ 23)                               |     |
| getMinutes()  | 分钟 (0 ~ 59)                               |     |
| getSeconds()  | 秒 (0 ~ 59)                                 |     |
| getDay()      | 周几 (0 ~ 6)，0 代表周日                    |     |
| getTime()     | 时间戳，从 1970-01-01 00:00:00 至今的毫秒数 |     |

```js
const date = new Date();
console.log("Date:", date);
console.log("year:", date.getFullYear());
console.log("month:", date.getMonth() + 1); // 月份从0开始，0代表一月
console.log("date:", date.getDate());
console.log("day:", date.getDay()); // 0代表周日
console.log("hours:", date.getHours());
console.log("minutes:", date.getMinutes());
console.log("seconds:", date.getSeconds());
console.log("time:", date.getTime());
```

![image-20230827094024133](https://post-src.wyun521.top/images/image-20230827094024133.png)

> 月份是从 0 开始的，所以获取时别忘了加一！

> 使用这些方法拼接字符串，可以自定义格式化后的日期形式

**Date 对象的格式化**

JavaScript 提供了一些格式化 Date 对象的方法:

![image-20230827100304936](https://post-src.wyun521.top/images/image-20230827100304936.png)

```js
const date = new Date();
console.log(date);
console.log(date.toLocaleString()); // 日期加时间
console.log(date.toLocaleDateString()); //日期
console.log(date.toLocaleTimeString()); //时间
```

![image-20230827100605953](https://post-src.wyun521.top/images/image-20230827100605953.png)

> [点击查阅 Date 对象的详细用法](https://www.w3school.com.cn/js/js_dates.asp)

#### 时间戳

`时间戳`：从 1970-01-01 00:00:00 至今的毫秒数

**获取时间戳的三种方式**

| 方法           | 特点                               |
| -------------- | ---------------------------------- |
| +new Date()    | 本质是转换为数字，推荐使用         |
| date.getTime() | 需要先实例化一个 Date 对象         |
| Date.now()     | 只能得到当前的时间戳（无需实例化） |

**eg.倒计时案例**

利用时间戳可以计算两个时间之间的差值，实现倒计时效果：

![image-20230827102152117](https://post-src.wyun521.top/images/image-20230827102152117.png)

```js
function getTimer() {
  // 截止时间戳（ms）
  const endTime = +new Date("2023-08-27 12:30:00");
  // 当前时间戳（ms）
  const nowTime = +new Date();
  // 剩余秒数（s）
  const count = (endTime - nowTime) / 1000;
  console.log(count);
  // 计算剩余时间
  let h = parseInt((count / 60 / 60) % 24);
  let m = parseInt((count / 60) % 60);
  let s = parseInt(count % 60);
  // 不足补0
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  // 渲染到页面上
  document.querySelector("#hour").innerHTML = h;
  document.querySelector("#minutes").innerHTML = m;
  document.querySelector("#second").innerHTML = s;
}

// 先调用一次
getTimer();
// 开启定时器
setInterval(function () {
  getTimer();
}, 1000);
```

![daojishi](https://post-src.wyun521.top/images/daojishi.gif)

### DOM 节点操作

#### 什么是 DOM 节点

`DOM节点`：将 HTML 文档以树状结构直观的表现出来，树中的每个元素都是一个节点(Node)

- 元素节点，如 html、body、div 等
- 属性节点，如 href、title 、class 等
- 文本节点，注释或标签内的文本

#### 操作 DOM 节点

我们可以利用节点之间的关系快速查找和操作节点：

| 属性/方法              | 描述                                     |
| ---------------------- | ---------------------------------------- |
| parentNode             | 查找直接父节点                           |
| children               | 查找所有子节点，返回一个伪数组           |
| nextElementSibling     | 查找下一个兄弟节点                       |
| previousElementSibling | 查找上一个兄弟节点                       |
| createElement()        | 创建新的节点（由 document 调用）         |
| prepend()              | 在父元素最后一个子节点之后，插入节点元素 |
| append()               | 在父元素第一个子节点之前，插入节点元素   |
| remove()               | 移除节点                                 |

> 查找 DOM 节点时如果找不到，会返回 null

> 我们现在常使用拼接字符串来渲染页面，尽量不操作 DOM 节点（耗能）

#### 重绘和回流

回流：DOM 树中部分或全部元素的尺寸、结构、布局等发生改变时，浏览器就会对 html 文档进行重排和渲染

重绘：元素样式的改变并不影响它在文档流中的位置和文档布局时(比如：color、background-color、 outline 等)，会触发重绘

![image-20230827174720522](https://post-src.wyun521.top/images/image-20230827174720522.png)

> 重绘不一定引起回流，而回流一定会引起重绘

### 移动端交互

#### 触摸事件

![image-20230827145100156](https://post-src.wyun521.top/images/image-20230827145100156.png)

#### Swiper 插件

[Swiper](https://www.swiper.com.cn/) 是一个开源、免费、强大的 `触摸滑动插件`，常用于移动端网站的内容触摸滑动，能实现触屏焦点图、触屏 Tab 切换、触屏轮播图切换等常用效果。使用步骤：

1.  点此 [下载 Swiper3](https://3.swiper.com.cn/download/index.html) 提供的 css 和 js 文件

2.  在 [Swiper3 基础演示](https://3.swiper.com.cn/demo/index.html) 中找到你想要的效果，复制到代码中

3.  查阅 [Swiper3 官方文档](https://3.swiper.com.cn/api/index.html) 进行自定义配置

```js
// Swiper 配置举例
var mySwiper = new Swiper(".swiper-container", {
  direction: "vertical",
  // 循环轮播
  loop: true,
  // 如果需要分页器
  pagination: ".swiper-pagination",
  // 如果需要前进后退按钮
  nextButton: ".swiper-button-next",
  prevButton: ".swiper-button-prev",
  // 如果需要滚动条
  scrollbar: ".swiper-scrollbar",
});
```

#### AlloyFinger

[AlloyFinger](https://github.com/AlloyTeam/AlloyFinger) 是腾讯 AlloyTeam 团队开源的轻量级 `Web手势插件`，能够为元素注册各种手势事件。使用步骤：

1.  引入 AlloyFinger 相关 js 文件
2.  实例化 AlloyFinger 对象，[查阅文档](https://github.com/AlloyTeam/AlloyFinger) 进行相关配置
3.  自定义事件触发时的操作

```js
// 初始化AlloyFinger对象，自定义事件处理
// element 给谁绑定手势事件
var af = new AlloyFinger(element, {
  // touch 触摸
  touchStart: function () {},
  touchMove: function () {},
  touchEnd: function () {},
  // tap 点按
  tap: function () {},
  doubleTap: function () {},
  // longTap 长按
  longTap: function () {},
  // swipe 划动
  swipe: function (e) {
    console.log("swipe" + e.direction);
    // swipe事件触发时要做的事情
  },
});
```

#### 通讯录综合案例

在开始前，先了解几个前置知识~

**forEach 遍历数组**

```js
// forEach遍历：数组每个元素都执行一次回调函数
arr.forEach(function (ele, i) {
  // i 数组元素的索引，ele 每个数组元素
  console.log(i, ele);
});
```

**map 筛选数组**

```js
// map筛选：通过指定函数处理数组的每个元素，并返回处理后的数组
arr.map(function (ele, i) {
  // i 数组元素的索引，ele 每个数组元素
  console.log(i, ele);
});
```

**substring 截取字符串**

![image-20230827161947102](https://post-src.wyun521.top/images/image-20230827161947102.png)

```js
let uname = "王聪聪";
let rst = uname.substring(uname.length - 1);
console.log(rst);
```

**用户代码片段**

在 `VSCode设置 > 用户代码片段 > 新建 > 输入代码段文件名` 中，输入下面的模板：

![image-20230828095946102](https://post-src.wyun521.top/images/image-20230828095946102.png)

**通讯录主要功能代码**

```js
// 业务2：绑定滑动事件
// 实现：引入AlloyFinger手势插件，循环给每个item绑定滑动事件
function initSwip() {
  const items = document.querySelectorAll(".item");
  items.forEach(function (ele, i) {
    new AlloyFinger(ele, {
      swipe: function (e) {
        console.log("swipe" + e.direction);
        // 如果是左滑
        if (e.direction === "Left") {
          // 排他：先清除其他删除按钮，再让自己的删除按钮显示
          const activeBtn = document.querySelector(".address-book .active");
          // 如果有active的删除按钮，就移除
          activeBtn && activeBtn.classList.remove("active");
          ele.classList.add("active");
        }
      },
    });
  });
}
```

```js
// 业务3：删除列表项
// 实现：如果直接循环给每个删除按钮绑定事件，后添加的item是不能绑定成功的
// 所以我们采用事件委托的方式，给父元素添加事件
// 另外，为了减少对DOM元素的直接操作，我们可以采用数据驱动视图的方式
// 点击删除按钮删除数组中的数据，然后重新渲染页面
list.addEventListener("click", function (e) {
  if (e.target.tagName === "A" || e.target.tagName === "I") {
    // 为了能获得删除的那个item，在渲染时加上自定义索引属性
    const index = e.target.dataset.index;
    const flag = confirm("确定要删除吗？");
    console.log(flag);
    flag && arr.splice(index, 1);
    // 重新渲染页面
    flag && render();
    // 点击取消将删除按钮收回
    flag ||
      document
        .querySelector(".address-book .active")
        .classList.remove("active");
  }
});
```

![tongxunlu](https://post-src.wyun521.top/images/tongxunlu.gif)

> [点击查看通讯录案例完整代码](https://code.juejin.cn/pen/7271975587630022713)

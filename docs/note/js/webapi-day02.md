## webapi-day02

### 事件

#### 什么是事件

`事件`：在某个特定的时机执行某段代码

`事件的三个要素`：

- 事件源：触发事件的那个元素
- 事件类型：触发的条件
- 事件处理函数：要做什么事情

#### 事件监听

`事件监听` 是将事件处理函数注册到指定的 html 元素，当事件被触发时，事件处理函数就会被执行。 事件监听也叫事件注册、事件绑定

给一个元素添加事件监听：

```js
元素.addEventListener(事件类型，事件处理函数)
```

下面是一个基本的例子：

```js
btn.addEventListener("click", function () {
  alert("我被点击了~");
});
```

> 事件处理函数是一个回调函数，只有在事件被触发时才会自动调用

**事件监听的版本**

![image-20230824095646873](https://post-src.wyun521.top/images/image-20230824095646873.png)

> L0 版本的事件监听，在同一事件源上注册了多个事件类型相同的事件时，会相互覆盖
>
> L2 版本的事件监听，多个同名事件先后触发，不会相互覆盖，还拥有事件的更多特性，推荐使用

#### 事件类型

##### 鼠标事件

- `click`：鼠标单击事件

- `mouseenter/mouseleave`：没有冒泡的鼠标移入/移出事件
- `mouserover/mouseout`：有冒泡的鼠标移入/移出事件

```js
const box = document.querySelector(".box");
box.addEventListener("mouseenter", function () {
  box.innerHTML = "mouse enter";
});
box.addEventListener("mouseleave", function () {
  box.innerHTML = "mouse leave";
});
```

![mouse-enter](https://post-src.wyun521.top/images/mouse-enter.gif)

> 鼠标移入/移出事件只会在进入/离开元素时触发一次

##### 键盘事件

- `keydown`：键盘按下事件（按下不松手会一直触发）
- `keyup`：键盘抬起事件
- `keypress`：键盘按压事件

`执行顺序：keydown > keypress > input > keyup`

```js
const input = document.querySelector(".search");
input.addEventListener("keydown", function () {
  console.log("keydown:", input.value);
});
input.addEventListener("keypress", function () {
  console.log("keypress:", input.value);
});
input.addEventListener("input", function () {
  console.log("input:", input.value);
});
input.addEventListener("keyup", function () {
  console.log("keyup:", input.value);
});
```

![image-20230825172339763](https://post-src.wyun521.top/images/image-20230825172339763.png)

> keydown 和 keypress 事件无法获取最后一次按键的值

> 我们可以在事件处理函数中使用 e.key 得到按下了哪个键

##### 表单事件

- `focus`：获得焦点事件
- `blur`：失去焦点事件

- `input`：用户输入事件（表单 value 值变化时触发）

**eg.小米搜索框**

```html
<div class="mi">
  <!-- 搜索框 -->
  <input type="search" placeholder="小米笔记本" class="search-text" />
  <!-- 搜索结果列表 -->
  <ul class="result-list">
    <li><a href="#">全部商品</a></li>
    <li><a href="#">小米11</a></li>
    <li><a href="#">小米10S</a></li>
    <li><a href="#">小米笔记本</a></li>
    <li><a href="#">小米手机</a></li>
    <li><a href="#">黑鲨4</a></li>
    <li><a href="#">空调</a></li>
  </ul>
</div>
```

```js
// 1.获取元素
const input = document.querySelector(".search-text");
const list = document.querySelector(".result-list");
// 2.添加焦点事件
input.addEventListener("focus", function () {
  // 修改搜索框边框颜色
  input.classList.add("search");
  // 显示搜索结果列表
  list.style.display = "block";
});
input.addEventListener("blur", function () {
  input.classList.remove("search");
  list.style.display = "none";
});
input.addEventListener("input", function () {
  // 打印搜索框的值
  console.log(input.value);
});
```

![mi-search](https://post-src.wyun521.top/images/mi-search.gif)

#### 事件对象

事件处理函数的第一个参数就是事件对象，这个对象里有本次事件的相关信息：

- `e.target`：获取事件源
- `e.key`：获取用户实际按下了哪个键，如 Enter、a 等

```js
const input = document.querySelector("input");
input.addEventListener("keyup", function (e) {
  console.log(e);
  console.log(e.target);
  console.log(e.target.tagName);
  console.log(e.key);
});
```

![image-20230825173141854](https://post-src.wyun521.top/images/image-20230825173141854.png)

事件对象的其他常见属性有：

![image-20230824152411810](https://post-src.wyun521.top/images/image-20230824152411810.png)

#### 排他思想

`排他思想`：先排除其他人，再突出我自己

突出显示某一个元素是排他思想的主要使用场景

```html
<button class="pink">按钮1</button>
<button>按钮2</button>
<button>按钮3</button>
<button>按钮4</button>
<button>按钮5</button>
```

```js
// 需求： 点击哪个按钮，哪个按钮高亮，其余不高亮
// 先获取所有的button按钮
const btns = document.querySelectorAll("button");
// 利用循环来依次的给这5个按钮绑定点击事件
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    // 排他思想
    // 1. 先排除其他人，将其他按钮移除 pink 类
    document.querySelector(".pink").classList.remove("pink");
    // 2. 留下我自己，给自己添加 pink类
    this.classList.add("pink");
  });
}
```

![paita](https://post-src.wyun521.top/images/paita.gif)

**eg.Tab 栏切换**

```js
const as = document.querySelectorAll(".tab-nav li a");
const items = document.querySelectorAll(".tab-content .item");
// 循环给每个导航项添加事件
for (let i = 0; i < as.length; i++) {
  as[i].addEventListener("mouseenter", function () {
    // 利用排他思想修改元素样式
    document.querySelector(".tab-nav li .active").classList.remove("active");
    this.classList.add("active");
    // 添加active类的item会显示
    document.querySelector(".tab-content .active").classList.remove("active");
    console.log(i);
    items[i].classList.add("active");
  });
}
```

![tab-toggle](https://post-src.wyun521.top/images/tab-toggle.gif)

**this 指向问题**

this 总是指向当前函数的调用者：

```js
// 1.全局 this 指向 window 对象
console.log("全局this：", this);
// 2.普通函数中的 this 指向 window 对象
function fn() {
  console.log("普通函数this：", this);
}
fn();
// 3.事件中的 this 指向事件源对象
const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  console.log("事件this：", this);
});
// 4.对象方法中的 this 指向这个对象
const cat = {
  say: function () {
    console.log("对象this：", this);
  },
};
cat.say();
// 5.定时器中的 this 指向 window 对象
setTimeout(function () {
  console.log("定时器this：", this);
}, 5000);
```

![image-20230825174932077](https://post-src.wyun521.top/images/image-20230825174932077.png)

> this：谁调用，我就指向谁

**综合案例-轮播图**

```js
// 定义一个当前索引
let i = 0;
// 定义修改页面样式的函数
function change(i) {
  // console.log('i:',i);
  // 换图、换背景色、换文字
  img.src = sliderData[i].url;
  footer.style.backgroundColor = sliderData[i].color;
  txt.innerHTML = sliderData[i].title;
  // 换小圆点：先移除当前小圆点，再添加新的小圆点
  document
    .querySelector(".slider-indicator .active")
    .classList.remove("active");
  lis[i].classList.add("active");
}
```

```js
// 1.上一张
prevBtn.addEventListener("click", function () {
  i--;
  i = i < 0 ? sliderData.length - 1 : i;
  change(i);
});
// 2.下一张
nextBtn.addEventListener("click", function () {
  i++;
  i = i >= sliderData.length ? 0 : i;
  change(i);
});
// 3.跳转到
for (let j = 0; j < lis.length; j++) {
  lis[j].addEventListener("click", function () {
    // 需要修改一下全局索引，跳转后从当前位置开始
    i = j;
    change(j);
  });
}
```

![lunbo-shijian](https://post-src.wyun521.top/images/lunbo-shijian.gif)

```js
// 4.自动轮播
let timer = setInterval(function () {
  // 自动模拟一次用户点击事件
  nextBtn.click();
}, 1000);
// 鼠标移入停止自动轮播
slider.addEventListener("mouseenter", function () {
  clearInterval(timer);
});
// 鼠标移出继续自动轮播
slider.addEventListener("mouseleave", function () {
  // 保险起见，先清除一下
  clearInterval(timer);
  // 必须使用同一个定时器timer
  timer = setInterval(function () {
    nextBtn.click();
  }, 1000);
});
```

![lunbo-auto](https://post-src.wyun521.top/images/lunbo-auto.gif)
